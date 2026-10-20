import { images, type ImageKey } from "@/lib/images";
import { absoluteUrl, site } from "@/lib/site";
import type { ArticleMeta, Faq, Service } from "@/types/content";
import type { CommuneWithStatus } from "@/lib/communes";

/**
 * Données structurées schema.org.
 *
 * Règles : l'entité correspond à l'entreprise réelle (siège de Pia) ; les
 * communes desservies sont déclarées en `areaServed`, jamais comme des
 * établissements ; aucune note (AggregateRating) n'est générée.
 */

type JsonLd = Record<string, unknown>;

export const BUSINESS_ID = `${site.url}/#entreprise`;
export const WEBSITE_ID = `${site.url}/#site`;

export function businessSchema(areaServed: CommuneWithStatus[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: site.name,
    legalName: site.legal.legalDesignation,
    url: site.url,
    telephone: site.contact.phoneE164,
    email: site.contact.email,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl(images.hero.src),
    // Siège administratif : seules la commune et le code postal sont exposés,
    // l'accueil du public n'ayant pas lieu à cette adresse.
    address: {
      "@type": "PostalAddress",
      addressLocality: site.legal.address.locality,
      postalCode: site.legal.address.postalCode,
      addressRegion: site.legal.address.region,
      addressCountry: site.legal.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.base.lat, longitude: site.base.lon },
    identifier: { "@type": "PropertyValue", propertyID: "SIRET", value: site.legal.siret.replace(/\s/g, "") },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Pyrénées-Orientales" },
      ...areaServed.map((c) => ({ "@type": "City", name: c.name })),
    ],
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: "fr-FR",
    publisher: { "@id": BUSINESS_ID },
  };
}

export function serviceSchema(service: Service): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(service.path)}#service`,
    name: service.name,
    serviceType: service.schemaServiceType,
    description: service.metaDescription,
    url: absoluteUrl(service.path),
    image: absoluteUrl(images[service.heroImage].src),
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Pyrénées-Orientales" },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faq: Faq[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleSchema(article: ArticleMeta, image: ImageKey): JsonLd {
  const url = absoluteUrl(`/conseils/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(images[image].src),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: "fr-FR",
    articleSection: article.category,
    // Pas d'auteur individuel inventé : l'article est signé par l'entreprise.
    author: { "@type": "Organization", "@id": BUSINESS_ID, name: site.name, url: site.url },
    publisher: { "@id": BUSINESS_ID },
    isPartOf: { "@id": WEBSITE_ID },
    ...(article.sources?.length ? { citation: article.sources.map((s) => s.url) } : {}),
  };
}

export function localPageSchema(commune: CommuneWithStatus, path: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#page`,
    url: absoluteUrl(path),
    name: `Nettoyage à ${commune.name}`,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    // La commune est une zone desservie, pas une adresse de l'entreprise.
    spatialCoverage: {
      "@type": "City",
      name: commune.name,
      address: { "@type": "PostalAddress", postalCode: commune.postalCodes[0], addressCountry: "FR" },
    },
  };
}
