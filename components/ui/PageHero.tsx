import Image from "next/image";
import type { ReactNode } from "react";
import { images, type ImageKey } from "@/lib/images";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import styles from "./pageHero.module.css";

type Props = {
  kicker: string;
  title: string;
  lead?: ReactNode;
  breadcrumbs: Crumb[];
  image?: ImageKey;
  children?: ReactNode;
};

/** En-tête des pages intérieures : composition éditoriale, image en arche. */
export function PageHero({ kicker, title, lead, breadcrumbs, image, children }: Props) {
  const img = image ? images[image] : null;
  return (
    <section className={`on-dark ${styles.hero} ${img ? styles.withImage : ""}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.text}>
          <Breadcrumbs items={breadcrumbs} />
          <p className="eyebrow">{kicker}</p>
          <h1 className={styles.title}>{title}</h1>
          {lead ? <div className="lead">{lead}</div> : null}
          {children ? <div className={styles.actions}>{children}</div> : null}
        </div>
        {img ? (
          <figure className={styles.figure}>
            <div className={styles.arch}>
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                priority
                fetchPriority="high"
                sizes="(min-width: 1000px) 40vw, 90vw"
                className={styles.img}
              />
            </div>
            {img.illustrative ? <figcaption className={styles.caption}>Photo d&apos;illustration</figcaption> : null}
          </figure>
        ) : null}
      </div>
    </section>
  );
}
