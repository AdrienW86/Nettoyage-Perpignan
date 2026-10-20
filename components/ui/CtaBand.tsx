import { TrackedLink } from "@/components/analytics/TrackedLink";
import { site, telHref } from "@/lib/site";
import { Icon } from "./Icon";
import styles from "./ctaBand.module.css";

type Props = { title: string; text: string; location: string; quoteHref?: string };

export function CtaBand({ title, text, location, quoteHref = "/contact" }: Props) {
  return (
    <section className={`on-petrol ${styles.band}`} aria-labelledby={`cta-${location}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <h2 id={`cta-${location}`} className={styles.title}>
            {title}
          </h2>
          <p className="lead">{text}</p>
        </div>
        <div className={styles.actions}>
          <TrackedLink href={quoteHref} event="quote_cta_click" location={location} className="btn">
            Demander un devis <Icon name="arrow" />
          </TrackedLink>
          <TrackedLink href={telHref} event="phone_click" location={location} className="btn btn-ghost">
            <Icon name="phone" /> {site.contact.phoneDisplay}
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
