import React from 'react'
import Image from 'next/image'
import styles from './services.module.css'

const servicesData = [
  {
    title: "Nettoyage pour particulier",
    image: "/nettoyage2.png"
  },
  {
    title: "Nettoyage de bureaux",
    image: "/nettoyage5.png"
  },
  {
    title: "Désinfection",
    image: "/desinfection.png"
  },
  {
    title: "Traitement des nuisibles",
    image: "/desinsectisation.png"
  },
  {
    title: "Syndrôme de diogène",
    image: "/diogene2.png"
  },
  {
    title: "Nettoyage Post-Mortem",
    image: "/post-mortem.png"
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