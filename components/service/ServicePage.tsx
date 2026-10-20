import Image from "next/image";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { QuoteSection } from "@/components/forms/QuoteSection";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CertibiocideNotice } from "@/components/ui/CertibiocideNotice";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { getService } from "@/data/services";
import { getArticle } from "@/lib/articles";
import { images } from "@/lib/images";
import { serviceSchema } from "@/lib/schema";
import { site, telHref } from "@/lib/site";
import type { Article, Service } from "@/types/content";
import styles from "./servicePage.module.css";

const BIOCIDE_SERVICES = new Set<Service["slug"]>(["desinfection", "nuisibles", "diogene", "post-mortem"]);

export function ServicePage({ service }: { service: Service }) {
  const secondary = images[service.secondaryImage];
  const related = service.related.map(getService);
  const articles = service.relatedArticles.map(getArticle).filter((a): a is Article => Boolean(a));

  return (
    <>
      <PageHero
        kicker={service.kicker}
        title={service.h1}
        lead={<p>{service.lead}</p>}
        image={service.heroImage}
        breadcrumbs={[{ name: service.name, path: service.path }]}
      >
        <TrackedLink href="#devis" event="quote_cta_click" location={`hero-${service.slug}`} className="btn">
          Demander un devis <Icon name="arrow" />
        </TrackedLink>
        <TrackedLink href={telHref} event="phone_click" location={`hero-${service.slug}`} className="btn btn-ghost">
          <Icon name="phone" /> {site.contact.phoneDisplay}
        </TrackedLink>
      </PageHero>

      {/* Périmètre de la prestation */}
      <section className="section" aria-labelledby="perimetre">
        <div className={`container ${styles.scopeGrid}`}>
          <div className={styles.scopeText}>
            <p className="eyebrow">La prestation</p>
            <h2 id="perimetre" className="h-section">
              Ce que comprend l&apos;intervention
            </h2>
            <ul role="list" className={styles.scopeList}>
              {service.scope.map((item) => (
                <li key={item}>
                  <Icon name="check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className={styles.scopeNote}>
              Le contenu exact de chaque intervention est précisé dans le devis, après échange sur votre situation.
            </p>
            {BIOCIDE_SERVICES.has(service.slug) ? <CertibiocideNotice variant="compact" /> : null}
          </div>
          <ImageReveal className={styles.scopeMedia}>
            <Image
              src={secondary.src}
              alt={secondary.alt}
              width={secondary.width}
              height={secondary.height}
              sizes="(min-width: 1000px) 40vw, 92vw"
              className={styles.scopeImg}
            />
            <span className={styles.illus}>Photo d&apos;illustration</span>
          </ImageReveal>
        </div>
      </section>

      {/* Contenu éditorial */}
      <section className={`section on-paper ${styles.editorial}`} aria-label="En détail">
        <div className="container">
          {service.sections.map((section, i) => (
            <Reveal key={section.title} className={styles.block}>
              <div className={styles.blockHead}>
                <span className={styles.blockNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className={styles.blockTitle}>{section.title}</h2>
              </div>
              <div className={styles.blockBody}>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
                {section.bullets ? (
                  <ul className={styles.bullets}>
                    {section.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Reveal>
          ))}

          {service.precautions ? (
            <Reveal className={styles.precautions}>
              <h2 className={styles.precautionsTitle}>{service.precautions.title}</h2>
              <ul role="list">
                {service.precautions.items.map((item) => (
                  <li key={item}>
                    <Icon name="shield" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* Déroulement */}
      <section className="section on-dark" aria-labelledby="deroulement">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Déroulement</p>
            <h2 id="deroulement" className="h-section">
              Comment se passe l&apos;intervention
            </h2>
          </div>
          <ProcessSteps steps={service.process} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="faq">
        <div className={`container ${styles.faqGrid}`}>
          <div className="section-head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2 id="faq" className="h-section">
              Vos questions sur ce service
            </h2>
          </div>
          <FaqList items={service.faq} />
        </div>
      </section>

      <CtaBand title={service.ctaTitle} text={service.ctaText} location={`band-${service.slug}`} quoteHref="#devis" />

      {/* Maillage */}
      <section className="section" aria-labelledby="autres-prestations">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Aller plus loin</p>
            <h2 id="autres-prestations" className="h-section">
              Prestations complémentaires
            </h2>
          </div>
          <div className={styles.cards}>
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>

          {articles.length > 0 ? (
            <>
              <h2 className={`h-sub ${styles.articlesTitle}`}>Nos guides sur le sujet</h2>
              <div className={styles.cards}>
                {articles.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>

      <QuoteSection defaultService={service.slug} location={`form-${service.slug}`} />

      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
