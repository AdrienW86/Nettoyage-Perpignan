import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import type { Service } from "@/types/content";
import { Icon } from "./Icon";
import styles from "./serviceCard.module.css";

export function ServiceCard({ service, index, headingLevel = 3 }: { service: Service; index?: number; headingLevel?: 2 | 3 }) {
  const img = images[service.heroImage];
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
      <div className={styles.body}>
        {index !== undefined ? <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span> : null}
        <Heading className={styles.title}>
          <Link href={service.path} className={styles.link}>
            {service.name}
          </Link>
        </Heading>
        <p className={styles.text}>{service.cardText}</p>
        <span className={styles.more} aria-hidden="true">
          Découvrir <Icon name="arrow" />
        </span>
      </div>
    </article>
  );
}
