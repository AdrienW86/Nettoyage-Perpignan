import React from 'react'
import SectionBanner from '@/components/SectionBanner/SectionBanner'
import Menu from '@/components/Menu/Menu'

export const metadata = {
  title: "Traitement des nuisibles à Perpignan | Dératisation & désinsectisation",
  description:
    "Experts en traitement des nuisibles à Perpignan : dératisation, désinsectisation, élimination des cafards, punaises de lit, guêpes et rongeurs. Intervention rapide et efficace.",
};

export default function page() {

  const slides = [
    { image: '/nuisibles1.png', alt: 'Équipe en action' },
    { image: '/nuisibles5.png', alt: 'Matériel spécialisé' },
    { image: '/nuisibles4.png', alt: 'Zone traitée' },
  ];

  const description = `
  Notre service de traitement des nuisibles intervient pour éliminer efficacement les rats, souris, insectes 
  et autres parasites, tout en garantissant la sécurité de votre famille ou de vos collaborateurs. 

  Nous utilisons des méthodes professionnelles, adaptées à chaque situation, pour éradiquer les nuisibles 
  tout en respectant l’environnement et la santé des occupants. Chaque intervention est personnalisée, 
  avec un suivi rigoureux et des conseils pour prévenir toute réinfestation.

  Faire appel à Nettoyage Perpignan pour le traitement des nuisibles, c’est choisir
  une équipe expérimentée et qualifiée, 
  des techniques et produits efficaces et sécurisés ainsi 
  que la garantie d’un environnement assaini, sain et protégé pour votre domicile ou votre entreprise.
  `;

  return (
    <>
      <SectionBanner
        title="Traitement des nuisibles à Perpignan"
        subtitle="Éliminez rats, insectes et parasites en toute sécurité"
        backgroundImage="/desinsectisation.png"
      />
      <Menu
        title="Service de traitement des nuisibles"
        description={description}
        slides={slides}
        phoneNumber="0628286967"
        bookingLink="/contact"
      />
    </>
  )
}
