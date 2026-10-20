import type { Faq, ProcessStep } from "@/types/content";

export const homeProcess: ProcessStep[] = [
  {
    title: "Vous nous contactez",
    text: "Par téléphone ou via le formulaire. Quelques informations suffisent pour comprendre votre besoin.",
  },
  {
    title: "Nous évaluons",
    text: "Échange détaillé et, si la situation le demande, visite sur place avant de chiffrer.",
  },
  {
    title: "Vous recevez un devis",
    text: "Gratuit et détaillé : tâches incluses, durée estimée, conditions. Vous décidez sans pression.",
  },
  {
    title: "Nous intervenons",
    text: "Avec le matériel et les produits adaptés, puis nous vérifions le résultat avec vous.",
  },
];

export const homeFaq: Faq[] = [
  {
    question: "Dans quelles communes intervenez-vous ?",
    answer:
      "Nous intervenons à Perpignan et dans les communes de l'agglomération depuis notre siège de Pia, ainsi que plus largement dans les Pyrénées-Orientales selon la nature de l'intervention. Notre page Zones d'intervention permet de rechercher votre commune.",
  },
  {
    question: "Le devis est-il gratuit ?",
    answer:
      "Oui. Le devis est gratuit et sans engagement. Pour les situations qui le nécessitent (logement encombré, nettoyage après décès, traitement de nuisibles, locaux professionnels), il est établi après une visite.",
  },
  {
    question: "Travaillez-vous pour les particuliers et les professionnels ?",
    answer:
      "Oui : particuliers, entreprises, commerces, cabinets, mais aussi bailleurs, agences immobilières, syndics, notaires et mandataires judiciaires, notamment pour les interventions délicates.",
  },
  {
    question: "Quels sont les délais d'intervention ?",
    answer:
      "Ils dépendent du type d'intervention et de notre planning ; ils vous sont indiqués dès le premier échange. Pour les situations sensibles, comme un nettoyage après décès, nous faisons le nécessaire pour vous proposer une date au plus tôt.",
  },
  {
    question: "Quelle différence entre nettoyage et désinfection ?",
    answer:
      "Le nettoyage élimine les salissures ; la désinfection réduit les micro-organismes sur une surface préalablement nettoyée, avec un produit biocide adapté. Les deux sont complémentaires : notre guide dédié détaille la différence.",
  },
  {
    question: "Que signifie la mention Certibiocide ?",
    answer:
      "Le Certibiocide est un certificat individuel, délivré à une personne après une formation, qui permet d'acheter et d'utiliser certains produits biocides réservés aux professionnels. Il ne s'agit pas d'une certification de l'entreprise ou de ses prestations.",
  },
];
