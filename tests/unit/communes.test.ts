import { describe, expect, it } from "vitest";
import raw from "@/data/communes-66.json";
import {
  getAllCommunes,
  getCommune,
  getLocalPage,
  getNearbyCommunes,
  getPublishedLocalPages,
  haversineKm,
  normalizeSearch,
} from "@/lib/communes";

describe("référentiel des communes", () => {
  const communes = getAllCommunes();

  it("contient les 226 communes des Pyrénées-Orientales (COG)", () => {
    expect(raw.count).toBe(226);
    expect(communes).toHaveLength(226);
  });

  it("a des codes INSEE et des slugs uniques et bien formés", () => {
    expect(new Set(communes.map((c) => c.inseeCode)).size).toBe(226);
    expect(new Set(communes.map((c) => c.slug)).size).toBe(226);
    for (const c of communes) {
      expect(c.inseeCode).toMatch(/^66\d{3}$/);
      expect(c.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(c.postalCodes.length).toBeGreaterThan(0);
      for (const cp of c.postalCodes) expect(cp).toMatch(/^66\d{3}$/);
    }
  });

  it("ne publie que des pages locales de communes déclarées desservies et documentées", () => {
    const published = getPublishedLocalPages();
    expect(published.map((p) => p.commune.slug).sort()).toEqual(
      ["argeles-sur-mer", "cabestany", "canet-en-roussillon", "pia", "saint-esteve"].sort(),
    );
    for (const { commune } of published) expect(commune.service).toBe("declared");
  });

  it("ne publie pas de page Perpignan (cannibalisation avec l'accueil)", () => {
    expect(getCommune("perpignan")?.hasPage).toBe(false);
    expect(getLocalPage("perpignan")).toBeUndefined();
  });

  it("ne publie pas de page pour une commune sans contenu", () => {
    expect(getCommune("thuir")?.hasPage).toBe(false);
    expect(getLocalPage("thuir")).toBeUndefined();
  });

  it("calcule des distances plausibles", () => {
    expect(haversineKm(42.6986, 2.8956, 42.6986, 2.8956)).toBe(0);
    const argeles = getCommune("argeles-sur-mer");
    expect(argeles?.distanceKm).toBeGreaterThan(20);
    expect(argeles?.distanceKm).toBeLessThan(35);
  });

  it("liste les communes voisines sans la commune elle-même", () => {
    const pia = getCommune("pia");
    if (!pia) throw new Error("Pia manquante");
    const nearby = getNearbyCommunes(pia, 5);
    expect(nearby).toHaveLength(5);
    expect(nearby.map((c) => c.slug)).not.toContain("pia");
  });

  it("normalise les recherches (accents, casse, tirets)", () => {
    expect(normalizeSearch("Saint-Estève")).toBe("saint esteve");
    expect(normalizeSearch("  L'ALBÈRE ")).toBe("l albere");
  });
});
