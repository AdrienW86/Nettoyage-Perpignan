"use client"

import React, { useState } from 'react';
import styles from './carousel.module.css';

export default function Carousel({ items }) {
  const [current, setCurrent] = useState(0);
  const length = items.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className={styles.carousel}>
      <button className={styles.prev} onClick={prevSlide}>&#10094;</button>
      <button className={styles.next} onClick={nextSlide}>&#10095;</button>

      {items.map((item, index) => (
        <div
          key={index}
          className={`${styles.slide} ${index === current ? styles.active : ''}`}
        >
          <img src={item.image} alt={item.alt || `slide-${index}`} className={styles.image} />
        </div>
      ))}

      <div className={styles.dots}>
        {items.map((_, index) => (
          <span
            key={index}
            className={index === current ? `${styles.dot} ${styles.activeDot}` : styles.dot}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}