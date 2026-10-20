import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { getService } from "@/data/services";
import { getAllArticles, getArticle, renderArticle } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { images } from "@/lib/images";
import { articleSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import styles from "../conseils.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.metaTitle,
    description: article.description,
    path: `/conseils/${article.slug}`,
    image: article.image,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { html, toc } = renderArticle(article.slug);
  const img = images[article.image];
  const services = article.relatedServices.map(getService);
  const more = getAllArticles()
    .filter((a) => a.slug !== article.slug && a.relatedServices.some((s) => article.relatedServices.includes(s)))
    .slice(0, 3);

  return (
    <article>
      <header className={`on-dark ${styles.articleHero}`}>
        <div className={`container ${styles.articleHead}`}>
          <Breadcrumbs
            items={[
              { name: "Conseils", path: "/conseils" },
              { name: article.title, path: `/conseils/${article.slug}` },
            ]}
          />
          <p className="eyebrow">{article.category}</p>
          <h1 className={styles.articleTitle}>{article.title}</h1>
          <p className="lead">{article.description}</p>
          <p className={styles.articleMeta}>
            <span>Par {site.name}</span>
            <span>
              Publié le <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            </span>
            {article.updatedAt !== article.publishedAt ? (
              <span>
                Mis à jour le <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
              </span>
            ) : null}
            <span>{article.readingMinutes} min de lecture</span>
          </p>
        </div>
      </header>

      <div className="container">
        <figure className={styles.cover}>
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            priority
            sizes="(min-width: 1240px) 1240px, 100vw"
          />
          {img.illustrative ? <figcaption className={styles.coverNote}>Photo d&apos;illustration</figcaption> : null}
        </figure>

        <div className={styles.layout}>
          {toc.length > 2 ? (
            <nav className={styles.toc} aria-label="Sommaire de l'article">
              <p className={styles.tocTitle}>Sommaire</p>
              <ol>
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : (
            <div />
          )}

          <div className={styles.body}>
            <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

            {article.sources?.length ? (
              <section className={styles.sources} aria-labelledby="sources">
                <h2 id="sources">Sources officielles</h2>
                <ul>
                  {article.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener">
                        {s.label}
                        <span className="sr-only"> (nouvel onglet)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <p className={styles.disclaimer}>
              Ce guide a une vocation d&apos;information générale. Il ne remplace ni un avis médical, ni un conseil
              juridique adapté à votre situation.
            </p>

            <div className={styles.related}>
              <p className="eyebrow">Prestations liées</p>
              <ul role="list" className={styles.relatedList}>
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={s.path}>{s.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {more.length > 0 ? (
        <section className="section on-paper" aria-labelledby="a-lire">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">À lire aussi</p>
              <h2 id="a-lire" className="h-section">
                Sur le même sujet
              </h2>
            </div>
            <div className={styles.grid}>
              {more.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand
        title="Besoin d'un professionnel ?"
        text="Décrivez votre situation : nous vous répondons et vous proposons un devis gratuit."
        location={`band-article-${article.slug}`}
      />

      <JsonLd data={articleSchema(article, article.image)} />
    </article>
  );
}
