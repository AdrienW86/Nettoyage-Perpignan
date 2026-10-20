/**
 * Vérification Cloudflare Turnstile (optionnelle).
 * Activée uniquement si TURNSTILE_SECRET_KEY est définie côté serveur et
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY côté client.
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function isTurnstileEnabled(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(
  token: string | undefined,
  ip: string | null,
  fetchImpl: typeof fetch = fetch,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetchImpl(VERIFY_URL, { method: "POST", body, cache: "no-store" });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
