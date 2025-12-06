import React from 'react'
import SectionBanner from '@/components/SectionBanner/SectionBanner'
import Menu from '@/components/Menu/Menu'

export const metadata = {
  title: "Nettoyage Syndrome de Diogène à Perpignan | Débarras & désinfection",
  description:
    "Nettoyage complet du syndrome de Diogène à Perpignan : débarras, tri, désinfection, décontamination et remise en état. Intervention rapide, discrète et professionnelle.",
};

export default function page() {

  const slides = [
    { image: '/diogene4.jpg', alt: 'Appartement nettoyé' },
    { image: '/diogene2.jpg', alt: 'Équipe professionnelle' },
    { image: '/diogene3.jpg', alt: 'Matériel spécialisé' },
  ];

  const description = `
  Notre service spécialisé dans le nettoyage pour le syndrome de Diogène intervient avec 
  discrétion, professionnalisme et rigueur. Nous comprenons la sensibilité de ces situations 
  et adaptons nos interventions pour nettoyer efficacement tout type de logement, en respectant 
  la sécurité et l’intégrité des biens.

  Nos équipes formées utilisent des techniques modernes et des produits adaptés pour éliminer 
  poussière, déchets, saletés accumulées et odeurs persistantes, même dans les zones les plus 
  difficiles d’accès. Chaque intervention est planifiée selon vos besoins : nettoyage ponctuel, 
  complet ou suivi, avec un souci constant de respect et de confidentialité.

  Faire appel à Nettoyage Perpignan pour le syndrome de Diogène, c’est choisir
  une équipe expérimentée et discrète,   
  des méthodes efficaces et sécurisées ainsi 
  que la garantie d’un logement assaini et habitable, tout en respectant la dignité des habitants.
  `;

  return (
    <>
      <SectionBanner
        title="Nettoyage spécialisé pour le syndrome de Diogène"
        subtitle="Discrétion, sécurité et efficacité pour votre logement"
        backgroundImage="/diogene2.png"
      />
      <Menu
        title="Intervention syndrôme de Diogène"
        description={description}
        slides={slides}
        phoneNumber="0628286967"
        bookingLink="/contact"
      />
    </>
  )
}

