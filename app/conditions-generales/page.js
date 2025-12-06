import React from "react";
import styles from "./conditions.module.css";

export default function ConditionsGenerales() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Conditions Générales de Vente / Prestation</h1>

      <section className={styles.section}>
        <h2>Objet</h2>
        <p>
          Les présentes conditions régissent les services de nettoyage proposés par Nettoyage Perpignan. 
          Toute commande implique l’acceptation pleine et entière de ces conditions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Services proposés</h2>
        <p>
          Nos prestations incluent le nettoyage de particuliers, bureaux, désinfection, traitement des nuisibles, 
          nettoyage post-mortem et interventions liées au syndrome de Diogène. 
          Chaque intervention est adaptée aux besoins du client.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Tarifs et paiement</h2>
        <p>
          Les tarifs sont indiqués sur devis ou sur demande. Le paiement peut être effectué par virement, carte bancaire ou espèces selon l’accord. 
          Toute prestation commencée est due dans son intégralité.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Annulation et report</h2>
        <p>
          Toute annulation ou modification doit être signalée au moins 24h avant l’intervention. 
          Passé ce délai, des frais peuvent être appliqués.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Responsabilité</h2>
        <p>
          Nettoyage Perpignan met tout en œuvre pour garantir un service de qualité, mais ne peut être tenu responsable des dommages résultant de situations exceptionnelles ou d’un défaut de collaboration du client.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Litiges</h2>
        <p>
          En cas de litige, la juridiction compétente est celle du siège social de Nettoyage Perpignan.
        </p>
      </section>
    </div>
  );
}
