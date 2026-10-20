import { createContactHandler } from "@/lib/contact-handler";
import { sendQuoteEmail } from "@/lib/mailer";
import { getRateLimiter } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

export const POST = createContactHandler({
  limiter: getRateLimiter(),
  send: sendQuoteEmail,
  verifyCaptcha: verifyTurnstile,
});
