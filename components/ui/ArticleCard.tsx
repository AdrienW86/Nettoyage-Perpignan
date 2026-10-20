import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { formatDate } from "@/lib/format";
import type { Article } from "@/types/content";
import styles from "./articleCard.module.css";

export function ArticleCard({ article, headingLevel = 3 }: { article: Article; headingLevel?: 2 | 3 }) {
  const img = images[article.image];
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={img.src}
          alt=""
          width={img.width}
          height={img.height}
          sizes="(min-width: 1100px) 30vw, (min-width: 700px) 45vw, 92vw"
          className={styles.img}
        />
      </div>
      <p className={styles.meta}>
        <span>{article.category}</span>
        <span aria-hidden="true">·</span>
        <span>{article.readingMinutes} min de lecture</span>
      </p>
      <Heading className={styles.title}>
        <Link href={`/conseils/${article.slug}`} className={styles.link}>
          {article.title}
        </Link>
      </Heading>
      <p className={styles.excerpt}>{article.description}</p>
      <p className={styles.date}>
        Mis à jour le <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
      </p>
    </article>
  );
}
