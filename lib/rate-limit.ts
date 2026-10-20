/**
 * Limitation de débit des demandes de devis.
 *
 * - Si UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN sont définies, le
 *   compteur est stocké dans Redis (Upstash, API REST) : il est persistant et
 *   partagé entre toutes les instances serverless.
 * - Sinon, un compteur en mémoire est utilisé. Il protège une instance
 *   unique (développement, serveur Node classique) mais n'est PAS persistant
 *   sur une plateforme serverless : la variante Redis est recommandée en
 *   production.
 *
 * L'identifiant (adresse IP) est haché avant stockage.
 */

export type RateLimitResult = { allowed: boolean; remaining: number; resetInSeconds: number };

export type RateLimiter = {
  readonly kind: "redis" | "memory";
  hit(key: string): Promise<RateLimitResult>;
};

export const RATE_LIMIT = { max: 5, windowSeconds: 60 * 60 } as const;

export function createMemoryLimiter(max: number, windowSeconds: number, now: () => number = Date.now): RateLimiter {
  const buckets = new Map<string, { count: number; resetAt: number }>();
  return {
    kind: "memory",
    async hit(key) {
      const t = now();
      // Purge opportuniste pour éviter une croissance illimitée.
      if (buckets.size > 5000) {
        for (const [k, b] of buckets) if (b.resetAt <= t) buckets.delete(k);
      }
      let bucket = buckets.get(key);
      if (!bucket || bucket.resetAt <= t) {
        bucket = { count: 0, resetAt: t + windowSeconds * 1000 };
        buckets.set(key, bucket);
      }
      bucket.count += 1;
      return {
        allowed: bucket.count <= max,
        remaining: Math.max(0, max - bucket.count),
        resetInSeconds: Math.ceil((bucket.resetAt - t) / 1000),
      };
    },
  };
}

export function createRedisLimiter(
  url: string,
  token: string,
  max: number,
  windowSeconds: number,
  fetchImpl: typeof fetch = fetch,
): RateLimiter {
  return {
    kind: "redis",
    async hit(key) {
      const redisKey = `np:quote:${key}`;
      const res = await fetchImpl(`${url.replace(/\/$/, "")}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify([
          ["INCR", redisKey],
          ["EXPIRE", redisKey, String(windowSeconds), "NX"],
          ["TTL", redisKey],
        ]),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Rate limiter Redis : HTTP ${res.status}`);
      const out = (await res.json()) as { result: number }[];
      const count = Number(out[0]?.result ?? 0);
      const ttl = Number(out[2]?.result ?? windowSeconds);
      return {
        allowed: count <= max,
        remaining: Math.max(0, max - count),
        resetInSeconds: ttl > 0 ? ttl : windowSeconds,
      };
    },
  };
}

let singleton: RateLimiter | undefined;

export function getRateLimiter(): RateLimiter {
  if (singleton) return singleton;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  singleton =
    url && token
      ? createRedisLimiter(url, token, RATE_LIMIT.max, RATE_LIMIT.windowSeconds)
      : createMemoryLimiter(RATE_LIMIT.max, RATE_LIMIT.windowSeconds);
  return singleton;
}

export async function hashIdentifier(value: string): Promise<string> {
  const salt = process.env.RATE_LIMIT_SALT ?? "nettoyage-perpignan";
  const data = new TextEncoder().encode(`${salt}:${value}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest).slice(0, 16), (b) => b.toString(16).padStart(2, "0")).join("");
}
