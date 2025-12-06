import React from "react";
import styles from "./mentions.module.css";

export default function MentionsLegales() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mentions légales</h1>
      <section className={styles.section}>
        <h2>Éditeur du site</h2>
        <p>
          Nom de l’entreprise : Nettoyage Perpignan<br />
          Statut juridique : Entreprise Individuelle<br />
          Adresse : 88 chemin des charrettes, 66380 Pia<br />
          Téléphone : 06 28 28 69 67<br />
          Email : contact@nettoyage-perpignan.fr<br />
          SIRET : 123 456 789 00012
        </p>
      </section>
      <section className={styles.section}>
        <h2>Directeur de la publication</h2>
        <p>Guichard Frédéric – contact@nettoyage-perpignan.fr</p>
      </section>
      <section className={styles.section}>
        <h2>Hébergement</h2>
        <p>
          Nom de l’hébergeur : Vercel<br />
          Adresse : 340 S Lemon Ave, Suite 413, Walnut, CA 91789, USA<br />
          Téléphone : +1 123 456 7890
        </p>
      </section>
      <section className={styles.section}>
        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des contenus présents sur ce site (textes, images, vidéos, logo, design…) est la propriété exclusive de Nettoyage Perpignan. Toute reproduction, même partielle, est interdite sans autorisation.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Protection des données</h2>
        <p>
          Les informations recueillies via le formulaire de contact sont utilisées uniquement pour répondre à vos demandes. Conformément au RGPD, vous pouvez demander la suppression de vos données à tout moment à contact@nettoyage-perpignan.fr.
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
