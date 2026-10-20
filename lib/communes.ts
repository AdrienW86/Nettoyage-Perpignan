import raw from "@/data/communes-66.json";
import { communeStatus, type ServiceStatus } from "@/data/commune-status";
import { localPages } from "@/data/local-pages";
import { site } from "@/lib/site";
import type { LocalPage } from "@/types/content";

export type Commune = {
  name: string;
  inseeCode: string;
  postalCodes: string[];
  slug: string;
  population: number | null;
  lat: number | null;
  lon: number | null;
  areaHa: number | null;
  epci: { code: string; name: string } | null;
};

export type CommuneWithStatus = Commune & {
  service: ServiceStatus;
  /** Distance à vol d'oiseau depuis le siège (Pia), en km. */
  distanceKm: number | null;
  hasPage: boolean;
};

type CommuneFile = { source: string; importedAt: string; count: number; communes: Commune[] };
const file = raw as CommuneFile;

export const communesMeta = { source: file.source, importedAt: file.importedAt, count: file.count };

/** Distance orthodromique (formule de haversine), arrondie au km. */
export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(a)));
}

const localPageBySlug = new Map(localPages.map((p) => [p.slug, p]));

const communes: CommuneWithStatus[] = file.communes.map((c) => {
  const service = communeStatus[c.inseeCode]?.service ?? "to-confirm";
  return {
    ...c,
    service,
    distanceKm: c.lat !== null && c.lon !== null ? haversineKm(site.base.lat, site.base.lon, c.lat, c.lon) : null,
    hasPage: service === "declared" && localPageBySlug.has(c.slug),
  };
});

const bySlug = new Map(communes.map((c) => [c.slug, c]));

export function getAllCommunes(): CommuneWithStatus[] {
  return communes;
}

export function getCommune(slug: string): CommuneWithStatus | undefined {
  return bySlug.get(slug);
}

export function getPublishedLocalPages(): { commune: CommuneWithStatus; page: LocalPage }[] {
  return communes
    .filter((c) => c.hasPage)
    .map((c) => ({ commune: c, page: localPageBySlug.get(c.slug) as LocalPage }))
    .sort((a, b) => (b.commune.population ?? 0) - (a.commune.population ?? 0));
}

export function getLocalPage(slug: string): { commune: CommuneWithStatus; page: LocalPage } | undefined {
  const commune = bySlug.get(slug);
  const page = localPageBySlug.get(slug);
  if (!commune || !page || !commune.hasPage) return undefined;
  return { commune, page };
}

/** Communes les plus proches (centre à centre), hors commune de référence. */
export function getNearbyCommunes(commune: Commune, count = 8): CommuneWithStatus[] {
  if (commune.lat === null || commune.lon === null) return [];
  const { lat, lon } = commune;
  return communes
    .filter((c) => c.inseeCode !== commune.inseeCode && c.lat !== null && c.lon !== null)
    .map((c) => ({ c, d: haversineKm(lat, lon, c.lat as number, c.lon as number) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, count)
    .map(({ c }) => c);
}

/** Recherche tolérante aux accents, à la casse et aux tirets ; accepte un code postal. */
export function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function formatPopulation(n: number | null): string | null {
  return n === null ? null : new Intl.NumberFormat("fr-FR").format(n);
}
