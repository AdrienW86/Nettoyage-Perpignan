import React from 'react';
import Image from 'next/image';
import styles from './sectionBanner.module.css';

export default function Banner({ title, subtitle, backgroundImage }) {
  return (
    <div className={styles.banner}>
      <Image
        src={backgroundImage}
        alt="Bannière"
        layout="fill"
        objectFit="cover"
        quality={80}
        priority
      />
      <div className={styles.overlay}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
}
