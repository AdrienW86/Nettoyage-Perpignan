import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { QuoteSection } from "@/components/forms/QuoteSection";
import { Reveal } from "@/components/motion/Reveal";
import { CertibiocideNotice } from "@/components/ui/CertibiocideNotice";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { DepartmentMap } from "@/components/zones/DepartmentMap";
import { getService, services } from "@/data/services";
import { formatPopulation, getLocalPage, getNearbyCommunes, getPublishedLocalPages } from "@/lib/communes";
import { localPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site, telHref } from "@/lib/site";
import styles from "../zones.module.css";

type Props = { params: Promise<{ commune: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedLocalPages().map(({ commune }) => ({ commune: commune.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { commune: slug } = await params;
  const data = getLocalPage(slug);
  if (!data) return {};
  return buildMetadata({
    title: data.page.metaTitle,
    description: data.page.metaDescription,
    path: `/zones-intervention/${slug}`,
  });
}

export default async function LocalPage({ params }: Props) {
  const { commune: slug } = await params;
  const data = getLocalPage(slug);
  if (!data) notFound();
  const { commune, page } = data;
  const path = `/zones-intervention/${commune.slug}`;
  const nearby = getNearbyCommunes(commune, 8);
  const focusSlugs = new Set(page.focus.map((f) => f.service));
  const otherServices = services.filter((s) => !focusSlugs.has(s.slug));

  return (
    <>
      <PageHero
        kicker={`${commune.name} · ${commune.postalCodes.join(", ")}`}
        title={page.h1}
        lead={<p>{page.intro[0]}</p>}
        breadcrumbs={[
          { name: "Zones d'intervention", path: "/zones-intervention" },
          { name: commune.name, path },
        ]}
      >
        <TrackedLink href="#devis" event="quote_cta_click" location={`hero-local-${commune.slug}`} className="btn">
          Devis à {commune.name} <Icon name="arrow" />
        </TrackedLink>
        <TrackedLink href={telHref} event="phone_click" location={`hero-local-${commune.slug}`} className="btn btn-ghost">
          <Icon name="phone" /> {site.contact.phoneDisplay}
        </TrackedLink>
      </PageHero>

      <section className="section" aria-labelledby="contexte">
        <div className={`container ${styles.localGrid}`}>
          <div className={styles.localText}>
            {page.intro.slice(1).map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
            <h2 id="contexte" className="h-sub">
              {page.context.title}
            </h2>
            {page.context.paragraphs.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
          </div>
          <aside aria-label={`${commune.name} en bref`}>
            <dl className={styles.facts}>
              <div className={styles.fact}>
                <dt className={styles.factLabel}>Code{commune.postalCodes.length > 1 ? "s" : ""} postal</dt>
                <dd className={styles.factValue}>{commune.postalCodes.join(", ")}</dd>
              </div>
              <div className={styles.fact}>
                <dt className={styles.factLabel}>Code INSEE</dt>
                <dd className={styles.factValue}>{commune.inseeCode}</dd>
              </div>
              {commune.population ? (
                <div className={styles.fact}>
                  <dt className={styles.factLabel}>Population</dt>
                  <dd className={styles.factValue}>{formatPopulation(commune.population)} hab.</dd>
                </div>
              ) : null}
              {commune.distanceKm !== null ? (
                <div className={styles.fact}>
                  <dt className={styles.factLabel}>Depuis {site.base.locality}</dt>
                  <dd className={styles.factValue}>{commune.name === site.base.locality ? "Siège" : `≈ ${commune.distanceKm} km`}</dd>
                </div>
              ) : null}
            </dl>
            <p className={styles.factsNote}>
              Données officielles (INSEE, API Géo). Distance à vol d&apos;oiseau entre les centres des communes.
              {commune.epci ? ` Intercommunalité : ${commune.epci.name}.` : ""}
            </p>
          </aside>
        </div>
      </section>

      <section className="section on-paper" aria-labelledby="services-local">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">À {commune.name}</p>
            <h2 id="services-local" className="h-section">
              Les interventions les plus demandées
            </h2>
          </div>
          <ul role="list" className={styles.focusList}>
            {page.focus.map((f, i) => {
              const s = getService(f.service);
              return (
                <Reveal as="li" key={f.service} delay={i * 0.06} className={styles.focus}>
                  <Link href={s.path}>{s.name}</Link>
                  <p>{f.text}</p>
                </Reveal>
              );
            })}
          </ul>
          <h3 className={`h-sub ${styles.otherTitle}`}>
            Nos autres prestations à {commune.name}
          </h3>
          <div className={styles.focusList}>
            {otherServices.map((s) => (
              <ServiceCard key={s.slug} service={s} headingLevel={3} />
            ))}
          </div>
        </div>
      </section>

      <section className="section on-dark" aria-labelledby="secteur">
        <div className={`container ${styles.mapGrid}`}>
          <div className={styles.mapText}>
            <p className="eyebrow">Autour de {commune.name}</p>
            <h2 id="secteur" className="h-section">
              Communes voisines
            </h2>
            <p className="lead">
              Nous intervenons également dans les communes proches. Contactez-nous pour vérifier la disponibilité
              selon votre adresse et la prestation souhaitée.
            </p>
            <ul role="list" className={`${styles.nearby} ${styles.nearbyDark}`}>
              {nearby.map((c) => (
                <li key={c.inseeCode}>
                  {c.hasPage ? (
                    <Link href={`/zones-intervention/${c.slug}`}>
                      {c.name}
                    </Link>
                  ) : (
                    c.name
                  )}
                </li>
              ))}
            </ul>
            <p>
              <Link href="/zones-intervention" className="link-arrow">
                Toutes les zones d&apos;intervention <Icon name="arrow" />
              </Link>
            </p>
          </div>
          <DepartmentMap highlight={[commune.slug]} compact />
        </div>
      </section>

      <section className="section" aria-labelledby="faq-local">
        <div className={`container ${styles.searchGrid}`}>
          <div className="section-head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2 id="faq-local" className="h-section">
              Intervenir à {commune.name}
            </h2>
            <CertibiocideNotice variant="compact" />
          </div>
          <FaqList items={page.faq} />
        </div>
      </section>

      <QuoteSection
        title={`Un devis à ${commune.name}`}
        defaultCommune={commune.name}
        location={`form-local-${commune.slug}`}
      />

      <JsonLd data={localPageSchema(commune, path)} />
    </>
  );
}
