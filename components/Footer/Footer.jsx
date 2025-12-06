import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.container}>
        <div className={styles.title}>
          <Image 
            src="/logo2.png"
            alt="Logo"
            width={220}
            height={220}
          />          
          <p className={styles.p}> Services de Nettoyage professionnel</p>          
        </div>
        <ul className={styles.ul}>
          <li className={styles.li}> Désinfection</li>            
          <li className={styles.li}> Nettoyage intérieur </li>
          <li className={styles.li}> Syndrôme de digène</li>
          <li className={styles.li}> Nettoyage de bureaux</li>            
          <li className={styles.li}> Traitement des nuisibles</li>
          <li className={styles.li}> Nettoyage Post-Mortem</li>
        </ul>
      </section>
      <Link 
        className={styles.credits} 
        href="https://code-v.fr" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Réalisé par Codev
      </Link>

      <p className={styles.credits}> Nettoyage Perpignan - Tous droits réservés.</p>     
    </footer>
  )
}