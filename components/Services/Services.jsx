import React from 'react'
import Image from 'next/image'
import styles from './services.module.css'

const servicesData = [
  {
    title: "Nettoyage intérieur",
    image: "/nettoyage2.png"
  },
  {
    title: "Nettoyage de bureaux",
    image: "/nettoyage2.png"
  },
  {
    title: "Désinfection",
    image: "/nettoyage3.png"
  },
  {
    title: "Traitement des nuisibles",
    image: "/nettoyage.png"
  },
  {
    title: "Syndrôme de diogène",
    image: "/nettoyage.png"
  },
  {
    title: "Nettoyage Post-Mortem",
    image: "/nettoyage.png"
  },
]

export default function Services() {
  return (
   <>
    <h2 className={styles.h2}> Nos Services </h2>
    <section className={styles.services}>
      {servicesData.map((service, index) => (
        <div key={index} className={styles.card}>
          <h3 className={styles.h3}>{service.title}</h3>
          <Image
            src={service.image}
            alt={service.title}
            fill
            className={styles.backgroundImage}
            priority
          />
          <div className={styles.overlay}></div> {/* overlay noir */}
        </div>        
      ))}
    </section>
   </>
  )
}