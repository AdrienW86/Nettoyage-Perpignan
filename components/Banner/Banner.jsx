"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./banner.module.css";

export default function Banner() {
  return (
    <section className={styles.banner}>
      {/* Background Image */}
      <Image
        src="/nettoyage4.png"
        alt="Entreprise de nettoyage"
        fill
        className={styles.backgroundImage}
        priority
      />

      {/* Overlay */}
      <div className={styles.overlay} />

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.textContent}
      >
        <h1 className={styles.title}>
          Nettoyage professionnel pour particuliers et entreprises
        </h1>
        <p className={styles.subtitle}>
          Des services de nettoyage fiables, soignés et adaptés à tous vos besoins sur Perpignan et ses environs.
        </p>
        <div className={styles.button_container}>
            <button className={styles.btn}> Réserver </button>
           <button className={styles.btn2}> Devis gratuit </button>
        </div>
      </motion.div>
    </section>
  );
}