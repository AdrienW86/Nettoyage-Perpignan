import styles from "./wordmark.module.css";

/** Logotype typographique (le logo historique reste disponible dans /public). */
export function Wordmark() {
  return (
    <span className={styles.wordmark}>
      <span className={styles.mark} aria-hidden="true">
        <svg viewBox="0 0 40 40" width="40" height="40">
          <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M20 8c.9 6.6 3.4 9.1 10 10-6.6.9-9.1 3.4-10 10-.9-6.6-3.4-9.1-10-10 6.6-.9 9.1-3.4 10-10Z" fill="currentColor" />
        </svg>
      </span>
      <span className={styles.text}>
        <span className={styles.top}>Nettoyage</span>{" "}
        <span className={styles.bottom}>Perpignan</span>
      </span>
    </span>
  );
}
