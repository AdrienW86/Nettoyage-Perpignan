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
          <Link href="/particuliers" className={styles.li}>Nettoyage pour particuliers</Link>
          <Link href="/bureaux" className={styles.li}>Nettoyage de bureaux</Link>
          <Link href="/desinfection" className={styles.li}>Désinfection</Link>
          <Link href="/nuisibles" className={styles.li}>Traitement des nuisibles</Link>
          <Link href="/diogene" className={styles.li}>Syndrôme de Diogène</Link>
          <Link href="/post-mortem" className={styles.li}>Nettoyage Post-Mortem</Link>
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