import Link from "next/link";
import { site } from "@/lib/site";
import { Icon } from "./Icon";
import styles from "./certibiocide.module.css";

/**
 * Encart de réassurance Certibiocide.
 *
 * Tant que le titulaire, la catégorie et la date de validité ne sont pas
 * renseignés dans lib/site.ts, seule une mention générale est affichée.
 * Le texte rappelle systématiquement qu'il s'agit d'un certificat individuel
 * et non d'une certification de l'entreprise ou de ses prestations.
 */
export function CertibiocideNotice({ variant = "full" }: { variant?: "full" | "compact" }) {
  const c = site.certibiocide;
  if (!c.declared) return null;

  const detailed = c.holder && c.category && c.validUntil;
  const validUntil = c.validUntil
    ? new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(c.validUntil))
    : null;

  return (
    <aside className={`${styles.box} ${variant === "compact" ? styles.compact : ""}`} aria-label="Certibiocide">
      <div className={styles.seal} aria-hidden="true">
        <Icon name="shield" />
      </div>
      <div className={styles.body}>
        <p className={styles.kicker}>Certibiocide</p>
        <p className={styles.title}>
          {detailed
            ? `${c.holder} est titulaire du Certibiocide « ${c.category} », valable jusqu'au ${validUntil}.`
            : `${site.name} s'appuie sur un intervenant titulaire du Certibiocide, le certificat requis pour acheter et utiliser certains produits biocides réservés aux professionnels.`}
        </p>
        {variant === "full" ? (
          <p className={styles.text}>
            Le Certibiocide est un certificat individuel délivré par le ministère chargé de l&apos;environnement, après
            une formation, à la personne qui achète ou utilise certains produits biocides professionnels. Il atteste
            d&apos;une connaissance des produits et de leurs règles d&apos;utilisation ; ce n&apos;est ni un agrément
            de l&apos;entreprise ni une certification de ses prestations.{" "}
            <Link href="/conseils/certibiocide-comprendre">Comprendre le Certibiocide</Link>
          </p>
        ) : null}
      </div>
    </aside>
  );
}
