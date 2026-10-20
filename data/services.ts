import type { Service, ServiceSlug } from "@/types/content";

/**
 * Prestations du site. Les URL (`path`) sont celles du site historique et
 * ne doivent pas être modifiées sans redirection 301 (voir next.config.ts).
 *
 * Règle éditoriale : ne décrire que ce qui figurait déjà dans l'offre
 * déclarée par l'entreprise. Aucun engagement réglementaire (agrément,
 * norme, habilitation) n'est mentionné tant qu'il n'a pas été justifié.
 */
export const services: Service[] = [
  {
    slug: "particuliers",
    path: "/particuliers",
    name: "Nettoyage pour particuliers",
    navLabel: "Particuliers",
    family: "entretien",
    metaTitle: "Nettoyage de maison et d'appartement à Perpignan",
    metaDescription:
      "Ménage ponctuel ou régulier, nettoyage approfondi de cuisine et salle de bain : un nettoyage soigné de votre logement à Perpignan et alentours. Devis gratuit.",
    h1: "Nettoyage de maison et d'appartement à Perpignan",
    kicker: "Particuliers",
    lead: "Un entretien ponctuel ou régulier, pensé pour votre logement et votre rythme : nous nous occupons des pièces qui demandent du temps, de la méthode et le bon produit.",
    cardText: "Ménage régulier ou ponctuel, nettoyage approfondi des pièces d'eau et des cuisines.",
    heroImage: "particuliersCuisine",
    secondaryImage: "particuliersVitre",
    scope: [
      "Dépoussiérage des meubles, plinthes, rebords et luminaires accessibles",
      "Aspiration et lavage des sols adaptés à chaque revêtement",
      "Cuisine : plans de travail, façades, électroménager en surface, évier et crédence",
      "Salle de bain et WC : détartrage, robinetterie, faïence, joints",
      "Vitres intérieures et miroirs",
      "Nettoyage approfondi ponctuel : entrée dans les lieux, départ, après travaux légers",
    ],
    sections: [
      {
        title: "Un ménage organisé autour de votre logement",
        paragraphs: [
          "Chaque logement a ses contraintes : un parquet huilé ne se lave pas comme un carrelage, une douche à l'italienne marquée par le calcaire de l'eau du Roussillon ne demande pas le même produit qu'un émail ancien. Avant la première intervention, nous faisons le point avec vous sur les pièces prioritaires, les matériaux et ce que vous souhaitez voir traité en premier.",
          "L'intervention peut être ponctuelle — un grand nettoyage avant une réception, avant de rendre les clés ou après un hiver de fermeture — ou s'inscrire dans un rythme régulier, hebdomadaire ou bimensuel, que vous définissez.",
        ],
      },
      {
        title: "Le nettoyage approfondi, quand l'entretien courant ne suffit plus",
        paragraphs: [
          "Un nettoyage approfondi va au-delà du ménage habituel : dessus des meubles hauts, intérieur des placards vidés, joints de carrelage, portes et poignées, interrupteurs, radiateurs. C'est la formule adaptée à une entrée dans les lieux, à un départ de location ou à la remise en route d'une résidence secondaire.",
        ],
        bullets: [
          "Résidence secondaire à rouvrir après plusieurs mois",
          "Logement à rendre propre en fin de bail",
          "Appartement à préparer avant une mise en vente ou une location",
        ],
      },
    ],
    process: [
      { title: "Échange", text: "Vous décrivez le logement, sa surface et vos attentes, par téléphone ou via le formulaire." },
      { title: "Devis", text: "Nous établissons un devis clair : pièces concernées, prestations incluses, durée estimée." },
      { title: "Intervention", text: "Le nettoyage est réalisé avec le matériel et les produits adaptés à vos surfaces." },
      { title: "Vérification", text: "Un tour du logement en fin d'intervention permet de valider ensemble le résultat." },
    ],
    faq: [
      {
        question: "Faut-il fournir les produits et le matériel ?",
        answer:
          "Non, nous venons avec notre matériel et nos produits. Si vous souhaitez l'utilisation d'un produit particulier (pour un sol spécifique, par exemple), indiquez-le lors de la demande de devis.",
      },
      {
        question: "Faut-il être présent pendant le nettoyage ?",
        answer:
          "Ce n'est pas obligatoire. Beaucoup de clients sont présents lors de la première intervention pour expliquer leurs priorités, puis confient les clés pour les passages suivants. Les modalités sont convenues à l'avance.",
      },
      {
        question: "Proposez-vous un nettoyage de fin de bail ?",
        answer:
          "Oui, sous la forme d'un nettoyage approfondi ponctuel. Le devis précise les éléments traités (placards, électroménager en surface, vitres intérieures, sanitaires) afin que vous sachiez exactement ce qui est inclus.",
      },
      {
        question: "Comment le prix est-il calculé ?",
        answer:
          "Le tarif dépend de la surface, de l'état du logement, des prestations demandées et de la fréquence. C'est pourquoi chaque demande fait l'objet d'un devis gratuit et personnalisé.",
      },
    ],
    related: ["desinfection", "bureaux", "nuisibles"],
    relatedArticles: ["preparer-logement-nettoyage-approfondi", "obtenir-devis-nettoyage-adapte", "choisir-entreprise-nettoyage-perpignan"],
    schemaServiceType: "Nettoyage résidentiel",
    ctaTitle: "Parlons de votre logement",
    ctaText: "Surface, pièces prioritaires, fréquence souhaitée : quelques informations suffisent pour établir un devis.",
  },
  {
    slug: "bureaux",
    path: "/bureaux",
    name: "Nettoyage de bureaux et locaux professionnels",
    navLabel: "Bureaux",
    family: "entretien",
    metaTitle: "Nettoyage de bureaux et locaux professionnels à Perpignan",
    metaDescription:
      "Entretien régulier ou ponctuel de bureaux, cabinets et locaux professionnels à Perpignan : postes de travail, sanitaires, sols, points de contact. Devis gratuit.",
    h1: "Nettoyage de bureaux et de locaux professionnels à Perpignan",
    kicker: "Professionnels",
    lead: "Des locaux propres sans perturber votre activité : un entretien planifié selon vos horaires, avec une attention particulière aux surfaces que vos équipes et vos clients touchent chaque jour.",
    cardText: "Entretien planifié de bureaux, cabinets et commerces, en dehors de vos heures d'ouverture si besoin.",
    heroImage: "bureauxOpenSpace",
    secondaryImage: "bureauxPoste",
    scope: [
      "Postes de travail : bureaux dégagés, claviers, téléphones, écrans en surface",
      "Points de contact : poignées, interrupteurs, rampes, boutons d'ascenseur",
      "Sanitaires et espaces de pause : désinfection des surfaces, réapprovisionnement si convenu",
      "Sols : aspiration, lavage, entretien mécanisé des grandes surfaces",
      "Vidage des corbeilles et sortie des déchets selon votre organisation de tri",
      "Vitrerie intérieure et parois vitrées accessibles",
    ],
    sections: [
      {
        title: "Un entretien qui s'adapte à votre activité",
        paragraphs: [
          "Un cabinet médical, une agence qui reçoit du public et un bureau d'études n'ont pas les mêmes besoins. Nous définissons avec vous un cahier des charges simple : quelles zones, à quelle fréquence, à quel moment de la journée, et quelles tâches à chaque passage.",
          "Les interventions peuvent avoir lieu tôt le matin, le soir ou pendant la fermeture, de façon à ne pas gêner vos collaborateurs ni vos clients.",
        ],
      },
      {
        title: "Les points de contact, priorité d'hygiène",
        paragraphs: [
          "Dans des locaux partagés, ce sont les surfaces touchées par tous — poignées, interrupteurs, claviers partagés, robinets — qui concentrent l'essentiel des enjeux d'hygiène. Elles font l'objet d'un traitement systématique, avec un produit adapté à chaque matériau.",
        ],
      },
      {
        title: "Interventions ponctuelles",
        paragraphs: [
          "En dehors de l'entretien régulier, nous intervenons pour des besoins ponctuels : remise en propreté avant l'installation dans de nouveaux locaux, nettoyage après un déménagement ou après de petits travaux, grand nettoyage annuel.",
        ],
      },
    ],
    process: [
      { title: "Visite ou échange", text: "Nous faisons le point sur la surface, la configuration des locaux et vos contraintes horaires." },
      { title: "Cahier des charges", text: "Les tâches et leur fréquence sont listées noir sur blanc dans le devis." },
      { title: "Mise en place", text: "Accès, clés ou badges, consignes de sécurité et de tri sont convenus avant le premier passage." },
      { title: "Suivi", text: "Un interlocuteur joignable directement pour ajuster les prestations au fil du temps." },
    ],
    faq: [
      {
        question: "Intervenez-vous en dehors des heures de bureau ?",
        answer:
          "Oui. Les créneaux sont définis avec vous lors de l'établissement du devis : tôt le matin, en soirée ou pendant les jours de fermeture selon votre organisation.",
      },
      {
        question: "Quelle fréquence de nettoyage choisir pour des bureaux ?",
        answer:
          "Elle dépend du nombre de personnes présentes, de l'accueil du public et de l'usage des pièces. Les sanitaires et espaces de pause demandent généralement des passages plus fréquents que les bureaux individuels. Notre guide sur les méthodes et fréquences détaille les critères.",
      },
      {
        question: "Proposez-vous des contrats d'entretien réguliers ?",
        answer:
          "Oui, l'entretien peut être planifié de façon régulière. Les tâches, la fréquence et les modalités sont précisées dans le devis afin que chaque passage soit prévisible.",
      },
      {
        question: "Pouvez-vous désinfecter les locaux en cas de besoin ?",
        answer:
          "Oui, une désinfection des surfaces peut être ajoutée à l'entretien ou réalisée ponctuellement. Voir notre page dédiée à la désinfection pour la méthode employée.",
      },
    ],
    related: ["desinfection", "particuliers", "nuisibles"],
    relatedArticles: ["nettoyage-bureaux-methodes-frequences", "organiser-entretien-locaux-professionnels", "nettoyage-ou-desinfection-differences"],
    schemaServiceType: "Nettoyage de bureaux",
    ctaTitle: "Un devis pour vos locaux",
    ctaText: "Indiquez la surface, le type d'activité et la fréquence envisagée : nous revenons vers vous avec une proposition détaillée.",
  },
  {
    slug: "desinfection",
    path: "/desinfection",
    name: "Désinfection",
    navLabel: "Désinfection",
    family: "specialise",
    metaTitle: "Désinfection de logements et de locaux à Perpignan",
    metaDescription:
      "Nettoyage puis désinfection des surfaces de logements et locaux professionnels à Perpignan, avec des produits biocides autorisés et utilisés selon leur notice.",
    h1: "Désinfection de logements et de locaux à Perpignan",
    kicker: "Hygiène",
    lead: "Désinfecter, ce n'est pas parfumer une pièce : c'est appliquer le bon produit, sur une surface préalablement nettoyée, pendant le temps de contact nécessaire. Une méthode, pas une impression.",
    cardText: "Nettoyage préalable puis désinfection des surfaces, avec des produits autorisés et un protocole rigoureux.",
    heroImage: "desinfectionPulverisation",
    secondaryImage: "desinfectionEssuyage",
    scope: [
      "Nettoyage préalable des surfaces (étape indispensable à l'efficacité du désinfectant)",
      "Désinfection des surfaces de contact, sanitaires, cuisines et sols",
      "Choix du produit selon la surface et l'usage des lieux",
      "Respect du temps de contact et rinçage lorsque la notice l'exige",
      "Aération et consignes de réoccupation des lieux",
    ],
    sections: [
      {
        title: "Nettoyer d'abord, désinfecter ensuite",
        paragraphs: [
          "Un désinfectant appliqué sur une surface sale perd une grande partie de son efficacité : les salissures et les matières organiques font écran. C'est pourquoi chaque désinfection commence par un nettoyage complet des surfaces concernées.",
          "Vient ensuite l'application du produit désinfectant, puis le respect du temps de contact indiqué par le fabricant — souvent plusieurs minutes — avant essuyage ou rinçage selon la notice.",
        ],
      },
      {
        title: "Des produits biocides utilisés dans leur cadre",
        paragraphs: [
          "Les désinfectants sont des produits biocides, encadrés par la réglementation européenne et française. Nous utilisons des produits autorisés, choisis en fonction de la surface et de l'usage des lieux (surfaces au contact des aliments, sanitaires, chambres…), et appliqués conformément à leur fiche technique et à leur fiche de données de sécurité.",
          "Certains désinfectants réservés aux professionnels ne peuvent être achetés et utilisés que par une personne titulaire d'un Certibiocide de la catégorie correspondante. Nous détaillons ce point dans notre guide consacré au Certibiocide.",
        ],
      },
      {
        title: "Quand faire appel à une désinfection ?",
        paragraphs: [
          "Une désinfection professionnelle se justifie lorsque l'entretien courant ne suffit plus à garantir l'hygiène des lieux :",
        ],
        bullets: [
          "Logement resté longtemps fermé ou fortement souillé",
          "Remise en état après un sinistre domestique (dégât des eaux, débordement)",
          "Locaux recevant du public ou partagés par de nombreuses personnes",
          "Complément d'un nettoyage après décès ou d'une intervention dans un logement encombré",
        ],
      },
    ],
    process: [
      { title: "Évaluation", text: "Nature des lieux, surfaces concernées, occupants (enfants, personnes fragiles, animaux)." },
      { title: "Nettoyage préalable", text: "Les surfaces sont nettoyées pour que le désinfectant puisse agir." },
      { title: "Application", text: "Produit adapté, dosage conforme, temps de contact respecté." },
      { title: "Réoccupation", text: "Aération et consignes claires sur le moment où les lieux peuvent être réutilisés." },
    ],
    precautions: {
      title: "Nos précautions",
      items: [
        "Équipements de protection adaptés au produit utilisé (gants, protection respiratoire si nécessaire)",
        "Pas de mélange de produits, source de réactions dangereuses",
        "Information des occupants sur les délais avant réoccupation",
        "Attention particulière aux surfaces en contact avec les aliments",
      ],
    },
    faq: [
      {
        question: "Quelle différence entre nettoyage et désinfection ?",
        answer:
          "Le nettoyage élimine les salissures visibles. La désinfection vise à réduire les micro-organismes présents sur une surface déjà propre, à l'aide d'un produit biocide adapté. Les deux étapes sont complémentaires : la désinfection n'est efficace que sur une surface préalablement nettoyée.",
      },
      {
        question: "Combien de temps faut-il attendre avant de réoccuper les lieux ?",
        answer:
          "Cela dépend du produit et de la méthode employés. Le délai vous est indiqué avant l'intervention ; dans la plupart des cas, une aération suffit avant la réoccupation des pièces.",
      },
      {
        question: "La désinfection élimine-t-elle les odeurs ?",
        answer:
          "Elle y contribue lorsque les odeurs proviennent de souillures organiques. Une odeur persistante peut toutefois avoir une source à traiter (matériaux imprégnés, canalisations) : nous vous le signalons lors de l'évaluation.",
      },
    ],
    related: ["post-mortem", "diogene", "bureaux"],
    relatedArticles: ["nettoyage-ou-desinfection-differences", "certibiocide-comprendre", "insalubrite-pourquoi-faire-appel-professionnel"],
    schemaServiceType: "Désinfection de surfaces",
    ctaTitle: "Besoin d'une désinfection ?",
    ctaText: "Décrivez les lieux et la situation : nous vous indiquons la méthode envisagée et les délais de réoccupation.",
  },
  {
    slug: "nuisibles",
    path: "/nuisibles",
    name: "Traitement des nuisibles",
    navLabel: "Nuisibles",
    family: "specialise",
    metaTitle: "Traitement des nuisibles à Perpignan : rats, cafards, punaises",
    metaDescription:
      "Dératisation et désinsectisation à Perpignan : rats, souris, cafards, punaises de lit. Diagnostic, traitement adapté et conseils pour éviter le retour des nuisibles.",
    h1: "Traitement des nuisibles à Perpignan",
    kicker: "Dératisation & désinsectisation",
    lead: "Rongeurs, blattes, punaises de lit : un traitement efficace commence par un bon diagnostic. Nous identifions l'espèce, l'étendue de l'infestation et les causes, avant de choisir la méthode.",
    cardText: "Dératisation et désinsectisation : diagnostic, traitement ciblé et conseils de prévention.",
    heroImage: "nuisiblesSejour",
    secondaryImage: "nuisiblesLiterie",
    scope: [
      "Dératisation : rats et souris",
      "Désinsectisation : blattes (cafards), punaises de lit et autres insectes rampants",
      "Diagnostic de l'infestation et repérage des points d'entrée",
      "Traitement ciblé avec des produits adaptés à l'espèce",
      "Conseils de prévention et, si nécessaire, passage de contrôle",
    ],
    sections: [
      {
        title: "Le diagnostic, première étape du traitement",
        paragraphs: [
          "Traiter « à l'aveugle » coûte cher et fonctionne mal. La première étape consiste à identifier précisément le nuisible (une blatte germanique ne se traite pas comme une blatte orientale), à localiser les zones de vie et à comprendre ce qui favorise sa présence : nourriture accessible, humidité, passages de canalisations, fissures.",
        ],
      },
      {
        title: "Des traitements ciblés",
        paragraphs: [
          "Selon le nuisible, le traitement peut associer appâts, gels, pulvérisation localisée et mesures physiques. Les produits sont choisis pour leur efficacité sur l'espèce visée et appliqués de façon ciblée, en limitant l'exposition des occupants et des animaux domestiques.",
          "Les produits rodenticides et insecticides réservés aux professionnels ne peuvent être achetés et utilisés que par une personne titulaire d'un Certibiocide « nuisibles » (ou d'un certificat délivré avant 2024 et toujours valide).",
        ],
      },
      {
        title: "Punaises de lit : une préparation indispensable",
        paragraphs: [
          "Les punaises de lit demandent une préparation rigoureuse du logement avant traitement : lavage du linge à haute température, désencombrement, mise en sacs fermés. Nous vous remettons des consignes précises avant l'intervention, car leur respect conditionne largement le résultat.",
        ],
      },
    ],
    process: [
      { title: "Diagnostic", text: "Identification du nuisible, de l'étendue de l'infestation et de ses causes." },
      { title: "Préparation", text: "Consignes à suivre avant l'intervention pour un traitement efficace." },
      { title: "Traitement", text: "Méthode et produits adaptés à l'espèce et aux lieux." },
      { title: "Prévention", text: "Recommandations pour limiter le risque de réinfestation, contrôle si nécessaire." },
    ],
    precautions: {
      title: "Sécurité des occupants",
      items: [
        "Postes d'appâtage sécurisés, hors de portée des enfants et des animaux",
        "Information sur les délais avant réoccupation des pièces traitées",
        "Produits utilisés conformément à leur autorisation de mise sur le marché",
      ],
    },
    faq: [
      {
        question: "Combien de passages faut-il pour venir à bout des cafards ou des punaises de lit ?",
        answer:
          "Cela dépend de l'espèce et de l'ampleur de l'infestation. Les punaises de lit et les blattes nécessitent souvent plusieurs passages espacés, car certains traitements n'atteignent pas les œufs. Le nombre de passages prévu est indiqué dans le devis.",
      },
      {
        question: "Les traitements sont-ils dangereux pour les enfants ou les animaux ?",
        answer:
          "Les produits sont appliqués de façon ciblée et les consignes de sécurité vous sont communiquées : pièces à éviter pendant un temps donné, aquariums à couvrir, animaux à éloigner. Signalez-nous la présence d'enfants, de personnes fragiles ou d'animaux lors de la demande.",
      },
      {
        question: "Que faire en attendant l'intervention ?",
        answer:
          "Évitez d'utiliser vous-même des insecticides en aérosol, qui peuvent disperser les insectes et compliquer le traitement. Rangez la nourriture dans des contenants fermés et notez les endroits où vous avez observé les nuisibles.",
      },
    ],
    related: ["desinfection", "particuliers", "diogene"],
    relatedArticles: ["certibiocide-comprendre", "insalubrite-pourquoi-faire-appel-professionnel", "obtenir-devis-nettoyage-adapte"],
    schemaServiceType: "Lutte contre les nuisibles",
    ctaTitle: "Un nuisible chez vous ?",
    ctaText: "Indiquez ce que vous avez observé et où : nous vous rappelons pour organiser le diagnostic.",
  },
  {
    slug: "diogene",
    path: "/diogene",
    name: "Nettoyage syndrome de Diogène",
    navLabel: "Syndrome de Diogène",
    family: "specialise",
    metaTitle: "Nettoyage syndrome de Diogène à Perpignan : tri et remise en état",
    metaDescription:
      "Logement encombré ou insalubre à Perpignan : tri, débarras, nettoyage et désinfection, dans le respect de la personne et de ses biens. Intervention discrète, devis gratuit.",
    h1: "Nettoyage d'un logement touché par le syndrome de Diogène",
    kicker: "Logements encombrés",
    lead: "Derrière chaque logement encombré, il y a une histoire et une personne. Nous intervenons avec discrétion et méthode pour rendre le lieu de nouveau sain et habitable, sans jugement.",
    cardText: "Tri, évacuation, nettoyage et désinfection de logements très encombrés, avec discrétion et respect.",
    heroImage: "logementEncombre",
    secondaryImage: "desinfectionEssuyage",
    scope: [
      "Visite préalable et évaluation de la situation",
      "Tri avec la personne ou ses proches : objets à conserver, documents, souvenirs",
      "Évacuation des déchets et des encombrants",
      "Nettoyage complet de toutes les surfaces",
      "Désinfection des pièces souillées",
      "Traitement des nuisibles si leur présence est constatée",
    ],
    sections: [
      {
        title: "Des situations très différentes",
        paragraphs: [
          "Le terme « syndrome de Diogène » est souvent employé pour désigner des situations très diverses : accumulation d'objets sans valeur apparente, entassement de déchets, négligence de l'hygiène du logement, parfois associés à un isolement important. Il peut s'agir d'une personne âgée qui ne parvient plus à entretenir son domicile, d'une personne traversant une période de grande difficulté, ou d'un logement découvert par la famille après une hospitalisation ou un décès.",
          "Nous ne posons pas de diagnostic : notre rôle est d'agir sur le logement. Mais nous savons que l'intervention touche à l'intimité de quelqu'un, et nous la menons en conséquence.",
        ],
      },
      {
        title: "Qui nous contacte ?",
        paragraphs: [
          "La demande vient rarement de la personne elle-même. Ce sont le plus souvent des proches, un tuteur ou curateur, un bailleur, un syndic ou un service social qui prennent contact. Quelle que soit votre situation, un premier échange permet de comprendre le contexte et de définir ce qui est possible.",
        ],
        bullets: [
          "Famille et proches inquiets ou découvrant la situation",
          "Mandataires judiciaires (tutelle, curatelle)",
          "Bailleurs, agences immobilières, syndics de copropriété",
          "Travailleurs sociaux accompagnant la personne",
        ],
      },
      {
        title: "Le tri : une étape qui ne se brusque pas",
        paragraphs: [
          "Dans un logement très encombré se mêlent déchets, objets du quotidien, papiers administratifs et souvenirs. Lorsque la personne est présente ou que la famille le souhaite, le tri se fait avec elle : ce qui doit être conservé est mis de côté avant toute évacuation. Les documents importants (papiers d'identité, courriers administratifs, bancaires, photographies) sont systématiquement rassemblés et remis.",
          "Lorsque l'occupant vit encore dans le logement, l'intervention peut être découpée en plusieurs étapes pour qu'elle reste acceptable pour lui.",
        ],
      },
      {
        title: "Assainir pour rendre le logement habitable",
        paragraphs: [
          "Une fois le logement vidé de ce qui doit l'être, toutes les surfaces sont nettoyées, puis désinfectées là où l'hygiène l'exige : cuisine, sanitaires, sols, zones souillées. Si des nuisibles sont présents — situation fréquente dans ces logements — un traitement peut être réalisé dans la même démarche.",
          "L'objectif est concret : un logement sain, dans lequel la personne peut revenir vivre, ou qui peut être restitué, vendu ou reloué.",
        ],
      },
    ],
    process: [
      { title: "Premier contact", text: "Échange confidentiel sur la situation, la personne concernée et les attentes." },
      { title: "Visite et devis", text: "Évaluation sur place du volume, de l'état sanitaire et des accès, puis devis détaillé." },
      { title: "Tri et évacuation", text: "Mise de côté de ce qui doit être conservé, évacuation du reste." },
      { title: "Nettoyage et désinfection", text: "Toutes les surfaces sont nettoyées, désinfectées si nécessaire, nuisibles traités le cas échéant." },
      { title: "Restitution", text: "Visite de fin d'intervention avec vous et remise des documents retrouvés." },
    ],
    precautions: {
      title: "Discrétion et sécurité",
      items: [
        "Équipements de protection individuelle adaptés aux risques sanitaires",
        "Confidentialité totale vis-à-vis du voisinage",
        "Aucune photographie diffusée : les éventuelles photos servent uniquement au devis et au suivi avec le client",
      ],
    },
    faq: [
      {
        question: "Peut-on intervenir si la personne vit encore dans le logement ?",
        answer:
          "Oui, et c'est fréquent. L'intervention est alors organisée avec la personne et, le cas échéant, avec ses proches ou l'équipe qui l'accompagne. Son adhésion est essentielle : un tri imposé brutalement est souvent mal vécu et peut être suivi d'une nouvelle accumulation.",
      },
      {
        question: "Que deviennent les objets et les papiers trouvés ?",
        answer:
          "Les documents administratifs, papiers personnels, photographies, objets de valeur ou à caractère affectif sont mis de côté et remis à la personne, à la famille ou au mandataire. Le reste est évacué vers les filières adaptées.",
      },
      {
        question: "Combien de temps dure une intervention ?",
        answer:
          "Cela dépend du volume à trier, de la surface et de l'état du logement : de une à plusieurs journées. La durée prévue est indiquée dans le devis, établi après la visite.",
      },
      {
        question: "Qui paie l'intervention ?",
        answer:
          "Selon les situations, il peut s'agir de la personne elle-même, de sa famille, de son mandataire, du propriétaire ou du bailleur. Le devis est adressé à la personne qui commande l'intervention.",
      },
    ],
    related: ["desinfection", "nuisibles", "post-mortem"],
    relatedArticles: ["syndrome-de-diogene-organiser-nettoyage", "insalubrite-pourquoi-faire-appel-professionnel", "etapes-remise-en-etat-logement"],
    schemaServiceType: "Nettoyage de logement encombré (syndrome de Diogène)",
    ctaTitle: "Parlons de la situation, en toute confidentialité",
    ctaText: "Un premier échange, sans engagement, pour comprendre le contexte et vous indiquer ce qui est possible.",
  },
  {
    slug: "post-mortem",
    path: "/post-mortem",
    name: "Nettoyage après décès",
    navLabel: "Après décès",
    family: "specialise",
    metaTitle: "Nettoyage après décès à Perpignan : nettoyage post-mortem",
    metaDescription:
      "Nettoyage et désinfection d'un logement après un décès à Perpignan et dans les Pyrénées-Orientales. Intervention discrète, respectueuse, avec un interlocuteur unique.",
    h1: "Nettoyage après décès à Perpignan",
    kicker: "Nettoyage post-mortem",
    lead: "Lorsqu'un décès est survenu dans un logement, et en particulier lorsqu'il n'a été découvert qu'après plusieurs jours, la remise en état des lieux demande une intervention spécialisée. Nous la prenons en charge avec sobriété et respect.",
    cardText: "Nettoyage et désinfection d'un logement après un décès, avec discrétion et respect des proches.",
    heroImage: "apresDecesChambre",
    secondaryImage: "apresDecesCuisine",
    scope: [
      "Évaluation de l'état des lieux après le départ du défunt",
      "Retrait et évacuation des éléments souillés non récupérables (literie, textiles, revêtements)",
      "Nettoyage approfondi des surfaces concernées",
      "Désinfection des zones contaminées et des pièces attenantes",
      "Traitement des odeurs et des insectes éventuellement présents",
      "Mise de côté des effets personnels et documents pour la famille",
    ],
    sections: [
      {
        title: "Quand intervient-on ?",
        paragraphs: [
          "Notre intervention a lieu après que le corps a été pris en charge par les services compétents (médecin, services funéraires et, le cas échéant, forces de l'ordre). Si une enquête est en cours ou si le logement a été placé sous scellés, nous n'intervenons qu'une fois les lieux libérés par les autorités.",
          "Nous ne réalisons ni soins de conservation ni opérations funéraires, qui relèvent d'opérateurs habilités. Notre rôle commence lorsque la famille, le propriétaire ou le mandataire souhaite rendre le logement de nouveau sain.",
        ],
      },
      {
        title: "Pourquoi une intervention spécialisée ?",
        paragraphs: [
          "Lorsqu'un décès n'est découvert qu'après plusieurs jours, les fluides biologiques peuvent imprégner la literie, les sols et parfois les matériaux en profondeur, et des odeurs persistantes s'installent. Un nettoyage ménager classique ne suffit pas, et il expose les proches à une épreuve inutile ainsi qu'à des risques sanitaires.",
          "Nous intervenons équipés de protections adaptées au risque biologique, avec des produits de nettoyage et de désinfection appropriés, et selon une progression méthodique : des zones les plus touchées vers les pièces attenantes.",
        ],
      },
      {
        title: "Ce que nous attendons de vous : le moins possible",
        paragraphs: [
          "Vous n'avez pas à entrer dans le logement si vous ne le souhaitez pas. Une remise des clés peut être organisée. Avant l'intervention, vous nous indiquez les objets et documents à rechercher en priorité ; tout ce qui peut avoir une valeur personnelle est mis de côté.",
          "Les éléments imprégnés qui ne peuvent pas être récupérés (matelas, textiles, parfois revêtements de sol) sont retirés. Le devis précise ce qui est prévu et la façon dont les déchets sont évacués.",
        ],
      },
    ],
    process: [
      { title: "Premier appel", text: "Vous nous expliquez la situation ; nous vous indiquons les démarches préalables éventuelles." },
      { title: "Évaluation et devis", text: "Évaluation de l'état des lieux (sur place ou sur la base d'informations précises) et devis détaillé." },
      { title: "Intervention", text: "Retrait des éléments souillés, nettoyage, désinfection, traitement des odeurs." },
      { title: "Restitution", text: "Remise des clés et des effets personnels mis de côté." },
    ],
    precautions: {
      title: "Notre engagement",
      items: [
        "Discrétion vis-à-vis du voisinage et de la copropriété",
        "Protections individuelles adaptées au risque biologique",
        "Respect absolu des effets personnels du défunt",
        "Un seul interlocuteur du premier appel à la restitution des clés",
      ],
    },
    faq: [
      {
        question: "Qui peut demander un nettoyage après décès ?",
        answer:
          "La famille, un héritier, le propriétaire ou le bailleur du logement, un notaire ou un mandataire. Le devis est établi au nom de la personne qui commande l'intervention.",
      },
      {
        question: "Faut-il attendre une autorisation avant d'intervenir ?",
        answer:
          "Le corps doit avoir été pris en charge et, si les autorités ont placé le logement sous scellés ou mènent une enquête, il faut attendre que les lieux soient libérés. En cas de doute, nous vous aidons à identifier la personne à contacter.",
      },
      {
        question: "L'assurance habitation peut-elle prendre en charge le nettoyage ?",
        answer:
          "Certains contrats prévoient une prise en charge selon les circonstances. Nous vous conseillons de contacter l'assureur du logement avant l'intervention ; nous fournissons un devis détaillé utile à cette démarche.",
      },
      {
        question: "Les odeurs disparaissent-elles complètement ?",
        answer:
          "Le retrait des éléments imprégnés, le nettoyage et la désinfection éliminent la source des odeurs dans la grande majorité des cas. Lorsque des matériaux sont imprégnés en profondeur (parquet, chape), des travaux complémentaires peuvent être nécessaires : nous vous le signalons honnêtement.",
      },
    ],
    related: ["desinfection", "diogene", "nuisibles"],
    relatedArticles: ["deroulement-nettoyage-apres-deces", "nettoyage-apres-deces-precautions", "nettoyage-ou-desinfection-differences"],
    schemaServiceType: "Nettoyage après décès",
    ctaTitle: "Nous sommes là pour vous décharger",
    ctaText: "Un appel suffit pour nous expliquer la situation. Nous vous guidons sur les étapes et établissons un devis.",
  },
];

const bySlug = new Map(services.map((s) => [s.slug, s]));

export function getService(slug: ServiceSlug): Service {
  const service = bySlug.get(slug);
  if (!service) throw new Error(`Prestation inconnue : ${slug}`);
  return service;
}

export const serviceFamilies = {
  entretien: services.filter((s) => s.family === "entretien"),
  specialise: services.filter((s) => s.family === "specialise"),
};
