import React from 'react'
import SectionBanner from '@/components/SectionBanner/SectionBanner'
import Menu from '@/components/Menu/Menu'

export const metadata = {
  title: "Service de désinfection à Perpignan | Assainissement & hygiène",
  description:
    "Désinfection professionnelle à Perpignan : élimination de virus, bactéries, champignons et odeurs. Traitements certifiés pour particuliers et entreprises.",
};

export default function page() {

  const slides = [
    { image: '/desinfection1.png', alt: 'Zone désinfectée' },
    { image: '/desinfection2.png', alt: 'Équipe professionnelle' },
    { image: '/desinfection3.png', alt: 'Matériel spécialisé' },
  ];

  const description = `
  Notre service de désinfection intervient pour assurer un environnement sain, propre et sécurisé. 
  Nous utilisons des produits certifiés et des techniques modernes pour éliminer bactéries, virus, moisissures 
  et autres contaminants présents sur toutes les surfaces.

  Nous adaptons nos interventions à vos besoins : désinfection ponctuelle ou régulière, pour les particuliers 
  comme pour les professionnels. Chaque pièce est traitée avec soin, des sols aux surfaces fréquemment touchées, 
  pour garantir une hygiène optimale et prévenir tout risque sanitaire.

  Faire appel à Nettoyage Perpignan pour la désinfection, c’est choisir
  une équipe professionnelle et expérimentée,  
  des techniques efficaces et conformes aux normes sanitaires ainsi 
  que la garantie d’un environnement assaini, sûr et agréable pour votre famille ou vos collaborateurs.
  `;

  return (
    <>
      <SectionBanner
        title="Désinfection professionnelle à Perpignan"
        subtitle="Protégez votre intérieur avec un service sûr et efficace"
        backgroundImage="/desinfection.png"
      />
      <Menu
        title="Service de désinfection"
        description={description}
        slides={slides}
        phoneNumber="0628286967"
        bookingLink="/contact"
      />
    </>
  )
}
