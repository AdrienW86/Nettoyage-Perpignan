import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Icon } from "@/components/ui/Icon";
import { telHref } from "@/lib/site";
import styles from "./mobileCallBar.module.css";

/** Barre d'action fixe sur mobile : appel en un geste, devis en deux. */
export function MobileCallBar() {
  return (
    <div className={styles.bar}>
      <TrackedLink href={telHref} event="phone_click" location="mobile-bar" className={styles.call}>
        <Icon name="phone" /> Appeler
      </TrackedLink>
      <TrackedLink href="/contact" event="quote_cta_click" location="mobile-bar" className={styles.quote}>
        Devis gratuit
      </TrackedLink>
    </div>
  );
}
