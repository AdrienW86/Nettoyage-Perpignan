import Image from "next/image";
import Link from "next/link";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { CertibiocideNotice } from "@/components/ui/CertibiocideNotice";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { formatDate } from "@/lib/format";
import { images } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import styles from "./apropos.module.css";

export const metadata = buildMetadata({
  title: "À propos : notre entreprise de nettoyage à Pia, près de Perpignan",
  description:
    "Nettoyage Perpignan : une entreprise de nettoyage, de désinfection et de traitement des nuisibles installée à Pia depuis 2018. Notre approche et nos engagements.",
  path: "/a-propos",
});

const commitments = [
  {
    title: "Comprendre avant d'intervenir",
    text: "Chaque intervention commence par un échange, et une visite lorsque la situation le demande. Le devis décrit précisément ce qui sera fait.",
  },
  {
    title: "La bonne méthode, le bon produit",
    text: "Nettoyer avant de désinfecter, respecter les temps de contact, adapter les produits aux surfaces et aux occupants : la méthode prime sur la quantité de produit.",
  },
  {
    title: "Discrétion et respect",
    text: "Logement encombré, décès, infestation : ces situations touchent à l'intimité. Elles sont traitées sans jugement, et rien n'en est divulgué.",
  },
  {
    title: "Des informations vérifiables",
    text: "Notre identité légale est publique et consultable. Nous n'affichons ni faux avis, ni certification que nous ne pourrions justifier.",
  },
];

export default function AProposPage() {
  const { legal } = site;
  const img = images.desinfectionEssuyage;
  return (
    <>
      <PageHero
        kicker="À propos"
        title="Une entreprise locale, une exigence de méthode"
        lead={
          <p>
            {site.name} intervient à Perpignan et dans les Pyrénées-Orientales pour l&apos;entretien des logements et
            des locaux, la désinfection, le traitement des nuisibles et les situations les plus délicates.
          </p>
        }
        breadcrumbs={[{ name: "À propos", path: "/a-propos" }]}
        image="desinfectionPulverisation"
      />

      <section className="section" aria-labelledby="qui">
        <div className={`container ${styles.grid}`}>
          <div className={styles.text}>
            <p className="eyebrow">Qui sommes-nous</p>
            <h2 id="qui" className="h-section">
              Installés à {legal.address.locality}, aux portes de Perpignan
            </h2>
            <p>
              {site.name} est la marque sous laquelle {legal.holderName}, entrepreneur individuel, propose ses
              prestations de nettoyage et d&apos;hygiène. L&apos;entreprise est immatriculée depuis le{" "}
              {formatDate(legal.registeredOn)} et son siège se trouve à {legal.address.locality}, au nord de
              Perpignan. Elle est également connue sous son nom commercial enregistré, {legal.registeredTradeName}.
            </p>
            <p>
              Notre activité couvre l&apos;entretien courant — logements, bureaux, commerces — mais aussi des
              interventions que beaucoup d&apos;entreprises ne prennent pas en charge : logements très encombrés,
              nettoyage après décès, désinfection de lieux contaminés, traitement des nuisibles.
            </p>
            <p>
              {site.name} fait partie du groupe{" "}
              <a href={site.group.url} target="_blank" rel="noopener">
                {site.group.name}
              </a>
              , qui propose également des services pour l&apos;habitat.
            </p>
          </div>
          <ImageReveal className={styles.media}>
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(min-width: 1000px) 40vw, 92vw"
              className={styles.img}
            />
            <span className={styles.illus}>Photo d&apos;illustration</span>
          </ImageReveal>
        </div>
      </section>

      <section className="section on-dark" aria-labelledby="engagements">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Nos engagements</p>
            <h2 id="engagements" className="h-section">
              Ce qui guide chaque intervention
            </h2>
          </div>
          <ol role="list" className={styles.commitments}>
            {commitments.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.06} className={styles.commitment}>
                <span className={styles.num} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.cTitle}>{c.title}</h3>
                <p>{c.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="identite">
        <div className={`container ${styles.grid}`}>
          <div className={styles.text}>
            <p className="eyebrow">Transparence</p>
            <h2 id="identite" className="h-section">
              Notre identité, en clair
            </h2>
            <p>
              Ces informations sont issues du registre national des entreprises et peuvent être vérifiées sur
              l&apos;
              <a
                href={`https://annuaire-entreprises.data.gouv.fr/entreprise/${legal.siren.replace(/\s/g, "")}`}
                target="_blank"
                rel="noopener"
              >
                Annuaire des entreprises
              </a>
              .
            </p>
            <CertibiocideNotice />
          </div>
          <dl className={styles.identity}>
            <div>
              <dt>Entreprise</dt>
              <dd>{legal.legalDesignation}</dd>
            </div>
            <div>
              <dt>Forme</dt>
              <dd>{legal.legalForm}</dd>
            </div>
            <div>
              <dt>SIREN</dt>
              <dd>{legal.siren}</dd>
            </div>
            <div>
              <dt>Siège</dt>
              <dd>
                {legal.address.postalCode} {legal.address.locality}
              </dd>
            </div>
            <div>
              <dt>Immatriculation</dt>
              <dd>{formatDate(legal.registeredOn)}</dd>
            </div>
            <div>
              <dt>Mentions complètes</dt>
              <dd>
                <Link href="/mentions-legales">Mentions légales</Link>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <CtaBand
        title="Parlons de votre projet"
        text="Un logement, des bureaux, une situation délicate : décrivez-nous votre besoin, le devis est gratuit."
        location="band-apropos"
      />
    </>
  );
}
