import type { ImageKey } from "@/lib/images";

export type Faq = { question: string; answer: string };

export const SERVICE_SLUGS = [
  "particuliers",
  "bureaux",
  "desinfection",
  "nuisibles",
  "diogene",
  "post-mortem",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type ServiceSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ProcessStep = { title: string; text: string };

export type Service = {
  slug: ServiceSlug;
  /** URL historique conservée pour préserver le référencement. */
  path: `/${ServiceSlug}`;
  name: string;
  navLabel: string;
  family: "entretien" | "specialise";
  metaTitle: string;
  metaDescription: string;
  h1: string;
  kicker: string;
  lead: string;
  cardText: string;
  heroImage: ImageKey;
  secondaryImage: ImageKey;
  scope: string[];
  sections: ServiceSection[];
  process: ProcessStep[];
  precautions?: { title: string; items: string[] };
  faq: Faq[];
  related: ServiceSlug[];
  relatedArticles: string[];
  schemaServiceType: string;
  ctaTitle: string;
  ctaText: string;
};

export type ArticleMeta = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  /** Format ISO AAAA-MM-JJ — date réelle de première publication. */
  publishedAt: string;
  updatedAt: string;
  category: "Interventions délicates" | "Hygiène & désinfection" | "Professionnels" | "Particuliers" | "Réglementation";
  image: ImageKey;
  relatedServices: ServiceSlug[];
  sources?: { label: string; url: string }[];
};

/** Métadonnées enrichies au chargement (temps de lecture calculé sur le texte réel). */
export type Article = ArticleMeta & { readingMinutes: number };

export type LocalPage = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  context: { title: string; paragraphs: string[] };
  focus: { service: ServiceSlug; text: string }[];
  faq: Faq[];
};
