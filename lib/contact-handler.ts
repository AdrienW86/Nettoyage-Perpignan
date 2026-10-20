import { buildQuoteEmail } from "@/lib/email";
import { antiSpamSchema, fieldErrors, MIN_FILL_MS, quoteSchema, type QuoteFieldErrors } from "@/lib/quote-schema";
import { hashIdentifier, type RateLimiter } from "@/lib/rate-limit";
import { site } from "@/lib/site";
import type { SendQuote } from "@/lib/mailer";

export type ContactResponse =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: QuoteFieldErrors };

type Deps = {
  limiter: RateLimiter;
  send: SendQuote;
  verifyCaptcha: (token: string | undefined, ip: string | null) => Promise<boolean>;
  now?: () => number;
};

const MAX_BODY_BYTES = 16 * 1024;
const FALLBACK = `Votre demande n'a pas pu être envoyée. Vous pouvez nous appeler au ${site.contact.phoneDisplay} ou écrire à ${site.contact.email}.`;

function json(body: ContactResponse, status: number, extraHeaders?: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...extraHeaders },
  });
}

export function clientIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || null;
  return req.headers.get("x-real-ip");
}

/** Refuse les requêtes provenant d'une autre origine (protection CSRF légère). */
function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function createContactHandler({ limiter, send, verifyCaptcha, now = Date.now }: Deps) {
  return async function POST(req: Request): Promise<Response> {
    if (!isSameOrigin(req)) return json({ ok: false, message: "Origine non autorisée." }, 403);
    if (!req.headers.get("content-type")?.includes("application/json")) {
      return json({ ok: false, message: "Format de requête invalide." }, 415);
    }

    const raw = await req.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
      return json({ ok: false, message: "Demande trop volumineuse." }, 413);
    }

    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return json({ ok: false, message: "Format de requête invalide." }, 400);
    }
    if (typeof body !== "object" || body === null) {
      return json({ ok: false, message: "Format de requête invalide." }, 400);
    }

    const ip = clientIp(req);

    let limit;
    try {
      limit = await limiter.hit(await hashIdentifier(ip ?? "unknown"));
    } catch (err) {
      // Un incident du limiteur ne doit pas bloquer une vraie demande.
      console.error("[contact] rate limiter indisponible", err);
      limit = { allowed: true, remaining: 0, resetInSeconds: 0 };
    }
    if (!limit.allowed) {
      return json(
        {
          ok: false,
          message: `Trop de demandes envoyées depuis cette connexion. Merci de réessayer plus tard ou de nous appeler au ${site.contact.phoneDisplay}.`,
        },
        429,
        { "Retry-After": String(limit.resetInSeconds) },
      );
    }

    const spam = antiSpamSchema.safeParse(body);
    if (!spam.success) {
      // Pot de miel rempli ou métadonnées absentes : on simule un succès pour
      // ne pas renseigner un robot, sans envoyer d'e-mail.
      return json({ ok: true, message: "Merci, votre demande a bien été envoyée." }, 200);
    }
    if (now() - spam.data.startedAt < MIN_FILL_MS) {
      return json(
        { ok: false, message: "Le formulaire a été envoyé trop rapidement. Vérifiez vos informations puis renvoyez-le." },
        400,
      );
    }

    if (!(await verifyCaptcha(spam.data.turnstileToken, ip))) {
      return json({ ok: false, message: "La vérification anti-robot a échoué. Merci de réessayer." }, 400);
    }

    const parsed = quoteSchema.safeParse(body);
    if (!parsed.success) {
      return json(
        { ok: false, message: "Certains champs sont à corriger.", fieldErrors: fieldErrors(parsed.error) },
        422,
      );
    }

    try {
      const email = buildQuoteEmail(parsed.data, new Date(now()));
      await send(email, { name: parsed.data.name, address: parsed.data.email });
    } catch (err) {
      console.error("[contact] échec d'envoi", err instanceof Error ? err.message : err);
      return json({ ok: false, message: FALLBACK }, 502);
    }

    return json({ ok: true, message: "Merci, votre demande a bien été envoyée. Nous revenons vers vous rapidement." }, 200);
  };
}
