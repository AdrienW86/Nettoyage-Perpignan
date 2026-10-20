import type { Faq } from "@/types/content";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "./JsonLd";
import styles from "./faq.module.css";

/**
 * FAQ accessible sans JavaScript (<details>/<summary>).
 * Le balisage FAQPage décrit le contenu visible ; il ne garantit aucun
 * affichage enrichi dans les résultats de recherche.
 */
export function FaqList({ items, withSchema = true }: { items: Faq[]; withSchema?: boolean }) {
  return (
    <>
      <div className={styles.list}>
        {items.map((f) => (
          <details key={f.question} className={styles.item}>
            <summary className={styles.question}>
              <span>{f.question}</span>
              <span className={styles.plus} aria-hidden="true" />
            </summary>
            <div className={styles.answer}>
              <p>{f.answer}</p>
            </div>
          </details>
        ))}
      </div>
      {withSchema ? <JsonLd data={faqSchema(items)} /> : null}
    </>
  );
}
