import type { LocalPage } from "@/types/content";

/**
 * Contenus éditoriaux des pages locales publiées.
 *
 * Chaque page doit apporter une information propre à la commune : contexte
 * du bâti et des usages, besoins spécifiques, logistique. Les données
 * chiffrées (codes postaux, population, intercommunalité, distance) sont
 * injectées automatiquement depuis le référentiel officiel.
 *
 * Aucune adresse ni agence locale n'est mentionnée : l'entreprise se déplace
 * depuis son siège de Pia.
 */
export const localPages: LocalPage[] = [
  {
    slug: "pia",
    metaTitle: "Entreprise de nettoyage à Pia (66380)",
    metaDescription:
      "Nettoyage de maisons, bureaux, désinfection et interventions délicates à Pia, commune du siège de Nettoyage Perpignan. Devis gratuit, intervention rapide.",
    h1: "Nettoyage à Pia",
    intro: [
      "Pia est la commune de notre siège. Entre son cœur de village et ses quartiers pavillonnaires étendus au fil des dernières décennies, elle compte aujourd'hui plus de 11 000 habitants, aux portes nord de Perpignan.",
      "Être installés sur place a un avantage simple : les déplacements sont courts, ce qui facilite les interventions programmées rapidement, les visites préalables avant devis et les passages réguliers d'entretien.",
    ],
    context: {
      title: "Les besoins que nous rencontrons à Pia",
      paragraphs: [
        "Les maisons individuelles avec jardin, nombreuses sur la commune, génèrent des besoins d'entretien réguliers, mais aussi de nettoyages approfondis au moment d'un emménagement, d'une vente ou après des travaux.",
        "La proximité de la plaine agricole et des cours d'eau de la Salanque peut aussi favoriser, selon les saisons, la présence de rongeurs dans les annexes, garages et vides sanitaires : un diagnostic permet d'identifier les points d'entrée avant tout traitement.",
      ],
    },
    focus: [
      { service: "particuliers", text: "Entretien régulier ou nettoyage approfondi de maisons et d'appartements." },
      { service: "nuisibles", text: "Dératisation de garages, annexes et vides sanitaires, désinsectisation." },
      { service: "bureaux", text: "Entretien des locaux professionnels et commerces de la commune." },
    ],
    faq: [
      {
        question: "Intervenez-vous rapidement à Pia ?",
        answer:
          "Pia étant la commune de notre siège, les déplacements sont courts. Les délais dépendent du planning et du type d'intervention ; ils vous sont indiqués lors de la demande de devis.",
      },
      {
        question: "Une visite avant devis est-elle possible ?",
        answer:
          "Oui. Pour les nettoyages approfondis, les logements encombrés ou les traitements de nuisibles, une visite permet d'établir un devis précis.",
      },
    ],
  },
  {
    slug: "cabestany",
    metaTitle: "Entreprise de nettoyage à Cabestany (66330)",
    metaDescription:
      "Nettoyage de logements et de bureaux, désinfection, traitement des nuisibles et interventions délicates à Cabestany, aux portes de Perpignan. Devis gratuit.",
    h1: "Nettoyage à Cabestany",
    intro: [
      "Accolée à Perpignan à l'est, sur la route de la mer, Cabestany compte un peu plus de 10 000 habitants. La commune, connue pour le tympan sculpté de son église qui a donné son nom au « Maître de Cabestany », est aujourd'hui largement résidentielle.",
      "Nous y intervenons pour les particuliers comme pour les professionnels, depuis notre siège de Pia, situé à moins de dix kilomètres.",
    ],
    context: {
      title: "Nettoyer à Cabestany : ce qu'il faut savoir",
      paragraphs: [
        "Le parc de logements de Cabestany associe un centre ancien et de nombreux quartiers pavillonnaires plus récents. Les demandes portent souvent sur l'entretien régulier de maisons familiales et sur les nettoyages approfondis lors des changements d'occupants.",
        "La commune accueille aussi des commerces, cabinets et entreprises qui ont besoin d'un entretien planifié de leurs locaux, en dehors des heures d'ouverture.",
      ],
    },
    focus: [
      { service: "particuliers", text: "Ménage régulier, nettoyage de fin de bail ou d'emménagement." },
      { service: "bureaux", text: "Entretien de cabinets, commerces et bureaux, en horaires décalés si besoin." },
      { service: "desinfection", text: "Désinfection de logements et de locaux recevant du public." },
    ],
    faq: [
      {
        question: "Proposez-vous l'entretien régulier de maisons à Cabestany ?",
        answer:
          "Oui, l'entretien peut être hebdomadaire, bimensuel ou ponctuel. La fréquence et les tâches sont définies ensemble dans le devis.",
      },
      {
        question: "Intervenez-vous pour les commerces et cabinets de Cabestany ?",
        answer:
          "Oui, nous assurons l'entretien de locaux professionnels, en adaptant les horaires à votre activité.",
      },
    ],
  },
  {
    slug: "canet-en-roussillon",
    metaTitle: "Nettoyage à Canet-en-Roussillon (66140) : logements et locaux",
    metaDescription:
      "Nettoyage de résidences principales et secondaires, remise en propreté avant ou après la saison, désinfection et nuisibles à Canet-en-Roussillon. Devis gratuit.",
    h1: "Nettoyage à Canet-en-Roussillon",
    intro: [
      "Entre l'étang de Canet-Saint-Nazaire et la Méditerranée, Canet-en-Roussillon compte plus de 13 000 habitants à l'année, et bien davantage en été. Canet-Plage, son port et ses résidences en front de mer en font l'une des principales stations balnéaires du département.",
      "Ce double visage — ville à l'année et station touristique — se traduit par des besoins de nettoyage très spécifiques.",
    ],
    context: {
      title: "Résidences secondaires, air marin et saisonnalité",
      paragraphs: [
        "De nombreux appartements et maisons ne sont occupés qu'une partie de l'année. À la réouverture, après plusieurs mois de fermeture, un nettoyage approfondi s'impose : poussière, sable apporté par le vent, dépôts salins sur les vitres et les menuiseries, odeurs de renfermé.",
        "En fin de saison, un grand nettoyage avant la fermeture du logement limite les mauvaises surprises au retour. Nous pouvons intervenir clés confiées, sans que vous ayez à vous déplacer.",
        "L'humidité de l'air marin et la proximité de l'étang peuvent également favoriser certains insectes : en cas de doute, un diagnostic permet de choisir le traitement adapté.",
      ],
    },
    focus: [
      { service: "particuliers", text: "Ouverture et fermeture de résidences secondaires, nettoyage approfondi." },
      { service: "desinfection", text: "Désinfection d'un logement resté longtemps fermé." },
      { service: "nuisibles", text: "Désinsectisation et dératisation de logements et d'annexes." },
    ],
    faq: [
      {
        question: "Pouvez-vous nettoyer ma résidence secondaire en mon absence ?",
        answer:
          "Oui. Les modalités de remise des clés et le contenu de la prestation sont définis à l'avance ; nous vous confirmons la fin de l'intervention.",
      },
      {
        question: "Intervenez-vous à Canet-Plage comme au village ?",
        answer: "Oui, nous intervenons sur l'ensemble de la commune de Canet-en-Roussillon, plage et village.",
      },
    ],
  },
  {
    slug: "saint-esteve",
    metaTitle: "Entreprise de nettoyage à Saint-Estève (66240)",
    metaDescription:
      "Nettoyage de maisons et de bureaux, désinfection, nuisibles, logements encombrés et nettoyage après décès à Saint-Estève. Devis gratuit et personnalisé.",
    h1: "Nettoyage à Saint-Estève",
    intro: [
      "Limitrophe de Perpignan au nord-ouest, Saint-Estève est, avec plus de 11 600 habitants, l'une des communes les plus peuplées de la périphérie perpignanaise. Elle fait partie de Perpignan Méditerranée Métropole.",
      "Notre siège de Pia se trouve à quelques kilomètres : nous y intervenons régulièrement pour des particuliers et des professionnels.",
    ],
    context: {
      title: "Un habitat résidentiel, des besoins variés",
      paragraphs: [
        "Saint-Estève s'est fortement développée autour de quartiers pavillonnaires et de petites résidences. Les besoins les plus fréquents concernent l'entretien des maisons, les nettoyages lors d'un déménagement et, pour les familles, l'accompagnement dans des situations difficiles : logement d'un parent devenu trop encombré, ou nettoyage après le décès d'un proche.",
        "Dans ces situations délicates, la proximité permet une visite préalable rapide et un échange de vive voix avant d'établir un devis.",
      ],
    },
    focus: [
      { service: "particuliers", text: "Entretien de maisons, nettoyage d'emménagement ou de déménagement." },
      { service: "diogene", text: "Tri et remise en état d'un logement très encombré, avec la famille." },
      { service: "post-mortem", text: "Nettoyage et désinfection d'un logement après un décès." },
    ],
    faq: [
      {
        question: "Pouvez-vous intervenir dans le logement d'un parent âgé à Saint-Estève ?",
        answer:
          "Oui. Nous organisons l'intervention avec la famille et, si possible, avec la personne concernée, en respectant ses souhaits sur ce qui doit être conservé.",
      },
      {
        question: "Faut-il être présent lors de la visite préalable ?",
        answer:
          "Ce n'est pas obligatoire si les clés peuvent être confiées, mais un échange sur place facilite la compréhension de vos attentes.",
      },
    ],
  },
  {
    slug: "argeles-sur-mer",
    metaTitle: "Nettoyage à Argelès-sur-Mer (66700) : logements et locaux",
    metaDescription:
      "Nettoyage de résidences principales et secondaires, désinfection, nuisibles et interventions délicates à Argelès-sur-Mer et sur la côte. Devis gratuit.",
    h1: "Nettoyage à Argelès-sur-Mer",
    intro: [
      "Au pied des Albères, là où la plage de sable laisse place aux criques de la Côte Vermeille, Argelès-sur-Mer compte plus de 10 000 habitants à l'année. En été, la commune, réputée pour son nombre exceptionnel de campings et d'hébergements touristiques, voit sa population se multiplier.",
      "Argelès se situe à environ 25 km à vol d'oiseau de notre siège de Pia : nous y intervenons sur rendez-vous, en regroupant si possible les déplacements.",
    ],
    context: {
      title: "Entre station balnéaire et village",
      paragraphs: [
        "Le parc de logements d'Argelès-sur-Mer comprend une part importante de résidences secondaires et de locations saisonnières. Les demandes portent souvent sur des nettoyages approfondis à l'ouverture ou à la fermeture de la saison, lorsque le logement est resté inoccupé plusieurs mois.",
        "Comme sur tout le littoral, l'air marin dépose du sel sur les vitres et les menuiseries, et le sable s'invite à l'intérieur : ces salissures demandent des produits et un rinçage adaptés pour ne pas abîmer les surfaces.",
      ],
    },
    focus: [
      { service: "particuliers", text: "Nettoyage approfondi de résidences secondaires, avant ou après la saison." },
      { service: "desinfection", text: "Désinfection d'un logement inoccupé ou fortement souillé." },
      { service: "nuisibles", text: "Traitement des insectes et rongeurs dans les logements et annexes." },
    ],
    faq: [
      {
        question: "Les délais sont-ils plus longs pour Argelès-sur-Mer ?",
        answer:
          "Argelès étant plus éloignée de notre siège que les communes de l'agglomération perpignanaise, nous planifions les interventions sur rendez-vous. Les délais vous sont indiqués à la demande de devis.",
      },
      {
        question: "Intervenez-vous aussi à Collioure ou Port-Vendres ?",
        answer:
          "Contactez-nous en précisant la commune et la nature de l'intervention : nous vous indiquons si et dans quels délais un déplacement est possible.",
      },
    ],
  },
];
