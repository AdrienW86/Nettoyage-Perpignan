"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image 
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
          />
        </div>
        <button className={styles.hamburger} onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
        <nav className={styles.navDesktop}>
          <Link href="/">Accueil</Link>
          <Link href="/particuliers">Particuliers</Link>
          <Link href="/bureaux">Bureaux</Link>
          <Link href="/desinfection">Désinfection</Link>
          <Link href="/nuisibles">Nuisibles</Link>
          <Link href="/diogene">Diogène</Link>
          <Link href="/post-mortem">Post-Mortem</Link>
          <Link href="#about">À propos</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      {open && (
        <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className={styles.navMobile}
        >
          <Link href="/">Accueil</Link>
          <Link href="/#services">Services</Link>
          <Link href="/particuliers">Nettoyage pour particuliers</Link>
          <Link href="/bureaux">Nettoyage de bureaux</Link>
          <Link href="/desinfection">Désinfection</Link>
          <Link href="/nuisibles">Traitement des nuisibles</Link>
          <Link href="/diogene">Syndrôme de Diogène</Link>
          <Link href="/post-mortem">Nettoyage Post-Mortem</Link>
          <Link href="#about">À propos</Link>
          <Link href="/contact">Contact</Link>
        </motion.nav>
      )}
    </header>
  );
}
