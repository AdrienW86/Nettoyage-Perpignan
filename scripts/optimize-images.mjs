// Convertit les visuels sources de /public en WebP optimisés dans
// /public/images, avec des noms de fichiers descriptifs.
// next/image génère ensuite le srcset (AVIF/WebP) à partir de ces fichiers.
//
// Usage : npm run images:optimize

import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

const SRC = "public";
const OUT = path.join("public", "images");

/** [source, destination, largeur max] */
const IMAGES = [
  ["nettoyage4.png", "hero-produits-nettoyage.webp", 2400],
  ["nettoyage2.png", "particuliers-cuisine.webp", 1600],
  ["nettoyage3.png", "particuliers-vitre.webp", 1600],
  ["nettoyage.png", "particuliers-sejour.webp", 1000],
  ["nettoyage5.png", "bureaux-open-space.webp", 1600],
  ["bureaux2.png", "bureaux-couloir.webp", 1600],
  ["bureaux.png", "bureaux-monobrosse.webp", 1600],
  ["bureaux3.png", "bureaux-poste-de-travail.webp", 1600],
  ["desinfection.png", "desinfection-pulverisation.webp", 1600],
  ["desinfection1.png", "desinfection-essuyage.webp", 1600],
  ["desinfection2.png", "intervention-logement-encombre.webp", 1600],
  ["desinfection3.png", "desinfection-bureaux.webp", 1600],
  ["desinsectisation.png", "nuisibles-traitement-sejour.webp", 1600],
  ["nuisibles.png", "nuisibles-inspection-literie.webp", 1600],
  ["nuisibles2.png", "nuisibles-traitement-cuisine.webp", 1600],
  ["nuisibles5.png", "nuisibles-traitement-plinthes.webp", 1600],
  ["post-mortem2.png", "apres-deces-chambre.webp", 1600],
  ["post-mortem4.png", "apres-deces-cuisine.webp", 1600],
];

await mkdir(OUT, { recursive: true });

for (const [src, dest, width] of IMAGES) {
  const input = path.join(SRC, src);
  const output = path.join(OUT, dest);
  const info = await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(output);
  const before = (await stat(input)).size;
  console.log(
    `${dest.padEnd(40)} ${info.width}×${info.height}  ${Math.round(before / 1024)} Ko → ${Math.round(info.size / 1024)} Ko`,
  );
}

// Image Open Graph par défaut (1200×630).
await sharp(path.join(SRC, "nettoyage4.png"))
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(OUT, "og-default.jpg"));
console.log("og-default.jpg                           1200×630");
