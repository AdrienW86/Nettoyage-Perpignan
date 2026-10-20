import Image from "next/image";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Icon } from "@/components/ui/Icon";
import { images } from "@/lib/images";
import { site, telHref } from "@/lib/site";
import styles from "./hero.module.css";

export function Hero() {
  const img = images.hero;
  return (
    <section className={`on-dark ${styles.hero}`} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.text}>
          <p className={`eyebrow ${styles.kicker}`}>Pyrénées-Orientales · Particuliers & professionnels</p>
          <h1 id="hero-title" className={styles.title}>
            Le nettoyage à Perpignan, <em className={styles.accent}>jusqu&apos;aux situations les plus délicates.</em>
          </h1>
          <p className={styles.lead}>
            Entretien de logements et de bureaux, désinfection, nuisibles, mais aussi logements encombrés et nettoyage
            après décès : une intervention méthodique, discrète et respectueuse, depuis notre siège de{" "}
            {site.base.locality}.
          </p>
          <div className={styles.ctas}>
            <TrackedLink href="#devis" event="quote_cta_click" location="hero-home" className="btn">
              Demander un devis gratuit <Icon name="arrow" />
            </TrackedLink>
            <TrackedLink href={telHref} event="phone_click" location="hero-home" className="btn btn-ghost">
              <Icon name="phone" /> {site.contact.phoneDisplay}
            </TrackedLink>
          </div>
          <ul role="list" className={styles.badges}>
            <li>
              <Icon name="check" /> Devis gratuit et détaillé
            </li>
            <li>
              <Icon name="shield" /> Intervenant titulaire du Certibiocide
            </li>
            <li>
              <Icon name="pin" /> Perpignan et alentours
            </li>
          </ul>
        </div>

        <figure className={styles.figure}>
          <div className={styles.arch}>
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              priority
              fetchPriority="high"
              sizes="(min-width: 1000px) 38vw, 0px"
              className={styles.img}
            />
          </div>
          <figcaption className={styles.caption}>Photo d&apos;illustration</figcaption>
          <div className={styles.card} aria-hidden="true">
            <span className={styles.cardKicker}>Depuis 2018</span>
            <span className={styles.cardText}>Entreprise immatriculée au registre national des entreprises</span>
          </div>
        </figure>
      </div>
      <div className={styles.scrollHint} aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
