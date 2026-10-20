import Image from "next/image";
import Link from "next/link";
import { QuoteSection } from "@/components/forms/QuoteSection";
import { Hero } from "@/components/home/Hero";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CertibiocideNotice } from "@/components/ui/CertibiocideNotice";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { DepartmentMap } from "@/components/zones/DepartmentMap";
import { homeFaq, homeProcess } from "@/data/home";
import { getService, serviceFamilies } from "@/data/services";
import { getLatestArticles } from "@/lib/articles";
import { getPublishedLocalPages } from "@/lib/communes";
import { images } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import styles from "./home.module.css";

export const metadata = buildMetadata({
  title: "Nettoyage Perpignan — entreprise de nettoyage et désinfection (66)",
  description:
    "Entreprise de nettoyage à Perpignan : logements, bureaux, désinfection, nuisibles, syndrome de Diogène et nettoyage après décès. Devis gratuit dans les Pyrénées-Orientales.",
  path: "/",
  absoluteTitle: true,
});

const delicate = ["diogene", "post-mortem", "desinfection"] as const;

export default function HomePage() {
  const local = getPublishedLocalPages();
  const latest = getLatestArticles(3);
  const delicateImg = images.logementEncombre;

  return (
    <>
      <Hero />

      {/* Prestations */}
      <section className="section" aria-labelledby="prestations">
        <div className="container">
          <div className={styles.headSplit}>
            <div className="section-head">
              <p className="eyebrow">Nos prestations</p>
              <h2 id="prestations" className="h-section">
                Du ménage régulier aux <span className="italic-accent">interventions spécialisées</span>
              </h2>
            </div>
            <p className="lead">
              Six prestations, une même exigence : comprendre la situation, choisir la bonne méthode et vous rendre un
              lieu sain.
            </p>
          </div>

          <h3 className={styles.familyTitle}>Entretien</h3>
          <div className={`${styles.cards} ${styles.cardsTwo}`}>
            {serviceFamilies.entretien.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <ServiceCard service={s} index={i} headingLevel={3} />
              </Reveal>
            ))}
          </div>

          <h3 className={styles.familyTitle}>Interventions spécialisées</h3>
          <div className={`${styles.cards} ${styles.cardsFour}`}>
            {serviceFamilies.specialise.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <ServiceCard service={s} index={i + serviceFamilies.entretien.length} headingLevel={3} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Spécialisation : situations complexes */}
      <section className={`section on-petrol ${styles.delicate}`} aria-labelledby="delicat">
        <div className={`container ${styles.delicateGrid}`}>
          <ImageReveal className={styles.delicateMedia}>
            <Image
              src={delicateImg.src}
              alt={delicateImg.alt}
              width={delicateImg.width}
              height={delicateImg.height}
              sizes="(min-width: 1000px) 40vw, 92vw"
              className={styles.delicateImg}
            />
            <span className={styles.illus}>Photo d&apos;illustration</span>
          </ImageReveal>
          <div className={styles.delicateText}>
            <p className="eyebrow">Notre spécialité</p>
            <h2 id="delicat" className="h-section">
              Là où un ménage ne suffit plus, <span className="italic-accent">il faut une méthode.</span>
            </h2>
            <p className="lead">
              Logement très encombré, décès découvert tardivement, lieux contaminés : ces interventions demandent du
              tact autant que de la technique. Nous les menons avec discrétion, sans jugement, en protégeant ce qui
              compte pour vous.
            </p>
            <ul role="list" className={styles.delicateList}>
              {delicate.map((slug) => {
                const s = getService(slug);
                return (
                  <li key={slug}>
                    <Link href={s.path} className={styles.delicateLink}>
                      <span className={styles.delicateName}>{s.name}</span>
                      <span className={styles.delicateDesc}>{s.cardText}</span>
                      <Icon name="arrow" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Secteur géographique */}
      <section className={`section on-dark ${styles.sector}`} aria-labelledby="secteur">
        <div className={`container ${styles.sectorGrid}`}>
          <div className={styles.sectorText}>
            <p className="eyebrow">Notre secteur</p>
            <h2 id="secteur" className="h-section">
              Perpignan, la plaine du Roussillon <span className="italic-accent">et au-delà</span>
            </h2>
            <p className="lead">
              Installés à {site.base.locality}, à quelques minutes de Perpignan, nous intervenons dans toute
              l&apos;agglomération et, selon la prestation, dans l&apos;ensemble des Pyrénées-Orientales.
            </p>
            <ul role="list" className={styles.chips}>
              {local.map(({ commune }) => (
                <li key={commune.slug}>
                  <Link href={`/zones-intervention/${commune.slug}`}>{commune.name}</Link>
                </li>
              ))}
            </ul>
            <p>
              <Link href="/zones-intervention" className="link-arrow">
                Rechercher votre commune <Icon name="arrow" />
              </Link>
            </p>
          </div>
          <Reveal>
            <DepartmentMap highlight={["perpignan", ...local.map((l) => l.commune.slug)]} />
          </Reveal>
        </div>
      </section>

      {/* Déroulement */}
      <section className="section" aria-labelledby="methode">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Notre méthode</p>
            <h2 id="methode" className="h-section">
              Une intervention, quatre étapes claires
            </h2>
          </div>
          <ProcessSteps steps={homeProcess} />
        </div>
      </section>

      {/* Réassurance : faits vérifiables uniquement */}
      <section className={`section-tight on-paper ${styles.facts}`} aria-labelledby="engagements">
        <div className="container">
          <h2 id="engagements" className="sr-only">
            Ce que vous pouvez vérifier
          </h2>
          <div className={styles.factsGrid}>
            <Reveal className={styles.fact}>
              <span className={styles.factBig}>2018</span>
              <span className={styles.factText}>
                Entreprise immatriculée depuis le 23 janvier 2018 — SIREN {site.legal.siren}
              </span>
            </Reveal>
            <Reveal className={styles.fact} delay={0.08}>
              <span className={styles.factBig}>{site.base.locality}</span>
              <span className={styles.factText}>Siège dans les Pyrénées-Orientales, aux portes de Perpignan</span>
            </Reveal>
            <Reveal className={styles.fact} delay={0.16}>
              <span className={styles.factBig}>Gratuit</span>
              <span className={styles.factText}>Devis détaillé et sans engagement, après visite si nécessaire</span>
            </Reveal>
            <Reveal className={styles.fact} delay={0.24}>
              <span className={styles.factBig}>6</span>
              <span className={styles.factText}>Prestations, de l&apos;entretien courant aux situations délicates</span>
            </Reveal>
          </div>
          <div className={styles.certi}>
            <CertibiocideNotice />
          </div>
        </div>
      </section>

      {/* Conseils */}
      <section className="section" aria-labelledby="conseils">
        <div className="container">
          <div className={styles.headSplit}>
            <div className="section-head">
              <p className="eyebrow">Conseils</p>
              <h2 id="conseils" className="h-section">
                Comprendre avant d&apos;agir
              </h2>
            </div>
            <Link href="/conseils" className="link-arrow">
              Tous nos guides <Icon name="arrow" />
            </Link>
          </div>
          <div className={styles.cards}>
            {latest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section on-paper" aria-labelledby="faq">
        <div className={`container ${styles.faqGrid}`}>
          <div className="section-head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2 id="faq" className="h-section">
              Vos questions, nos réponses
            </h2>
            <p className="lead">Une autre question ? Le plus simple est de nous appeler.</p>
          </div>
          <FaqList items={homeFaq} />
        </div>
      </section>

      <QuoteSection location="form-home" />
    </>
  );
}
