/**
 * Registre des visuels du site.
 *
 * IMPORTANT : aucune de ces images ne représente une intervention réelle de
 * l'entreprise. Ce sont des photographies d'illustration (banque d'images ou
 * génération), signalées comme telles sur le site. Les photos de chantiers
 * réels, lorsqu'elles seront fournies, devront être ajoutées avec
 * `illustrative: false`.
 */

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  illustrative: boolean;
};

function img(file: string, width: number, height: number, alt: string): SiteImage {
  return { src: `/images/${file}`, width, height, alt, illustrative: true };
}

export const images = {
  hero: img(
    "hero-produits-nettoyage.webp",
    2400,
    1349,
    "Main gantée tenant un seau de produits et un pulvérisateur de nettoyage",
  ),
  particuliersCuisine: img(
    "particuliers-cuisine.webp",
    1125,
    1125,
    "Nettoyage d'une cuisine : plan de travail, sol et façades de placards",
  ),
  particuliersVitre: img(
    "particuliers-vitre.webp",
    1438,
    1438,
    "Main gantée nettoyant une vitre à l'éponge",
  ),
  particuliersSejour: img(
    "particuliers-sejour.webp",
    500,
    500,
    "Nettoyage du sol d'un séjour lumineux à la serpillière",
  ),
  bureauxOpenSpace: img(
    "bureaux-open-space.webp",
    1375,
    1375,
    "Entretien du sol d'un espace de bureaux vitré",
  ),
  bureauxCouloir: img(
    "bureaux-couloir.webp",
    1438,
    1438,
    "Entretien d'un couloir de locaux professionnels avec chariot de ménage",
  ),
  bureauxMonobrosse: img(
    "bureaux-monobrosse.webp",
    1438,
    1438,
    "Monobrosse nettoyant un sol carrelé",
  ),
  bureauxPoste: img(
    "bureaux-poste-de-travail.webp",
    1438,
    1438,
    "Nettoyage d'un poste de travail : clavier et bureau essuyés avec des gants",
  ),
  desinfectionPulverisation: img(
    "desinfection-pulverisation.webp",
    1375,
    1375,
    "Intervenant en combinaison de protection appliquant un désinfectant",
  ),
  desinfectionEssuyage: img(
    "desinfection-essuyage.webp",
    1438,
    1438,
    "Essuyage d'une surface avec une lavette après pulvérisation",
  ),
  logementEncombre: img(
    "intervention-logement-encombre.webp",
    1500,
    1500,
    "Intervenant équipé d'une protection respiratoire dans une pièce encombrée de cartons",
  ),
  desinfectionBureaux: img(
    "desinfection-bureaux.webp",
    1438,
    1438,
    "Désinfection de surfaces dans un bureau par deux intervenants en combinaison",
  ),
  nuisiblesSejour: img(
    "nuisibles-traitement-sejour.webp",
    1313,
    1313,
    "Technicien appliquant un traitement contre les insectes dans un séjour",
  ),
  nuisiblesLiterie: img(
    "nuisibles-inspection-literie.webp",
    1563,
    1563,
    "Inspection des coutures d'un matelas à la recherche de punaises de lit",
  ),
  nuisiblesCuisine: img(
    "nuisibles-traitement-cuisine.webp",
    1438,
    1438,
    "Traitement ciblé sous les meubles d'une cuisine",
  ),
  nuisiblesPlinthes: img(
    "nuisibles-traitement-plinthes.webp",
    1500,
    1500,
    "Application d'un traitement le long des plinthes",
  ),
  apresDecesChambre: img(
    "apres-deces-chambre.webp",
    1375,
    1375,
    "Chambre sobre et rangée, lit fait, lumière douce",
  ),
  apresDecesCuisine: img(
    "apres-deces-cuisine.webp",
    1438,
    1438,
    "Cuisine vide éclairée par une fenêtre",
  ),
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

export const ogDefault = { src: "/images/og-default.jpg", width: 1200, height: 630 };
