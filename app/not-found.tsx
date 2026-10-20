import Link from "next/link";
import { services } from "@/data/services";
import styles from "./not-found.module.css";

export const metadata = { title: "Page introuvable", robots: { index: false } };

export default function NotFound() {
  return (
    <section className={`on-dark ${styles.wrap}`}>
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">Erreur 404</p>
        <h1 className={styles.title}>Cette page est introuvable.</h1>
        <p className="lead">
          Le lien est peut-être ancien ou mal saisi. Voici les pages les plus consultées pour retrouver votre chemin.
        </p>
        <ul role="list" className={styles.links}>
          <li>
            <Link href="/">Accueil</Link>
          </li>
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={s.path}>{s.name}</Link>
            </li>
          ))}
          <li>
            <Link href="/contact">Contact et devis</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
