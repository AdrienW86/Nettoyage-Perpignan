import React from "react";
import styles from "./apropos.module.css";

export default function APropos() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>À propos de Nettoyage Perpignan</h1>

      <section className={styles.section}>
        <h2>Notre histoire</h2>
        <p>
          Nettoyage Perpignan est né de la volonté de proposer des services de nettoyage professionnels, fiables et adaptés à chaque besoin. 
          Depuis nos débuts, nous avons accompagné particuliers et entreprises dans la création d’espaces sains, propres et agréables.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Notre mission</h2>
        <p>
          Notre mission est simple : garantir un environnement propre et sécurisé pour tous nos clients. 
          Nous nous engageons à utiliser des méthodes modernes et respectueuses de l'environnement, pour un nettoyage efficace et responsable.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Nos valeurs</h2>
        <ul className={styles.list}>
          <li><strong>Professionnalisme :</strong> des équipes formées et expérimentées.</li>
          <li><strong>Fiabilité :</strong> respect des délais et engagement qualité.</li>
          <li><strong>Respect de l’environnement :</strong> utilisation de produits éco-responsables.</li>
          <li><strong>Proximité :</strong> écoute et adaptation aux besoins spécifiques de chaque client.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Notre équipe</h2>
        <p>
          Chaque membre de notre équipe est sélectionné pour son professionnalisme et sa rigueur. 
          Formés aux bonnes pratiques d’hygiène, nos experts assurent un service de qualité et en toute sécurité.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Contactez-nous</h2>
        <p>
          Vous avez une question ou souhaitez un devis ? <br />
          Téléphone : 06 28 28 69 67 <br />
          Email : contact@nettoyage-perpignan.fr
        </p>
      </section>
    </div>
  );
}
