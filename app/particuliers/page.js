import React from 'react'
import SectionBanner from '@/components/SectionBanner/SectionBanner'
import Menu from '@/components/Menu/Menu'

export const metadata = {
  title: "Nettoyage pour particuliers à Perpignan | Maison & Appartement",
  description:
    "Service de nettoyage professionnel à domicile à Perpignan : maison, appartement, ménage ponctuel ou régulier. Intervention rapide, soignée et adaptée aux besoins des particuliers.",
};

export default function page() {

  const slides = [
    { image: '/nettoyage.png', alt: 'Maison nettoyée' },
    { image: '/nettoyage3.png', alt: 'Équipe professionnelle' },
    { image: '/nettoyage2.png', alt: 'Matériel moderne' },
  ];

  const description = `
  Profitez d’un intérieur impeccable et sain grâce à notre service de nettoyage professionnel à domicile. 
  Nos experts interviennent avec soin et utilisent des produits respectueux de l'environnement pour éliminer 
  poussière, saletés et bactéries, même dans les recoins difficiles.

  Nous adaptons notre intervention à vos besoins : nettoyage ponctuel, hebdomadaire ou régulier. 
  Chaque pièce est traitée avec attention, des sols aux surfaces fréquemment touchées comme cuisines, 
  salles de bain, meubles et tables.  

  Faire appel à Nettoyage Perpignan, c’est choisir 
  une équipe professionnelle et fiable, formée aux bonnes pratiques d’hygiène,
  des techniques de nettoyage modernes et efficaces ainsi
  que la garantie d’un intérieur propre, sain et agréable pour toute la famille.
  `;

  return (
    <>
      <SectionBanner
        title="Nettoyage professionnel de maison à Perpignan"
        subtitle="Des services fiables et adaptés à votre foyer"
        backgroundImage="/nettoyage.png"
      />
      <Menu
        title="Nettoyage à domicile"
        description={description}
        slides={slides}
        phoneNumber="0628286967"
        bookingLink="/contact"
      />
    </>
  )
}
