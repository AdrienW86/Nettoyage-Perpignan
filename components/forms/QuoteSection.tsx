import { QuoteForm } from "@/components/forms/QuoteForm";
import { Icon } from "@/components/ui/Icon";
import { getAllCommunes } from "@/lib/communes";
import type { QuoteServiceValue } from "@/lib/quote-schema";
import { mailHref, site, telHref } from "@/lib/site";
import styles from "./quoteSection.module.css";

type Props = {
  title?: string;
  intro?: string;
  defaultService?: QuoteServiceValue;
  defaultCommune?: string;
  location: string;
  headingLevel?: 1 | 2;
};

const communeNames = getAllCommunes().map((c) => c.name);

export function QuoteSection({
  title = "Demander un devis",
  intro = "Décrivez votre besoin : nous revenons vers vous pour en parler et, si nécessaire, organiser une visite avant d'établir un devis gratuit.",
  defaultService,
  defaultCommune,
  location,
  headingLevel = 2,
}: Props) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <section id="devis" className={`section ${styles.section}`} aria-labelledby={`devis-${location}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.aside}>
          <p className="eyebrow">Devis gratuit</p>
          <Heading id={`devis-${location}`} className="h-section">
            {title}
          </Heading>
          <p className="lead">{intro}</p>
          <ul role="list" className={styles.points}>
            <li>
              <Icon name="document" /> Devis détaillé et sans engagement
            </li>
            <li>
              <Icon name="hand" /> Particuliers, professionnels, bailleurs, familles
            </li>
            <li>
              <Icon name="pin" /> Intervention dans les Pyrénées-Orientales
            </li>
          </ul>
          <div className={styles.direct}>
            <p>Vous préférez en parler de vive voix ?</p>
            <a href={telHref} className={styles.phone}>
              {site.contact.phoneDisplay}
            </a>
            <a href={mailHref} className={styles.mail}>
              {site.contact.email}
            </a>
          </div>
        </div>
        <div className={styles.card}>
          <QuoteForm
            communes={communeNames}
            defaultService={defaultService}
            defaultCommune={defaultCommune}
            location={location}
            phoneDisplay={site.contact.phoneDisplay}
            phoneHref={telHref}
          />
        </div>
      </div>
    </section>
  );
}
