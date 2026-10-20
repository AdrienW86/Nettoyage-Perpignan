import type { ArticleMeta } from "@/types/content";

/**
 * Registre des guides. Le corps de chaque article se trouve dans
 * content/conseils/<slug>.md.
 *
 * Dates : date réelle de rédaction et de mise en ligne. Mettre à jour
 * `updatedAt` à chaque révision de fond (pas pour une simple coquille).
 * Auteur : l'entreprise (aucun expert individuel n'est mis en avant tant
 * qu'il n'a pas relu et signé le texte).
 */

const PUBLISHED = "2026-10-20";

const SOURCES = {
  biocides: {
    label: "Ministère de la Transition écologique — Produits biocides",
    url: "https://www.ecologie.gouv.fr/politiques-publiques/produits-biocides",
  },
  notice: {
    label: "Notice explicative de l'arrêté « Certibiocide » du 9 octobre 2013 modifié (mai 2025)",
    url: "https://www.ecologie.gouv.fr/sites/default/files/documents/Notice_explicative_Certibiocide_mai_2025.pdf",
  },
  portail: {
    label: "Portail officiel Certibiocide",
    url: "https://certibiocide.din.developpement-durable.gouv.fr/",
  },
  inrsBio: {
    label: "INRS — Prévenir les risques biologiques",
    url: "https://www.inrs.fr/risques/biologiques/ce-qu-il-faut-retenir.html",
  },
  deces: {
    label: "Service-Public.fr — Un proche est décédé",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F16507",
  },
  insalubre: {
    label: "Service-Public.fr — Que risque le propriétaire d'un logement insalubre ?",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F289",
  },
  decence: {
    label: "Service-Public.fr — Logement à louer décent",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2042",
  },
  signal: {
    label: "Service-Public.fr — Signal Logement",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/R69012",
  },
} as const;

