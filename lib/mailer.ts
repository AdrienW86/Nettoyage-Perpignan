import "server-only";
import nodemailer from "nodemailer";
import type { QuoteEmail } from "@/lib/email";

/**
 * Variables d'environnement (inchangées par rapport au site historique) :
 * SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_EMAIL.
 * Optionnelles : SMTP_FROM (expéditeur affiché, défaut : SMTP_USER) et
 * CONTACT_DRY_RUN=true (aucun envoi réel, utile en recette et en test).
 */

export class MailConfigError extends Error {}

export type SendQuote = (email: QuoteEmail, replyTo: { name: string; address: string }) => Promise<void>;

export const sendQuoteEmail: SendQuote = async (email, replyTo) => {
  if (process.env.CONTACT_DRY_RUN === "true") {
    console.info("[contact] CONTACT_DRY_RUN actif — e-mail non envoyé :", email.subject);
    return;
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
    throw new MailConfigError("Configuration SMTP incomplète");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  // L'expéditeur est toujours notre propre adresse (SPF/DKIM) ; l'adresse du
  // demandeur est placée en Reply-To, jamais en From.
  await transporter.sendMail({
    from: { name: "Site Nettoyage Perpignan", address: process.env.SMTP_FROM ?? SMTP_USER },
    to: CONTACT_EMAIL,
    replyTo,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
};
