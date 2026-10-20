import { describe, expect, it } from "vitest";
import { fieldErrors, quoteSchema } from "@/lib/quote-schema";

const valid = {
  service: "diogene",
  commune: "Perpignan",
  name: "Marie Dupont",
  phone: "06 12 34 56 78",
  email: "marie@example.fr",
  message: "Logement de 60 m² très encombré, besoin d'une visite rapidement.",
};

describe("quoteSchema", () => {
  it("accepte une demande valide", () => {
    expect(quoteSchema.safeParse(valid).success).toBe(true);
  });

  it.each(["0612345678", "06.12.34.56.78", "+33 6 12 34 56 78", "04-68-12-34-56", "0033612345678"])(
    "accepte le numéro %s",
    (phone) => {
      expect(quoteSchema.safeParse({ ...valid, phone }).success).toBe(true);
    },
  );

  it.each(["12345", "06 12 34", "abcdefghij", "+44 20 7946 0958"])("refuse le numéro %s", (phone) => {
    expect(quoteSchema.safeParse({ ...valid, phone }).success).toBe(false);
  });

  it("refuse une prestation inconnue", () => {
    expect(quoteSchema.safeParse({ ...valid, service: "piscine" }).success).toBe(false);
  });

  it("refuse un message trop court et renvoie une erreur par champ", () => {
    const result = quoteSchema.safeParse({ ...valid, message: "Bonjour", email: "pas-un-email" });
    expect(result.success).toBe(false);
    if (result.success) return;
    const errors = fieldErrors(result.error);
    expect(errors.message).toMatch(/20 caractères/);
    expect(errors.email).toMatch(/e-mail/);
  });

  it("supprime les retours à la ligne des champs mono-ligne (injection d'en-têtes)", () => {
    const result = quoteSchema.parse({ ...valid, name: "Jean\r\nBcc: victime@example.com" });
    expect(result.name).not.toMatch(/[\r\n]/);
  });

  it("supprime les caractères de contrôle mais conserve les sauts de ligne du message", () => {
    const result = quoteSchema.parse({ ...valid, message: "Ligne 1\u0000\u0007\nLigne 2 avec assez de texte." });
    expect(result.message).toBe("Ligne 1\nLigne 2 avec assez de texte.");
  });

  it("refuse un message de plus de 4000 caractères", () => {
    expect(quoteSchema.safeParse({ ...valid, message: "a".repeat(4001) }).success).toBe(false);
  });
});
