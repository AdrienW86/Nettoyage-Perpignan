import Link from "next/link";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "./JsonLd";
import styles from "./breadcrumbs.module.css";

export type Crumb = { name: string; path: string };

/** Fil d'Ariane visible + BreadcrumbList. Le premier élément « Accueil » est ajouté automatiquement. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Accueil", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Fil d'Ariane" className={styles.nav}>
        <ol role="list" className={styles.list}>
          {all.map((item, i) => {
            const last = i === all.length - 1;
            return (
              <li key={item.path} className={styles.item}>
                {last ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
