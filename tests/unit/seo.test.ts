import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { getAllCommunes } from "@/lib/communes";
import { businessSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

describe("données structurées", () => {
  const served = getAllCommunes().filter((c) => c.service === "declared");
  const business = businessSchema(served);

  it("décrit l'entreprise réelle sans note fictive", () => {
    const json = JSON.stringify(business);
    expect(json).not.toMatch(/aggregateRating|review/i);
    expect(business.legalName).toBe(site.legal.legalDesignation);
    expect(business.identifier).toMatchObject({ value: "83479975100013" });
  });

  it("déclare les communes comme zones desservies, pas comme adresses", () => {
    const address = business.address as Record<string, string>;
    expect(address.addressLocality).toBe("Pia");
    expect(address).not.toHaveProperty("streetAddress");
    const areas = business.areaServed as { "@type": string; name: string }[];
    expect(areas.map((a) => a.name)).toContain("Cabestany");
  });

  it("génère une FAQPage conforme", () => {
    const schema = faqSchema([{ question: "Q ?", answer: "R." }]);
    expect(schema["@type"]).toBe("FAQPage");
  });
});

describe("métadonnées", () => {
  it("définit une URL canonique, Open Graph et Twitter", () => {
    const meta = buildMetadata({ title: "Titre", description: "Description", path: "/bureaux" });
    expect(meta.alternates?.canonical).toBe("/bureaux");
    expect(meta.openGraph).toMatchObject({ title: `Titre | ${site.name}`, url: "/bureaux" });
    expect(meta.twitter).toMatchObject({ card: "summary_large_image" });
  });
});

describe("sitemap et robots", () => {
  const urls = sitemap().map((e) => e.url);

  it("liste toutes les pages publiables, sans doublon", () => {
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain(`${site.url}/`);
    expect(urls).toContain(`${site.url}/diogene`);
    expect(urls).toContain(`${site.url}/zones-intervention/canet-en-roussillon`);
    expect(urls).toContain(`${site.url}/conseils/certibiocide-comprendre`);
    expect(urls.filter((u) => u.includes("/conseils/"))).toHaveLength(12);
    expect(urls.filter((u) => u.includes("/zones-intervention/"))).toHaveLength(5);
  });

  it("n'expose ni l'API ni des pages locales non publiées", () => {
    expect(urls.some((u) => u.includes("/api/"))).toBe(false);
    expect(urls).not.toContain(`${site.url}/zones-intervention/thuir`);
  });

  it("bloque l'API dans robots.txt et pointe vers le sitemap", () => {
    const r = robots();
    expect(r.sitemap).toBe(`${site.url}/sitemap.xml`);
    expect(JSON.stringify(r.rules)).toContain("/api/");
  });
});