export const articles: ArticleMeta[] = [
  {
    slug: "deroulement-nettoyage-apres-deces",
    title: "Comment se déroule un nettoyage après décès ?",
    metaTitle: "Nettoyage après décès : comment se déroule l'intervention ?",
    description:
      "Qui contacter, à quel moment, que faire des effets personnels, combien de temps cela prend : le déroulement d'un nettoyage après décès expliqué aux familles.",
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    category: "Interventions délicates",
    image: "apresDecesCuisine",
    relatedServices: ["post-mortem", "desinfection"],
    sources: [SOURCES.deces],
  },
  {
    slug: "syndrome-de-diogene-organiser-nettoyage",
    title: "Syndrome de Diogène : comprendre la situation et organiser un nettoyage adapté",
    metaTitle: "Syndrome de Diogène : organiser le nettoyage d'un logement",
    description:
      "Accumulation, logement encombré, négligence de l'hygiène : comment aborder la situation avec la personne, qui solliciter et comment se déroule un nettoyage adapté.",
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    category: "Interventions délicates",
    image: "logementEncombre",
    relatedServices: ["diogene", "nuisibles", "desinfection"],
    sources: [SOURCES.insalubre, SOURCES.signal],
  },
  {
    slug: "nettoyage-apres-deces-precautions",
    title: "Nettoyage après décès : précautions sanitaires et étapes techniques",
    metaTitle: "Nettoyage après décès : précautions sanitaires et étapes",
    description:
      "Risque biologique, équipements de protection, ordre des opérations, odeurs, déchets : les précautions et les étapes techniques d'un nettoyage post-mortem.",
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    category: "Interventions délicates",
    image: "apresDecesChambre",
    relatedServices: ["post-mortem", "desinfection"],
    sources: [SOURCES.inrsBio],
  },
  {
    slug: "nettoyage-ou-desinfection-differences",
    title: "Nettoyage et désinfection : quelles différences ?",
    metaTitle: "Nettoyage ou désinfection : quelles différences ?",
    description:
      "Nettoyer, désinfecter, assainir : trois notions souvent confondues. Ce que fait chacune, dans quel ordre les réaliser et quand une désinfection est vraiment utile.",
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    category: "Hygiène & désinfection",
    image: "desinfectionEssuyage",
    relatedServices: ["desinfection", "bureaux"],
    sources: [SOURCES.biocides],
  },
  {
    slug: "choisir-entreprise-nettoyage-perpignan",
    title: "Comment choisir une entreprise de nettoyage à Perpignan ?",
    metaTitle: "Choisir une entreprise de nettoyage à Perpignan : 8 critères",
    description:
      "Identité vérifiable, devis détaillé, assurance, produits, interlocuteur : les critères concrets pour choisir une entreprise de nettoyage à Perpignan et alentours.",
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    category: "Particuliers",
    image: "particuliersVitre",
    relatedServices: ["particuliers", "bureaux"],
  },
  {
    slug: "nettoyage-bureaux-methodes-frequences",
    title: "Nettoyage professionnel de bureaux : méthodes et fréquences",
    metaTitle: "Nettoyage de bureaux : quelles méthodes et quelles fréquences ?",
    description:
      "Quotidien, hebdomadaire, mensuel : quelles tâches à quelle fréquence pour des bureaux propres, et quelles méthodes pour les sols, les sanitaires et les points de contact.",
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    category: "Professionnels",
    image: "bureauxPoste",
    relatedServices: ["bureaux", "desinfection"],
  },
  {
    slug: "preparer-logement-nettoyage-approfondi",
    title: "Comment préparer son logement avant un nettoyage approfondi ?",
    metaTitle: "Préparer son logement avant un nettoyage approfondi",
    description:
      "Désencombrer, signaler les surfaces fragiles, prévoir l'accès à l'eau et à l'électricité : comment préparer son logement pour un nettoyage approfondi efficace.",
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    category: "Particuliers",
    image: "particuliersCuisine",
    relatedServices: ["particuliers"],
  },
  {
    slug: "etapes-remise-en-etat-logement",
    title: "Les étapes d'une remise en état de propreté d'un logement",
    metaTitle: "Remise en état d'un logement : les étapes du nettoyage",
    description:
      "Diagnostic, débarras, nettoyage du haut vers le bas, désinfection : les étapes d'une remise en état de propreté après un départ, une longue absence ou un encombrement.",
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    category: "Particuliers",
    image: "bureauxMonobrosse",
    relatedServices: ["particuliers", "diogene", "desinfection"],
  },
  {
    slug: "insalubrite-pourquoi-faire-appel-professionnel",
    title: "Logement insalubre : pourquoi faire appel à un professionnel du nettoyage ?",
    metaTitle: "Logement insalubre : pourquoi faire appel à un professionnel ?",
    description:
      "Risques sanitaires, nuisibles, déchets, démarches : ce qui distingue un logement très sale d'un logement insalubre, et pourquoi l'intervention d'un professionnel s'impose.",
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    category: "Interventions délicates",
    image: "desinfectionPulverisation",
    relatedServices: ["diogene", "desinfection", "nuisibles"],
    sources: [SOURCES.insalubre, SOURCES.decence, SOURCES.signal, SOURCES.inrsBio],
  },
  {
    slug: "obtenir-devis-nettoyage-adapte",
    title: "Comment obtenir un devis de nettoyage vraiment adapté ?",
    metaTitle: "Obtenir un devis de nettoyage adapté : les informations utiles",
    description:
      "Surface, état, accès, photos, délais : les informations à transmettre pour obtenir un devis de nettoyage précis, et ce qu'un bon devis doit contenir.",
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    category: "Particuliers",
    image: "bureauxCouloir",
    relatedServices: ["particuliers", "bureaux", "diogene"],
  },
  {
    slug: "certibiocide-comprendre",
    title: "Comprendre le Certibiocide et son rôle dans certaines interventions",
    metaTitle: "Certibiocide : définition, catégories et rôle",
    description:
      "Qui doit détenir le Certibiocide, quelles sont ses trois catégories depuis 2024, ce qu'il garantit et ce qu'il ne garantit pas : le point sur ce certificat individuel.",
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    category: "Réglementation",
    image: "nuisiblesPlinthes",
    relatedServices: ["nuisibles", "desinfection"],
    sources: [SOURCES.notice, SOURCES.biocides, SOURCES.portail],
  },
  {
    slug: "organiser-entretien-locaux-professionnels",
    title: "Organiser l'entretien de locaux professionnels : cahier des charges, planning et suivi",
    metaTitle: "Organiser l'entretien de locaux professionnels",
    description:
      "Inventaire des zones, cahier des charges, créneaux, accès, consommables, suivi qualité : la méthode pour organiser l'entretien de vos locaux avec un prestataire.",
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    category: "Professionnels",
    image: "desinfectionBureaux",
    relatedServices: ["bureaux"],
  },
];
