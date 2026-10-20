import { getAllCommunes } from "@/lib/communes";
import { site } from "@/lib/site";
import styles from "./departmentMap.module.css";

const WIDTH = 800;
const PAD = 24;

/**
 * Carte des 226 communes des Pyrénées-Orientales, dessinée en SVG à partir
 * des centroïdes officiels (projection équirectangulaire locale). Rendu
 * serveur, aucun JavaScript ni fond de carte externe.
 */
export function DepartmentMap({ highlight = [] as string[], compact = false }: { highlight?: string[]; compact?: boolean }) {
  const communes = getAllCommunes().filter((c) => c.lat !== null && c.lon !== null);
  const lats = communes.map((c) => c.lat as number);
  const lons = communes.map((c) => c.lon as number);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);
  const k = Math.cos((((minLat + maxLat) / 2) * Math.PI) / 180);
  const scale = (WIDTH - 2 * PAD) / ((maxLon - minLon) * k);
  const height = Math.round((maxLat - minLat) * scale + 2 * PAD);

  const project = (lat: number, lon: number) => ({
    x: PAD + (lon - minLon) * k * scale,
    y: PAD + (maxLat - lat) * scale,
  });

  const base = project(site.base.lat, site.base.lon);
  const labelled = new Set(highlight);
  const served = communes.filter((c) => c.service === "declared");

  return (
    <figure className={`${styles.figure} ${compact ? styles.compact : ""}`}>
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        className={styles.svg}
        role="img"
        aria-labelledby="carte-titre"
      >
        <title id="carte-titre">{`Carte des ${communes.length} communes des Pyrénées-Orientales. Les communes mises en avant sont celles où nous intervenons régulièrement : ${served.map((c) => c.name).join(", ")}.`}</title>
        <defs>
          <radialGradient id="halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4b483" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#d4b483" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={base.x} cy={base.y} r={110} fill="url(#halo)" />
        <circle cx={base.x} cy={base.y} r={70} className={styles.ring} />
        <circle cx={base.x} cy={base.y} r={140} className={styles.ring} />

        {communes.map((c) => {
          const { x, y } = project(c.lat as number, c.lon as number);
          const r = Math.max(3, Math.min(11, Math.sqrt(c.population ?? 0) / 11));
          const isServed = c.service === "declared";
          return (
            <circle key={c.inseeCode} cx={x} cy={y} r={isServed ? r + 1.5 : r} className={isServed ? styles.served : styles.dot}>
              <title>{c.name}</title>
            </circle>
          );
        })}

        {placeLabels(
          served.filter((c) => labelled.has(c.slug)).map((c) => ({ name: c.name, ...project(c.lat as number, c.lon as number) })),
          WIDTH,
        ).map((l) => (
          <g key={l.name}>
            {l.leader ? <line x1={l.ax} y1={l.ay} x2={l.lx} y2={l.ly - 5} className={styles.leader} /> : null}
            <text x={l.x} y={l.y} textAnchor={l.anchor} className={styles.label}>
              {l.name}
            </text>
          </g>
        ))}

        <g transform={`translate(${base.x} ${base.y})`}>
          <circle r="6" className={styles.base} />
          <circle r="11" className={styles.baseRing} />
        </g>
      </svg>
      <figcaption className={styles.caption}>
        <span className={styles.legendBase} aria-hidden="true" /> Siège à {site.base.locality}
        <span className={styles.legendServed} aria-hidden="true" /> Communes desservies régulièrement
        <span className={styles.legendDot} aria-hidden="true" /> Autres communes du département
      </figcaption>
    </figure>
  );
}

type Placed = {
  name: string;
  x: number;
  y: number;
  anchor: "start" | "end";
  leader: boolean;
  ax: number;
  ay: number;
  lx: number;
  ly: number;
};

const CHAR_W = 8.4;
const LINE_H = 20;

/**
 * Placement glouton des étiquettes : on essaie plusieurs positions autour du
 * point et on garde la première qui ne chevauche aucune étiquette déjà posée.
 * Si toutes échouent, l'étiquette est décalée verticalement avec un trait de rappel.
 */
function placeLabels(points: { name: string; x: number; y: number }[], width: number): Placed[] {
  const boxes: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const overlaps = (b: { x1: number; y1: number; x2: number; y2: number }) =>
    boxes.some((o) => b.x1 < o.x2 && b.x2 > o.x1 && b.y1 < o.y2 && b.y2 > o.y1);

  return [...points]
    .sort((a, b) => a.y - b.y)
    .map((p) => {
      const w = p.name.length * CHAR_W;
      const preferRight = p.x < width * 0.7;
      const offsets = [0, -16, 16, -32, 32];
      for (const side of preferRight ? ["start", "end"] : ["end", "start"]) {
        for (const dy of offsets) {
          const anchor = side as "start" | "end";
          const x = anchor === "start" ? p.x + 12 : p.x - 12;
          const y = p.y + 5 + dy;
          const box = anchor === "start" ? { x1: x, y1: y - 14, x2: x + w, y2: y + 4 } : { x1: x - w, y1: y - 14, x2: x, y2: y + 4 };
          if (box.x1 < 0 || box.x2 > width) continue;
          if (!overlaps(box)) {
            boxes.push(box);
            return { name: p.name, x, y, anchor, leader: dy !== 0, ax: p.x, ay: p.y, lx: x + (anchor === "start" ? -4 : 4), ly: y };
          }
        }
      }
      // Repli : empiler sous les étiquettes existantes.
      let y = p.y + 5;
      const x = p.x + 12;
      while (overlaps({ x1: x, y1: y - 14, x2: x + w, y2: y + 4 })) y += LINE_H;
      boxes.push({ x1: x, y1: y - 14, x2: x + w, y2: y + 4 });
      return { name: p.name, x, y, anchor: "start" as const, leader: true, ax: p.x, ay: p.y, lx: x - 4, ly: y };
    });
}
