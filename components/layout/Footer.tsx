import Link from "next/link";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Icon } from "@/components/ui/Icon";
import { mainNav, type NavGroup } from "@/lib/navigation";
import { mailHref, site, telHref } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import styles from "./footer.module.css";

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "Conditions générales", href: "/conditions-generales" },
];

export function Footer({ serviceNav }: { serviceNav: NavGroup[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandCol}>
          <Wordmark />
          <p className={styles.tagline}>
            Nettoyage, désinfection et interventions délicates, pour les particuliers et les professionnels des
            Pyrénées-Orientales.
          </p>
          <ul role="list" className={styles.contact}>
            <li>
              <TrackedLink href={telHref} event="phone_click" location="footer">
                <Icon name="phone" /> {site.contact.phoneDisplay}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink href={mailHref} event="email_click" location="footer">
                <Icon name="mail" /> {site.contact.email}
              </TrackedLink>
            </li>
            <li>
              <span>
                <Icon name="pin" /> Siège à {site.legal.address.locality} ({site.legal.address.postalCode.slice(0, 2)})
              </span>
            </li>
          </ul>
        </div>

        {serviceNav.map((group) => (
          <nav key={group.title} aria-label={group.title} className={styles.col}>
            <p className={styles.colTitle}>{group.title}</p>
            <ul role="list">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Ressources" className={styles.col}>
          <p className={styles.colTitle}>Ressources</p>
          <ul role="list">
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`container ${styles.group}`}>
        <span className={styles.groupRule} aria-hidden="true" />
        <p>
          {site.name} fait partie du groupe{" "}
          <a href={site.group.url} target="_blank" rel="noopener">
            {site.group.name}
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
          .
        </p>
        <span className={styles.groupRule} aria-hidden="true" />
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {site.name} — {site.legal.legalDesignation} · SIRET {site.legal.siret}
        </p>
        <ul role="list" className={styles.legal}>
          {legalLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <p className={styles.note}>
          Les photographies présentes sur ce site sont des visuels d&apos;illustration et ne représentent pas des
          interventions réalisées chez nos clients.
        </p>
        <p className={styles.note}>
          Site réalisé par{" "}
          <a href="https://code-v.fr" target="_blank" rel="noopener">
            Codev
          </a>
        </p>
      </div>
    </footer>
  );
}
