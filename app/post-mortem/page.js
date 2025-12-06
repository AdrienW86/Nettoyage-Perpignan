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
    { image: '/post-mortem2.png', alt: 'Intervention sécurisée' },
    { image: '/post-mortem4.png', alt: 'Équipe professionnelle' },
    { image: '/post-mortem3.png', alt: 'Matériel spécialisé' },
  ];

  const description = `
  Nos services de nettoyage post-mortem sont réalisés avec discrétion, professionnalisme et respect total. 
  Nous comprenons la délicatesse de ces situations et intervenons rapidement pour assainir et sécuriser 
  les lieux, tout en garantissant la tranquillité des proches.

  Notre équipe utilise des produits et techniques spécialisés pour éliminer les contaminations biologiques, 
  décontaminer les surfaces et désodoriser les pièces, en respectant strictement les normes d’hygiène et 
  de sécurité. Chaque intervention est personnalisée selon la configuration du lieu et les besoins spécifiques.

  Faire appel à Nettoyage Perpignan pour un nettoyage post-mortem, c’est choisir
  une équipe discrète et expérimentée,  
  des méthodes efficaces et sécurisées, conformes aux normes sanitaires ainsi 
  que la garantie d’un environnement assaini et sûr, avec respect et dignité pour toutes les personnes concernées.
  `;

  return (
    <>
      <SectionBanner
        title="Nettoyage post-mortem à Perpignan"
        subtitle="Discrétion, sécurité et assainissement complet"
        backgroundImage="/post-mortem.png"
      />
      <Menu
        title="Intervention post-mortem"
        description={description}
        slides={slides}
        phoneNumber="0628286967"
        bookingLink="/contact"
      />
    </>
  )
}
