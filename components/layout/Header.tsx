"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Icon } from "@/components/ui/Icon";
import { mainNav, type NavGroup } from "@/lib/navigation";
import { site, telHref } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import styles from "./header.module.css";

export function Header({ serviceNav }: { serviceNav: NavGroup[] }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLLIElement>(null);
  const panelId = useId();
  const mobileId = useId();

  const closeAll = useCallback(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, []);

  // Fermer les menus à chaque navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    closeAll();
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        menuButton.current?.focus();
      }
      setServicesOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [mobileOpen]);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const servicesActive = serviceNav.some((g) => g.links.some((l) => isActive(l.href)));

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand}>
          <Wordmark />
          <span className="sr-only"> — accueil</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Navigation principale">
          <ul role="list" className={styles.navList}>
            <li ref={servicesRef} className={styles.hasPanel}>
              <button
                type="button"
                className={`${styles.navLink} ${servicesActive ? styles.active : ""}`}
                aria-expanded={servicesOpen}
                aria-controls={panelId}
                onClick={() => setServicesOpen((v) => !v)}
              >
                Prestations
                <Icon name="chevron" className={`${styles.chevron} ${servicesOpen ? styles.chevronOpen : ""}`} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <m.div
                    id={panelId}
                    className={styles.panel}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {serviceNav.map((group) => (
                      <div key={group.title} className={styles.panelGroup}>
                        <p className={styles.panelTitle}>{group.title}</p>
                        <ul role="list">
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className={styles.panelLink}
                                aria-current={isActive(link.href) ? "page" : undefined}
                              >
                                <span className={styles.panelLabel}>{link.label}</span>
                                <span className={styles.panelDesc}>{link.description}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </m.div>
                )}
              </AnimatePresence>
            </li>
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${isActive(link.href) ? styles.active : ""}`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <TrackedLink href={telHref} event="phone_click" location="header" className={styles.phone}>
            <Icon name="phone" />
            <span>{site.contact.phoneDisplay}</span>
          </TrackedLink>
          <TrackedLink href="/contact" event="quote_cta_click" location="header" className={`btn ${styles.quote}`}>
            Devis gratuit
          </TrackedLink>
          <button
            ref={menuButton}
            type="button"
            className={styles.burger}
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">{mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}</span>
            <Icon name={mobileOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <m.nav
            id={mobileId}
            aria-label="Navigation mobile"
            className={styles.mobile}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <m.div
              className={styles.mobileInner}
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
            >
              {serviceNav.map((group) => (
                <div key={group.title} className={styles.mobileGroup}>
                  <p className={styles.panelTitle}>{group.title}</p>
                  <ul role="list">
                    {group.links.map((link) => (
                      <m.li key={link.href} variants={item}>
                        <Link href={link.href} className={styles.mobileLink} onClick={closeAll}>
                          {link.label}
                        </Link>
                      </m.li>
                    ))}
                  </ul>
                </div>
              ))}
              <ul role="list" className={styles.mobileGroup}>
                {mainNav.map((link) => (
                  <m.li key={link.href} variants={item}>
                    <Link href={link.href} className={styles.mobileLinkSmall} onClick={closeAll}>
                      {link.label}
                    </Link>
                  </m.li>
                ))}
              </ul>
              <m.div variants={item} className={styles.mobileCtas}>
                <TrackedLink href="/contact" event="quote_cta_click" location="mobile-menu" className="btn" onClick={closeAll}>
                  Demander un devis
                </TrackedLink>
                <TrackedLink href={telHref} event="phone_click" location="mobile-menu" className="btn btn-ghost">
                  <Icon name="phone" /> {site.contact.phoneDisplay}
                </TrackedLink>
              </m.div>
            </m.div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};
