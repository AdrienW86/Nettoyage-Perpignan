import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { CommuneSearch, type CommuneOption } from "@/components/zones/CommuneSearch";
import { DepartmentMap } from "@/components/zones/DepartmentMap";
import { communesMeta, formatPopulation, getAllCommunes, getPublishedLocalPages, normalizeSearch } from "@/lib/communes";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import styles from "./zones.module.css";

export const metadata = buildMetadata({
  title: "Zones d'intervention dans les Pyrénées-Orientales",
  description:
    "Nettoyage, désinfection et interventions délicates à Perpignan et dans les Pyrénées-Orientales : retrouvez votre commune parmi les 226 du département.",
  path: "/zones-intervention",
});

export default function ZonesPage() {
  const communes = getAllCommunes();
  const published = getPublishedLocalPages();
  const options: CommuneOption[] = communes.map((c) => ({
    name: c.name,
    slug: c.slug,
    postalCodes: c.postalCodes,
    distanceKm: c.distanceKm,
    hasPage: c.hasPage,
    served: c.service === "declared",
    key: normalizeSearch(c.name),
  }));

  const byLetter = new Map<string, typeof communes>();
  for (const c of communes) {
    const letter = normalizeSearch(c.name).charAt(0).toUpperCase();
    byLetter.set(letter, [...(byLetter.get(letter) ?? []), c]);
  }

  return (
    <>
      <PageHero
        kicker="Zones d'intervention"
        title="Perpignan et les Pyrénées-Orientales"
        lead={
          <p>
            Depuis notre siège de {site.base.locality}, au nord de Perpignan, nous intervenons dans l&apos;agglomération
            perpignanaise et au-delà selon la nature de l&apos;intervention. Recherchez votre commune pour savoir comment
            nous joindre.
          </p>
        }
        breadcrumbs={[{ name: "Zones d'intervention", path: "/zones-intervention" }]}
      />

      <section className="section" aria-labelledby="recherche">
        <div className={`container ${styles.searchGrid}`}>
          <div className={styles.searchText}>
            <p className="eyebrow">Votre commune</p>
            <h2 id="recherche" className="h-section">
              Intervenons-nous chez vous&nbsp;?
            </h2>
            <p className="lead">
              Notre référentiel couvre les {communesMeta.count} communes du département. Pour les communes éloignées de
              l&apos;agglomération, la possibilité et le délai d&apos;intervention dépendent de la prestation : un
              simple appel permet de vous répondre.
            </p>
          </div>
          <CommuneSearch communes={options} />
        </div>
      </section>

      <section className={`section on-dark ${styles.mapSection}`} aria-labelledby="carte">
        <div className={`container ${styles.mapGrid}`}>
          <div className={styles.mapText}>
            <p className="eyebrow">Notre secteur</p>
            <h2 id="carte" className="h-section">
              Au cœur de la plaine du Roussillon
            </h2>
            <p className="lead">
              {site.base.locality} se trouve à quelques minutes de Perpignan, à proximité immédiate des grands axes
              qui desservent la Salanque, la côte et la plaine.
            </p>
            <ul role="list" className={styles.pageList}>
              <li>
                <Link href="/" className={styles.pageLink}>
                  <span>Perpignan</span>
                  <small>Notre secteur principal</small>
                  <Icon name="arrow" />
                </Link>
              </li>
              {published.map(({ commune }) => (
                <li key={commune.slug}>
                  <Link href={`/zones-intervention/${commune.slug}`} className={styles.pageLink}>
                    <span>{commune.name}</span>
                    <small>
                      {commune.postalCodes.join(", ")}
                      {commune.population ? ` · ${formatPopulation(commune.population)} hab.` : ""}
                    </small>
                    <Icon name="arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Reveal>
            <DepartmentMap highlight={["perpignan", ...published.map((p) => p.commune.slug)]} />
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="toutes">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Référentiel</p>
            <h2 id="toutes" className="h-section">
              Les {communesMeta.count} communes des Pyrénées-Orientales
            </h2>
            <p className={styles.source}>
              Source : {communesMeta.source}, données importées le{" "}
              {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(communesMeta.importedAt))}. La
              présence d&apos;une commune dans cette liste ne signifie pas qu&apos;une intervention y est possible à
              tout moment : contactez-nous pour le vérifier.
            </p>
          </div>
          <details className={styles.allDetails}>
            <summary>Afficher la liste complète</summary>
            <div className={styles.letters}>
              {[...byLetter.entries()].map(([letter, list]) => (
                <div key={letter} className={styles.letter}>
                  <p className={styles.letterTitle}>{letter}</p>
                  <ul role="list">
                    {list.map((c) => (
                      <li key={c.inseeCode}>
                        {c.hasPage ? <Link href={`/zones-intervention/${c.slug}`}>{c.name}</Link> : c.name}{" "}
                        <span className={styles.cp}>{c.postalCodes.join(", ")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      <CtaBand
        title="Votre commune n'apparaît pas parmi nos pages ?"
        text="Nous intervenons bien au-delà des communes présentées. Indiquez-nous votre adresse et la nature de l'intervention."
        location="band-zones"
      />
    </>
  );
}
