import { serviceLabel, type QuoteData } from "@/lib/quote-schema";

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c] ?? c);
}

/** Empêche toute injection d'en-tête dans le sujet du message. */
export function headerSafe(value: string, max = 120): string {
  return value.replace(/[\r\n\t]+/g, " ").slice(0, max).trim();
}

export type QuoteEmail = { subject: string; text: string; html: string };

export function buildQuoteEmail(data: QuoteData, receivedAt: Date): QuoteEmail {
  const service = serviceLabel(data.service);
  const date = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  }).format(receivedAt);

  const rows: [string, string][] = [
    ["Prestation", service],
    ["Commune", data.commune],
    ["Nom", data.name],
    ["Téléphone", data.phone],
    ["E-mail", data.email],
  ];

  const subject = headerSafe(`Demande de devis — ${service} — ${data.commune}`);

  const text = [
    `Nouvelle demande de devis reçue le ${date}`,
    "",
    ...rows.map(([k, v]) => `${k} : ${v}`),
    "",
    "Message :",
    data.message,
  ].join("\n");

  const html = `<!doctype html>
<html lang="fr"><body style="font-family:Arial,Helvetica,sans-serif;color:#0b1a2b;line-height:1.5">
<h1 style="font-size:18px;margin:0 0 12px">Nouvelle demande de devis</h1>
<p style="margin:0 0 16px;color:#4a5866">Reçue le ${escapeHtml(date)}</p>
<table cellpadding="6" style="border-collapse:collapse">
${rows
  .map(
    ([k, v]) =>
      `<tr><th align="left" style="border-bottom:1px solid #e3e0d8">${escapeHtml(k)}</th><td style="border-bottom:1px solid #e3e0d8">${escapeHtml(v)}</td></tr>`,
  )
  .join("\n")}
</table>
<h2 style="font-size:16px;margin:20px 0 8px">Message</h2>
<p style="white-space:pre-wrap;margin:0">${escapeHtml(data.message)}</p>
</body></html>`;

  return { subject, text, html };
}
