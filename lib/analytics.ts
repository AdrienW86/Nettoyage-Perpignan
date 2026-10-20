/**
 * Suivi des conversions, sans outil tiers par défaut.
 *
 * Les événements sont :
 *  - diffusés sous forme d'événement DOM `np:track` (écoutable par n'importe
 *    quel outil ajouté plus tard) ;
 *  - poussés dans `window.dataLayer` UNIQUEMENT si un outil de mesure l'a
 *    créé ET que le consentement a été donné (`window.npConsent === "granted"`).
 *
 * Aucun cookie n'est déposé par ce module. Si un outil de mesure d'audience
 * soumis à consentement est installé, il faudra ajouter un bandeau de
 * consentement qui positionne `window.npConsent`.
 */

export type TrackEvent = "phone_click" | "quote_cta_click" | "quote_submit" | "quote_success" | "email_click";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    npConsent?: "granted" | "denied";
  }
}

const sent = new Set<string>();

export function trackEvent(event: TrackEvent, params: Record<string, string> = {}, dedupeKey?: string): void {
  if (typeof window === "undefined") return;
  // Anti double comptage (double clic, re-rendu).
  if (dedupeKey) {
    if (sent.has(dedupeKey)) return;
    sent.add(dedupeKey);
  }
  window.dispatchEvent(new CustomEvent("np:track", { detail: { event, ...params } }));
  if (window.npConsent === "granted" && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...params });
  }
}
