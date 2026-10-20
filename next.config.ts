import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  // Un package-lock.json parasite existe dans le dossier utilisateur parent.
  turbopack: { root: process.cwd() },
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
  /**
   * Les URL historiques (/particuliers, /bureaux, /desinfection, /nuisibles,
   * /diogene, /post-mortem, /a-propos, /contact et pages légales) sont
   * conservées telles quelles : aucune redirection n'est nécessaire.
   * Toute future modification d'URL doit être déclarée ici en 301.
   */
  async redirects() {
    return [];
  },
};

export default nextConfig;
