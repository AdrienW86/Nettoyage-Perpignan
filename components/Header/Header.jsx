"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image 
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
          />
        </Link>
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
          <Link href="/" onClick={closeMenu}>Accueil</Link>
          <Link href="/#services" onClick={closeMenu}>Services</Link>
          <Link href="/particuliers" onClick={closeMenu}>Nettoyage pour particuliers</Link>
          <Link href="/bureaux" onClick={closeMenu}>Nettoyage de bureaux</Link>
          <Link href="/desinfection" onClick={closeMenu}>Désinfection</Link>
          <Link href="/nuisibles" onClick={closeMenu}>Traitement des nuisibles</Link>
          <Link href="/diogene" onClick={closeMenu}>Syndrôme de Diogène</Link>
          <Link href="/post-mortem" onClick={closeMenu}>Nettoyage Post-Mortem</Link>
          <Link href="/a-propos" onClick={closeMenu}>À propos</Link>
          <Link href="/contact" onClick={closeMenu}>Contact</Link>
        </motion.nav>
      )}
    </header>
  );
}