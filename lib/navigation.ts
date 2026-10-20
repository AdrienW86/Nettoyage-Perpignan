/** Liens de navigation sans dépendance aux contenus (importable côté client). */

export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { title: string; links: NavLink[] };

export const mainNav: NavLink[] = [
  { label: "Zones d'intervention", href: "/zones-intervention" },
  { label: "Conseils", href: "/conseils" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];
