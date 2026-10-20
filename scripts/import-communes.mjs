// Importe le référentiel officiel des communes des Pyrénées-Orientales (66)
// depuis l'API Géo (geo.api.gouv.fr, données COG de l'INSEE) et écrit
// data/communes-66.json.
//
// Usage : npm run communes:import
//
// Les statuts de desserte et de publication ne sont PAS stockés ici : ils
// vivent dans data/commune-status.ts, afin qu'un nouvel import n'écrase
// jamais une décision éditoriale.

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const API_URL =
  "https://geo.api.gouv.fr/departements/66/communes?fields=nom,code,codesPostaux,population,centre,surface,epci&format=json";
const EXPECTED_COUNT = 226;

/** Normalise un nom de commune en slug d'URL (« L'Albère » → « l-albere »). */
export function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`API Géo : HTTP ${res.status}`);
  const raw = await res.json();

  if (!Array.isArray(raw)) throw new Error("Réponse inattendue de l'API Géo");
  if (raw.length !== EXPECTED_COUNT) {
    console.warn(
      `⚠ ${raw.length} communes reçues (attendu : ${EXPECTED_COUNT}). Vérifier le millésime du COG avant de valider.`,
    );
  }

  const communes = raw
    .map((c) => ({
      name: c.nom,
      inseeCode: c.code,
      postalCodes: [...(c.codesPostaux ?? [])].sort(),
      slug: slugify(c.nom),
      population: c.population ?? null,
      // L'API renvoie [longitude, latitude].
      lat: c.centre?.coordinates?.[1] ?? null,
      lon: c.centre?.coordinates?.[0] ?? null,
      areaHa: c.surface ?? null,
      epci: c.epci ? { code: c.epci.code, name: c.epci.nom } : null,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));

  const slugs = new Set();
  for (const c of communes) {
    if (slugs.has(c.slug)) throw new Error(`Slug en double : ${c.slug}`);
    slugs.add(c.slug);
  }

  const output = {
    source: "API Géo (geo.api.gouv.fr) — Code officiel géographique de l'INSEE",
    sourceUrl: API_URL,
    importedAt: new Date().toISOString().slice(0, 10),
    count: communes.length,
    communes,
  };

  const here = path.dirname(fileURLToPath(import.meta.url));
  const target = path.join(here, "..", "data", "communes-66.json");
  await writeFile(target, JSON.stringify(output, null, 2) + "\n", "utf8");
  console.log(`✓ ${communes.length} communes écrites dans ${path.relative(process.cwd(), target)}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
