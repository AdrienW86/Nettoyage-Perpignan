import { describe, expect, it } from "vitest";
import { buildQuoteEmail, escapeHtml, headerSafe } from "@/lib/email";
import type { QuoteData } from "@/lib/quote-schema";

const data: QuoteData = {
  service: "bureaux",
  commune: "Cabestany",
  name: '<img src=x onerror="alert(1)">',
  phone: "0612345678",
  email: "client@example.fr",
  message: "<script>alert('xss')</script>\nDeuxième ligne & co",
};

describe("escapeHtml", () => {
  it("échappe les caractères HTML sensibles", () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe("&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
  });
});

describe("headerSafe", () => {
  it("retire les retours à la ligne et tronque", () => {
    expect(headerSafe("a\r\nb\tc", 120)).toBe("a b c");
    expect(headerSafe("x".repeat(200)).length).toBe(120);
  });
});

describe("buildQuoteEmail", () => {
  const email = buildQuoteEmail(data, new Date("2026-10-20T10:00:00Z"));

  it("n'injecte aucune balise fournie par l'utilisateur dans le HTML", () => {
    expect(email.html).not.toContain("<script>");
    expect(email.html).not.toContain("<img src=x");
    expect(email.html).toContain("&lt;script&gt;");
  });

  it("produit un sujet sans saut de ligne avec la prestation et la commune", () => {
    expect(email.subject).toBe("Demande de devis — Nettoyage de bureaux / locaux — Cabestany");
    expect(email.subject).not.toMatch(/[\r\n]/);
  });

  it("contient une version texte complète", () => {
    expect(email.text).toContain("Téléphone : 0612345678");
    expect(email.text).toContain("Deuxième ligne & co");
  });
});
