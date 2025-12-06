import React from 'react'
import SectionBanner from '@/components/SectionBanner/SectionBanner'
import Menu from '@/components/Menu/Menu'

export default function page() {

  const slides = [
    { image: '/nettoyage.png', alt: 'Bureaux nettoyés' },
    { image: '/nettoyage2.png', alt: 'Équipe professionnelle' },
    { image: '/nettoyage3.png', alt: 'Matériel moderne' },
  ];

  const description = `
  Offrez à vos collaborateurs un environnement de travail sain et agréable grâce à notre service
  professionnel de nettoyage de bureaux. Notre équipe expérimentée utilise des techniques modernes
  et des produits respectueux de l'environnement pour éliminer la poussière, les bactéries et les
  saletés difficiles à atteindre. Nous adaptons nos interventions à vos besoins : nettoyage régulier
  quotidien, hebdomadaire ou ponctuel, avec une attention particulière aux surfaces fréquemment
  touchées comme les bureaux, claviers, téléphones et poignées de porte.

  Chez [Nom de l’entreprise], nous privilégions la **qualité et la ponctualité**, avec un suivi
  rigoureux et des équipes formées aux bonnes pratiques d’hygiène professionnelle. Faire appel à
  nos services, c’est garantir un bureau impeccable, sain et propice à la productivité.
  `;

  return (
    <>
    <SectionBanner
        title="Nettoyage professionnel de bureaux à Perpignan"
        subtitle="Des services fiables et rapides pour tous vos besoins"
        backgroundImage="/nettoyage.png"
      />
       <Menu
      title="Nettoyage de bureaux"
      description={description}
      slides={slides}
      phoneNumber="0612345678"
      bookingLink="https://votre-site.com/reservation"
    />
    </>
  )
}
