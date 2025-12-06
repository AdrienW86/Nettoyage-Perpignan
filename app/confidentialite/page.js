import React from "react";
import styles from "./confidentialite.module.css";

export default function PolitiqueConfidentialite() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Politique de confidentialité</h1>

      <section className={styles.section}>
        <h2>Collecte des informations</h2>
        <p>
          Nous collectons uniquement les informations nécessaires pour répondre à vos demandes via nos formulaires de contact. 
          Ces informations comprennent votre nom, email, numéro de téléphone et message.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Utilisation des données</h2>
        <p>
          Vos données sont utilisées uniquement pour répondre à vos demandes et pour améliorer nos services. 
          Elles ne sont jamais vendues ou partagées avec des tiers à des fins commerciales.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Durée de conservation</h2>
        <p>
          Vos informations sont conservées uniquement le temps nécessaire pour traiter votre demande et ne dépassent pas 3 ans.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Droits des utilisateurs</h2>
        <p>
          Conformément au RGPD, vous pouvez accéder, rectifier ou supprimer vos données à tout moment en nous contactant à <a href="mailto:contact@nettoyage-perpignan.fr">contact@nettoyage-perpignan.fr</a>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Cookies</h2>
        <p>
          Ce site utilise des cookies uniquement pour améliorer l’expérience utilisateur et analyser le trafic. Vous pouvez les désactiver dans votre navigateur.
        </p>
      </section>
    </div>
  );
}
