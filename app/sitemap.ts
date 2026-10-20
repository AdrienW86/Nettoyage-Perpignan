import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { getAllArticles } from "@/lib/articles";
import { getPublishedLocalPages } from "@/lib/communes";
import { absoluteUrl } from "@/lib/site";

/** Date de la dernière refonte des pages statiques. */
const SITE_UPDATED = "2026-10-20";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { path: "/", priority: 1 },
    { path: "/zones-intervention", priority: 0.8 },
    { path: "/conseils", priority: 0.7 },
    { path: "/a-propos", priority: 0.5 },
    { path: "/contact", priority: 0.6 },
    { path: "/mentions-legales", priority: 0.1 },
    { path: "/confidentialite", priority: 0.1 },
    { path: "/conditions-generales", priority: 0.1 },
  ].map(({ path, priority }) => ({ url: absoluteUrl(path), lastModified: SITE_UPDATED, priority }));

  return [
    ...staticPages,
    ...services.map((s) => ({ url: absoluteUrl(s.path), lastModified: SITE_UPDATED, priority: 0.9 })),
    ...getPublishedLocalPages().map(({ commune }) => ({
      url: absoluteUrl(`/zones-intervention/${commune.slug}`),
      lastModified: SITE_UPDATED,
      priority: 0.7,
    })),
    ...getAllArticles().map((a) => ({
      url: absoluteUrl(`/conseils/${a.slug}`),
      lastModified: a.updatedAt,
      priority: 0.6,
    })),
  ];
}
