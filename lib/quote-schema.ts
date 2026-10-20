import * as z from "zod/mini";

/**
 * Schéma de la demande de devis, partagé entre le formulaire (validation
 * côté client) et la route API (validation côté serveur, qui fait foi).
 *
 * `zod/mini` (API fonctionnelle, arborescente) est utilisé plutôt que `zod`
 * complet : environ 30 Ko gzippés de JavaScript en moins côté navigateur.
 */

export const QUOTE_SERVICES = [
  { value: "particuliers", label: "Nettoyage de logement" },
  { value: "bureaux", label: "Nettoyage de bureaux / locaux" },
  { value: "desinfection", label: "Désinfection" },
  { value: "nuisibles", label: "Traitement des nuisibles" },
  { value: "diogene", label: "Logement encombré (syndrome de Diogène)" },
  { value: "post-mortem", label: "Nettoyage après décès" },
  { value: "autre", label: "Autre demande" },
] as const;

export type QuoteServiceValue = (typeof QUOTE_SERVICES)[number]["value"];

const serviceValues = QUOTE_SERVICES.map((s) => s.value) as [QuoteServiceValue, ...QuoteServiceValue[]];

/** Supprime les caractères de contrôle (hors retours à la ligne pour le message). */
const clean = (v: string) => v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
const singleLine = (v: string) => clean(v).replace(/[\r\n]+/g, " ");

export const PHONE_PATTERN = /^(?:\+33\s?|0033\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

/** Chaîne nettoyée puis validée. */
const text = (normalize: (v: string) => string, ...checks: Parameters<ReturnType<typeof z.string>["check"]>) =>
  z.pipe(z.pipe(z.string(), z.transform(normalize)), z.string().check(...checks));

export const quoteSchema = z.object({
  service: z.enum(serviceValues, { error: "Choisissez le type d'intervention." }),
  commune: text(
    singleLine,
    z.minLength(2, "Indiquez la commune d'intervention."),
    z.maxLength(80, "Nom de commune trop long."),
  ),
  name: text(singleLine, z.minLength(2, "Indiquez votre nom."), z.maxLength(80, "Nom trop long.")),
  phone: text(singleLine, z.regex(PHONE_PATTERN, "Numéro de téléphone invalide (ex. 06 12 34 56 78).")),
  email: z.pipe(
    z.pipe(z.string(), z.transform(singleLine)),
    z.email("Adresse e-mail invalide.").check(z.maxLength(120, "Adresse e-mail trop longue.")),
  ),
  message: text(
    clean,
    z.minLength(20, "Décrivez votre besoin en quelques phrases (20 caractères minimum)."),
    z.maxLength(4000, "Message trop long (4 000 caractères maximum)."),
  ),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;
export type QuoteField = keyof QuoteInput;
export type QuoteFieldErrors = Partial<Record<QuoteField, string>>;

/** Champs anti-spam envoyés avec le formulaire, jamais affichés à l'utilisateur. */
export const antiSpamSchema = z.object({
  /** Pot de miel : doit rester vide. */
  website: z._default(z.optional(z.string().check(z.maxLength(0))), ""),
  /** Horodatage (ms) de la première interaction avec le formulaire. */
  startedAt: z.int().check(z.positive()),
  turnstileToken: z.optional(z.string().check(z.maxLength(4096))),
});

/** Délai minimal de remplissage : en dessous, il s'agit presque toujours d'un robot. */
export const MIN_FILL_MS = 3000;

export function fieldErrors(error: { issues: readonly { path: readonly PropertyKey[]; message: string }[] }): QuoteFieldErrors {
  const out: QuoteFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in out)) out[key as QuoteField] = issue.message;
  }
  return out;
}

export function serviceLabel(value: QuoteServiceValue): string {
  return QUOTE_SERVICES.find((s) => s.value === value)?.label ?? value;
}
