# Nettoyage Perpignan

Site vitrine de **Nettoyage Perpignan** (nettoyage-perpignan.fr) : nettoyage de
logements et de bureaux, désinfection, traitement des nuisibles, logements
encombrés (syndrome de Diogène) et nettoyage après décès, dans les
Pyrénées-Orientales.

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · CSS Modules
· Framer Motion · Vitest · Playwright.

## Démarrer

```bash
npm install
cp .env.example .env.local   # renseigner les variables SMTP
npm run dev                  # http://localhost:3000
```

Node.js ≥ 20.9.

## Scripts

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm start` | Build et serveur de production |
| `npm run typecheck` | TypeScript strict (`tsc --noEmit`) |
| `npm run lint` | ESLint (règles Next.js, Core Web Vitals, TypeScript, jsx-a11y) |
| `npm test` | Tests unitaires et de composants (Vitest) |
| `npm run test:e2e` | Tests fonctionnels + audit d'accessibilité axe (Playwright, après `npm run build`) |
| `npm run check` | typecheck + lint + tests + build |
| `npm run communes:import` | Réimporte les 226 communes depuis l'API Géo |
| `npm run images:optimize` | Régénère les visuels WebP de `public/images` |

Premier lancement des tests e2e : `npx playwright install chromium`.

## Architecture

```
app/                    Routes (Server Components par défaut)
  page.tsx              Accueil
  particuliers/ bureaux/ desinfection/ nuisibles/ diogene/ post-mortem/
                        Prestations — URL historiques conservées
  zones-intervention/   Hub + pages locales ([commune], générées statiquement)
  conseils/             Index + guides ([slug], générés statiquement)
  api/contact/route.ts  Réception des demandes de devis
  sitemap.ts robots.ts manifest.ts not-found.tsx
components/
  layout/               Header (client), Footer, barre d'appel mobile, logotype
  home/ service/ zones/ forms/ ui/ motion/ analytics/
content/conseils/*.md   Corps des guides (Markdown rendu au build, zéro JS)
data/                   Contenus éditoriaux et référentiels typés
  services.ts           Les 6 prestations
  articles.ts           Métadonnées des guides
  local-pages.ts        Contenu des pages locales
  communes-66.json      Référentiel officiel (généré, ne pas éditer à la main)
  commune-status.ts     Statuts de desserte (édité à la main)
lib/                    Logique métier : site, SEO, JSON-LD, communes,
                        validation, e-mail, limitation de débit, analytics
types/content.ts        Types partagés
scripts/                Import des communes, optimisation des images
tests/                  unit/ components/ e2e/
docs/                   Migration SEO, direction photographique
```

**Client Components** (JavaScript envoyé au navigateur) : uniquement le header,
le formulaire de devis, la recherche de commune, les liens mesurés et les
animations d'apparition. Tout le reste est rendu côté serveur et généré
statiquement au build.

## Modifier les contenus

- **Identité de l'entreprise** (téléphone, SIRET, adresse, hébergeur,
  Certibiocide) : `lib/site.ts`, source unique utilisée partout (mentions
  légales, JSON-LD, footer).
- **Certibiocide** : renseigner `holder`, `category` et `validUntil` dans
  `lib/site.ts` pour afficher une mention précise ; sinon une mention générale
  et prudente est affichée.
- **Prestation** : `data/services.ts`. Ne pas changer `path` sans ajouter une
  redirection 301 dans `next.config.ts`.
- **Guide** : ajouter une entrée dans `data/articles.ts` et le fichier
  `content/conseils/<slug>.md`. Le temps de lecture, le sommaire, le sitemap et
  les données structurées sont générés automatiquement. Les tests vérifient
  les liens internes et l'unicité des métadonnées.

## Communes et pages locales

Les 226 communes (COG INSEE, via l'API Géo) sont dans `data/communes-66.json`.
Une page locale n'est publiée **que si** :

1. la commune est déclarée desservie dans `data/commune-status.ts` ;
2. un contenu éditorial spécifique existe dans `data/local-pages.ts`.

Les autres communes restent accessibles dans le moteur de recherche de
`/zones-intervention`, sans page dédiée (pas de pages satellites). Pour
publier une nouvelle commune : ajouter son statut, rédiger son contenu,
lancer `npm test`.

Perpignan n'a volontairement pas de page locale (voir
`docs/migration-seo.md`).

## Formulaire de devis

- Validation partagée client/serveur (`lib/quote-schema.ts`, `zod/mini`).
- Anti-spam : pot de miel, délai minimal de remplissage, contrôle d'origine,
  taille maximale, limitation de débit (Redis Upstash si configuré, sinon
  mémoire), Cloudflare Turnstile optionnel.
- E-mail : contenu échappé, sujet protégé contre l'injection d'en-têtes,
  expéditeur = adresse SMTP (le demandeur est en `Reply-To`).
- `CONTACT_DRY_RUN=true` : parcours complet sans envoi réel (tests, recette).

Variables : voir `.env.example`. Les noms `SMTP_*` et `CONTACT_EMAIL` sont
ceux du site historique.

## Mesure des conversions

`lib/analytics.ts` émet `phone_click`, `quote_cta_click`, `quote_submit`,
`quote_success` et `email_click` (événement DOM `np:track`, et `dataLayer`
uniquement si un consentement a été donné). Aucun outil tiers ni cookie n'est
installé : en ajouter un impose un bandeau de consentement.
