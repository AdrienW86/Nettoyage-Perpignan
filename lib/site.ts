/**
 * Source unique de vérité pour l'identité de l'entreprise.
 *
 * Toute donnée affichée sur le site (mentions légales, JSON-LD, footer,
 * formulaires) provient de ce fichier. Les champs à `null` sont des
 * informations NON VÉRIFIÉES : les composants les masquent au lieu
 * d'afficher une valeur inventée.
 *
 * Sources de vérification (octobre 2026) :
 * - Annuaire des entreprises / API Recherche d'entreprises (data.gouv.fr),
 *   SIREN 834 799 751, données RNE mises à jour le 16/07/2026.
 */

export const site = {
  name: "Nettoyage Perpignan",
  url: "https://nettoyage-perpignan.fr",
  locale: "fr_FR",
  tagline: "Nettoyage, désinfection et interventions délicates dans les Pyrénées-Orientales",

  contact: {
    phoneDisplay: "06 28 28 69 67",
    phoneE164: "+33628286967",
    email: "contact@nettoyage-perpignan.fr",
  },

  /** Identité juridique publique de l'éditeur (registre national des entreprises). */
  legal: {
    holderName: "Grégory José Robles",
    /** Depuis la loi du 14 février 2022, l'EI doit faire figurer « EI » à côté de son nom. */
    legalDesignation: "Grégory José Robles EI",
    legalForm: "Entrepreneur individuel",
    siren: "834 799 751",
    siret: "834 799 751 00013",
    /** Nom commercial recensé au registre. « Nettoyage Perpignan » est la marque du site. */
    registeredTradeName: "Nettoyage Perpignan",
    registeredOn: "2018-01-23",
    nafCode: "43.91B",
    address: {
      street: "88 Cami de Las Carretas",
      postalCode: "66380",
      locality: "Pia",
      region: "Occitanie",
      country: "FR",
    },
    /** Non communiqué dans les sources publiques consultées. */
    vatNumber: null as string | null,
    publicationDirector: "Grégory Robles",
  },

  /**
   * Hébergement. Le site précédent indiquait Vercel ; à reconfirmer au
   * moment de la mise en production (le domaine est servi derrière Cloudflare).
   */
  hosting: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    website: "https://vercel.com",
  },

  /** Point de départ des interventions (siège) — utilisé pour les distances. */
  base: { locality: "Pia", lat: 42.738513469, lon: 2.8954828539 },

  /**
   * Rattachement commercial. Formulation volontairement non juridique : aucun
   * lien capitalistique n'est établi par les sources publiques.
   */
  group: {
    name: "Solution Habitation",
    url: "https://www.solution-habitation.fr",
  },

  /**
   * Certibiocide : certificat individuel (délivré à une personne physique,
   * jamais à une entreprise), valable 5 ans, décliné depuis le 01/01/2024 en
   * trois catégories. Tant que titulaire, catégorie et date de validité ne
   * sont pas renseignés, seule une mention générale est affichée.
   */
  certibiocide: {
    declared: true,
    holder: null as string | null,
    category: null as null | "désinfectants" | "nuisibles" | "autres produits" | "antérieur à 2024",
    validUntil: null as string | null,
  },

  social: [] as string[],
} as const;

export type Site = typeof site;

export const telHref = `tel:${site.contact.phoneE164}`;
export const mailHref = `mailto:${site.contact.email}`;

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}
