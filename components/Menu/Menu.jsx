import React from 'react';
import Carousel from '@/components/Carousel/Carousel';
import styles from './menu.module.css';

export default function Menu({ title, description, slides, phoneNumber, bookingLink }) {
     
  return (
    <section className={styles.service}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.actions}>
        {bookingLink && (
          <a href={bookingLink} className={styles.button} target="_blank" rel="noopener noreferrer">
            Réserver
          </a>
        )}
        {phoneNumber && (
          <a href={`tel:${phoneNumber}`} className={styles.button}>
            Appeler
          </a>
        )}
      </div>
      <Carousel items={slides} />
    </section>
  );
}
