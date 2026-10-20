import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const LEGACY_URLS = [
  "/",
  "/particuliers",
  "/bureaux",
  "/desinfection",
  "/nuisibles",
  "/diogene",
  "/post-mortem",
  "/a-propos",
  "/contact",
  "/mentions-legales",
  "/confidentialite",
  "/conditions-generales",
];

const KEY_PAGES = [
  ...LEGACY_URLS,
  "/zones-intervention",
  "/zones-intervention/canet-en-roussillon",
  "/conseils",
  "/conseils/syndrome-de-diogene-organiser-nettoyage",
];

test.describe("URL historiques et SEO", () => {
  for (const url of LEGACY_URLS) {
    test(`${url} répond 200 avec un H1 unique et une canonique`, async ({ page }) => {
      const res = await page.goto(url);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toBe(`https://nettoyage-perpignan.fr${url === "/" ? "" : url}`);
      expect(await page.title()).not.toBe("");
    });
  }

  test("une URL inconnue renvoie une vraie 404", async ({ page }) => {
    const res = await page.goto("/page-qui-n-existe-pas");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("introuvable");
  });

  test("une commune sans page dédiée renvoie 404", async ({ page }) => {
    const res = await page.goto("/zones-intervention/thuir");
    expect(res?.status()).toBe(404);
  });

  test("sitemap.xml et robots.txt sont servis", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    expect(xml).toContain("https://nettoyage-perpignan.fr/diogene");
    expect(xml).toContain("https://nettoyage-perpignan.fr/conseils/certibiocide-comprendre");
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Disallow: /api/");
  });

  test("les données structurées sont du JSON valide", async ({ page }) => {
    await page.goto("/diogene");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.length).toBeGreaterThanOrEqual(3);
    const types = blocks.flatMap((b) => {
      const data = JSON.parse(b) as { "@type": string } | { "@type": string }[];
      return (Array.isArray(data) ? data : [data]).map((d) => d["@type"]);
    });
    expect(types).toEqual(expect.arrayContaining(["LocalBusiness", "Service", "BreadcrumbList", "FAQPage"]));
  });
});

test.describe("Navigation", () => {
  test("le lien d'évitement est le premier élément focalisable", async ({ page, isMobile }) => {
    test.skip(isMobile, "navigation clavier testée sur bureau");
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Aller au contenu" })).toBeFocused();
  });

  test("menu des prestations (bureau)", async ({ page, isMobile }) => {
    test.skip(isMobile, "menu bureau");
    await page.goto("/");
    const button = page.getByRole("button", { name: "Prestations" });
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await button.click();
    await page.getByRole("navigation", { name: "Navigation principale" }).getByRole("link", { name: "Nettoyage après décès" }).click();
    await expect(page).toHaveURL(/\/post-mortem$/);
  });

  test("menu mobile : ouverture, navigation, fermeture", async ({ page, isMobile }) => {
    test.skip(!isMobile, "menu mobile");
    await page.goto("/");
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    const nav = page.getByRole("navigation", { name: "Navigation mobile" });
    await expect(nav).toBeVisible();
    await nav.getByRole("link", { name: "Nettoyage syndrome de Diogène" }).click();
    await expect(page).toHaveURL(/\/diogene$/);
    await expect(nav).toBeHidden();
  });

  test("barre d'appel mobile avec un lien tel:", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile uniquement");
    await page.goto("/bureaux");
    await expect(page.getByRole("link", { name: "Appeler", exact: true })).toHaveAttribute("href", "tel:+33628286967");
  });
});

test.describe("Zones d'intervention", () => {
  test("la recherche trouve une commune par nom et par code postal", async ({ page }) => {
    await page.goto("/zones-intervention");
    const input = page.getByLabel("Rechercher votre commune");
    await input.fill("thuir");
    await expect(page.getByText("Thuir", { exact: true }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Vérifier la disponibilité" }).first()).toHaveAttribute(
      "href",
      "/contact?commune=Thuir",
    );
    await input.fill("66140");
    await expect(page.getByRole("link", { name: /Voir la page/ })).toHaveAttribute(
      "href",
      "/zones-intervention/canet-en-roussillon",
    );
  });

  test("le formulaire est pré-rempli depuis l'URL", async ({ page }) => {
    await page.goto("/contact?commune=Thuir&service=bureaux");
    await expect(page.getByLabel(/Commune d'intervention/)).toHaveValue("Thuir");
    await expect(page.getByLabel("Nettoyage de bureaux / locaux")).toBeChecked();
  });
});

test.describe("Formulaire de devis", () => {
  test("validation côté client", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /Envoyer ma demande/ }).click();
    await expect(page.locator("form").getByRole("alert")).toContainText("Certains champs sont à corriger");
    await expect(page.getByLabel(/Téléphone/)).toHaveAttribute("aria-invalid", "true");
  });

  test("envoi complet jusqu'à l'API (sans e-mail réel)", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Désinfection", { exact: true }).check();
    await page.getByLabel(/Commune d'intervention/).fill("Perpignan");
    await page.getByLabel(/Nom et prénom/).fill("Test Automatisé");
    await page.getByLabel(/Téléphone/).fill("06 12 34 56 78");
    await page.getByLabel(/Adresse e-mail/).fill("test@example.fr");
    await page.getByLabel(/Votre besoin/).fill("Test fonctionnel automatisé : désinfection d'un appartement de 40 m².");
    // Le serveur refuse les envois en moins de 3 s (protection anti-robot).
    await page.waitForTimeout(3200);
    const response = page.waitForResponse("**/api/contact");
    await page.getByRole("button", { name: /Envoyer ma demande/ }).click();
    expect((await response).status()).toBe(200);
    await expect(page.getByRole("heading", { name: "Demande envoyée" })).toBeVisible();
  });

  test("l'API refuse une requête d'une autre origine", async ({ request }) => {
    const res = await request.post("/api/contact", {
      headers: { origin: "https://evil.example", "content-type": "application/json" },
      data: {},
    });
    expect(res.status()).toBe(403);
  });
});

test.describe("Affichage et accessibilité", () => {
  for (const url of KEY_PAGES) {
    test(`${url} : pas de débordement horizontal ni de violation axe`, async ({ page }) => {
      await page.goto(url);
      // Laisser se terminer les animations d'apparition (opacité) avant de mesurer les contrastes.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 30));
        }
      });
      await page.waitForTimeout(1200);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const summary = results.violations.map((v) => `${v.id} (${v.nodes.length}) : ${v.nodes[0]?.target.join(" ")}`);
      expect(summary).toEqual([]);
    });
  }
});
