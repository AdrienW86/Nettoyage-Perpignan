import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { getAllCommunes } from "@/lib/communes";
import { businessSchema, websiteSchema } from "@/lib/schema";
import { serviceNav } from "@/lib/service-nav";
import { site } from "@/lib/site";
import "./globals.css";

// Une seule graisse (400), romain et italique : les titres n'en utilisent pas d'autre.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — nettoyage professionnel dans les Pyrénées-Orientales`, template: `%s | ${site.name}` },
  description: site.tagline,
  applicationName: site.name,
  formatDetection: { telephone: false },
  icons: { icon: "/favicon.ico", apple: "/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#0a1726",
  width: "device-width",
  initialScale: 1,
};

const servedCommunes = getAllCommunes().filter((c) => c.service === "declared");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${manrope.variable}`}>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <MotionProvider>
          <Header serviceNav={serviceNav} />
          <main id="contenu" tabIndex={-1}>
            {children}
          </main>
        </MotionProvider>
        <Footer serviceNav={serviceNav} />
        <MobileCallBar />
        <JsonLd data={[businessSchema(servedCommunes), websiteSchema()]} />
      </body>
    </html>
  );
}
