import "server-only";
import { serviceFamilies } from "@/data/services";
import type { NavGroup } from "@/lib/navigation";

export const serviceNav: NavGroup[] = [
  {
    title: "Entretien",
    links: serviceFamilies.entretien.map((s) => ({ label: s.name, href: s.path, description: s.cardText })),
  },
  {
    title: "Interventions spécialisées",
    links: serviceFamilies.specialise.map((s) => ({ label: s.name, href: s.path, description: s.cardText })),
  },
];
