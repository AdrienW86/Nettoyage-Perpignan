import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { articles } from "@/data/articles";
import { localPages } from "@/data/local-pages";
import { services } from "@/data/services";
import { getAllArticles, renderArticle } from "@/lib/articles";
import { getPublishedLocalPages } from "@/lib/communes";
import { images } from "@/lib/images";

const contentDir = path.join(process.cwd(), "content", "conseils");

/** Routes publiées, pour vérifier le maillage interne. */
function knownRoutes(): Set<string> {
  return new Set([
    "/",
    "/zones-intervention",
    "/conseils",
    "/a-propos",
    "/contact",
    "/mentions-legales",
    "/confidentialite",
    "/conditions-generales",
    ...services.map((s) => s.path),
    ...articles.map((a) => `/conseils/${a.slug}`),
    ...getPublishedLocalPages().map(({ commune }) => `/zones-intervention/${commune.slug}`),
  ]);
}

describe("prestations", () => {
  it("conserve les 6 URL historiques", () => {
    expect(services.map((s) => s.path).sort()).toEqual(
      ["/bureaux", "/desinfection", "/diogene", "/nuisibles", "/particuliers", "/post-mortem"].sort(),
    );
  });

  it("référence des guides et des prestations existants", () => {
    const slugs = new Set(articles.map((a) => a.slug));
    const servicesSlugs = new Set(services.map((s) => s.slug));
    for (const s of services) {
      for (const a of s.relatedArticles) expect(slugs.has(a), `${s.slug} → ${a}`).toBe(true);
      for (const r of s.related) expect(servicesSlugs.has(r)).toBe(true);
      expect(s.faq.length).toBeGreaterThanOrEqual(3);
      expect(images[s.heroImage]).toBeDefined();
    }
  });
});

describe("métadonnées SEO", () => {
  const entries = [
    ...services.map((s) => ({ id: s.path, title: s.metaTitle, description: s.metaDescription, h1: s.h1 })),
    ...articles.map((a) => ({ id: a.slug, title: a.metaTitle, description: a.description, h1: a.title })),
    ...localPages.map((l) => ({ id: l.slug, title: l.metaTitle, description: l.metaDescription, h1: l.h1 })),
  ];

  it("a des titres, descriptions et H1 uniques", () => {
    for (const key of ["title", "description", "h1"] as const) {
      const values = entries.map((e) => e[key]);
      expect(new Set(values).size, key).toBe(values.length);
    }
  });

  it("respecte des longueurs raisonnables", () => {
    for (const e of entries) {
      expect(e.title.length, `titre ${e.id}`).toBeLessThanOrEqual(70);
      expect(e.description.length, `description ${e.id}`).toBeGreaterThanOrEqual(110);
      expect(e.description.length, `description ${e.id}`).toBeLessThanOrEqual(175);
    }
  });
});

describe("guides", () => {
  it("contient au moins 12 guides, chacun avec son fichier Markdown", () => {
    expect(articles.length).toBeGreaterThanOrEqual(12);
    for (const a of articles) expect(existsSync(path.join(contentDir, `${a.slug}.md`)), a.slug).toBe(true);
  });

  it("utilise des dates ISO cohérentes", () => {
    for (const a of articles) {
      expect(a.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(a.updatedAt >= a.publishedAt).toBe(true);
    }
  });

  it("ne contient que des liens internes vers des pages existantes", () => {
    const routes = knownRoutes();
    for (const a of articles) {
      const md = readFileSync(path.join(contentDir, `${a.slug}.md`), "utf8");
      const links = [...md.matchAll(/\]\((\/[^)#\s]*)/g)].map((m) => m[1] as string);
      for (const link of links) {
        const clean = link.split("?")[0] as string;
        expect(routes.has(clean), `${a.slug} → ${link}`).toBe(true);
      }
    }
  });

  it("calcule un temps de lecture et génère un sommaire", () => {
    for (const a of getAllArticles()) {
      expect(a.readingMinutes).toBeGreaterThanOrEqual(2);
      const { html, toc } = renderArticle(a.slug);
      expect(toc.length).toBeGreaterThanOrEqual(3);
      expect(html).not.toMatch(/<h1/);
    }
  });

  it("ouvre les liens externes dans un nouvel onglet signalé", () => {
    const { html } = renderArticle("certibiocide-comprendre");
    expect(html).toMatch(/target="_blank" rel="noopener">[^<]+<span class="sr-only"> \(nouvel onglet\)/);
  });
});
