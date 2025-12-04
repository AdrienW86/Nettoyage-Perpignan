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

        {/* Logo */}
        <div className={styles.logo}>
          <Image 
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
          />
        </div>

        {/* Hamburger button */}
        <button className={styles.hamburger} onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop menu */}
        <nav className={styles.navDesktop}>
          <Link href="/">Accueil</Link>
          <Link href="#services">Services</Link>
          <Link href="#about">À propos</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
  <motion.nav
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.1, ease: "easeInOut" }}
    className={styles.navMobile}
  >
    <Link href="/" onClick={() => setOpen(false)}>Accueil</Link>
    <Link href="#services" onClick={() => setOpen(false)}>Services</Link>
    <Link href="#about" onClick={() => setOpen(false)}>À propos</Link>
    <Link href="#contact" onClick={() => setOpen(false)}>Contact</Link>
  </motion.nav>
)}
    </header>
  );
}
