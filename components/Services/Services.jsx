import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './services.module.css';

const servicesData = [
  {
    title: "Nettoyage pour particulier",
    image: "/nettoyage2.png",
    link: "/particuliers"
  },
  {
    title: "Nettoyage de bureaux",
    image: "/nettoyage5.png",
    link: "/bureaux"
  },
  {
    title: "Désinfection",
    image: "/desinfection.png",
    link: "/desinfection"
  },
  {
    title: "Traitement des nuisibles",
    image: "/desinsectisation.png",
    link: "/nuisibles"
  },
  {
    title: "Syndrôme de diogène",
    image: "/diogene2.png",
    link: "/diogene"
  },
  {
    title: "Nettoyage Post-Mortem",
    image: "/post-mortem.png",
    link: "/post-mortem"
  },
];

export default function Services() {
  return (
    <>
      <h2 id="services" className={styles.h2}>Nos Services</h2>
      <section className={styles.services}>
        {servicesData.map((service, index) => (
          <Link key={index} href={service.link} className={styles.card}>
            <h3 className={styles.h3}>{service.title}</h3>
            <Image
              src={service.image}
              alt={service.title}
              fill
              className={styles.backgroundImage}
              priority
            />
            <div className={styles.overlay}></div>
          </Link>
        ))}
      </section>
    </>
  );
}
