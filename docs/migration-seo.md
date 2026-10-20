# Migration SEO — inventaire avant / après

Refonte d'octobre 2026. Objectif : aucune perte d'URL indexée, suppression des
doublons, métadonnées uniques sur toutes les pages.

> Le site en production renvoyait une erreur Cloudflare 522 (origine
> injoignable) le 20/10/2026 : l'inventaire a donc été établi à partir du
> code source historique (aucun sitemap n'existait). Vérifier dans Google
> Search Console les URL réellement indexées avant la mise en ligne.

## URL historiques : toutes conservées

| URL | Avant (title) | Après (title) | Statut |
| --- | --- | --- | --- |
| `/` | Nettoyage Perpignan | Nettoyage Perpignan — entreprise de nettoyage et désinfection (66) | conservée |
| `/particuliers` | Nettoyage pour particuliers à Perpignan \| Maison & Appartement | Nettoyage de maison et d'appartement à Perpignan | conservée |
| `/bureaux` | Nettoyage de bureaux à Perpignan \| Entretien professionnel | Nettoyage de bureaux et locaux professionnels à Perpignan | conservée |
| `/desinfection` | Service de désinfection à Perpignan \| Assainissement & hygiène | Désinfection de logements et de locaux à Perpignan | conservée |
| `/nuisibles` | Traitement des nuisibles à Perpignan \| Dératisation & désinsectisation | Traitement des nuisibles à Perpignan : rats, cafards, punaises | conservée |
| `/diogene` | Nettoyage Syndrome de Diogène à Perpignan \| Débarras & désinfection | Nettoyage syndrome de Diogène à Perpignan : tri et remise en état | conservée |
| `/post-mortem` | **Doublon du titre Diogène** (erreur) | Nettoyage après décès à Perpignan : nettoyage post-mortem | conservée, corrigée |
| `/a-propos` | aucun title | À propos : notre entreprise de nettoyage à Pia, près de Perpignan | conservée |
| `/contact` | aucun title | Contact et devis gratuit | conservée |
| `/mentions-legales` | aucun title | Mentions légales | conservée |
| `/confidentialite` | aucun title | Politique de confidentialité | conservée |
| `/conditions-generales` | aucun title | Conditions générales de prestation | conservée |

Aucune redirection 301 n'est nécessaire. Le point d'entrée `redirects()` de
`next.config.ts` est prêt pour toute modification future.

Ancien lien interne cassé corrigé : le menu pointait vers `#about` (ancre
inexistante) au lieu de `/a-propos`.

## Nouvelles URL

| URL | Rôle | Indexée |
| --- | --- | --- |
| `/zones-intervention` | Hub géographique, recherche parmi les 226 communes | oui |
| `/zones-intervention/pia` | Page locale (siège) | oui |
| `/zones-intervention/cabestany` | Page locale | oui |
| `/zones-intervention/canet-en-roussillon` | Page locale | oui |
| `/zones-intervention/saint-esteve` | Page locale | oui |
| `/zones-intervention/argeles-sur-mer` | Page locale | oui |
| `/conseils` | Index des guides | oui |
| `/conseils/<slug>` × 12 | Guides | oui |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | Techniques | — |
| `/api/contact` | Formulaire (POST) | bloquée dans robots.txt |

## Décisions anti-cannibalisation

- **Pas de page `/zones-intervention/perpignan`** ni `/nettoyage-perpignan` :
  la page d'accueil cible déjà « nettoyage Perpignan » (c'est aussi le nom de
  marque). Une seconde page entrerait en concurrence directe avec elle.
- **Pas de pages prestation × ville** (`/diogene/perpignan`…) : les pages
  prestations ciblent déjà Perpignan. Ces combinaisons ne seront utiles que
  pour des communes avec une demande réelle et un contenu spécifique.
- **Deux guides « après décès »** à angles distincts : parcours des familles
  (`deroulement-nettoyage-apres-deces`) vs précautions techniques
  (`nettoyage-apres-deces-precautions`). Idem pour les bureaux : méthodes et
  fréquences vs organisation du prestataire.
- Les 221 communes sans page restent consultables dans le moteur de recherche
  du hub, sans page artificielle.

## Contrôles automatisés

`tests/unit/content.test.ts` et `tests/unit/seo.test.ts` vérifient à chaque
exécution : unicité des title/description/H1, longueur des métadonnées,
validité de tous les liens internes des guides, contenu du sitemap, absence
de note fictive dans les données structurées. `tests/e2e/site.spec.ts`
vérifie que chaque URL historique répond 200 avec un H1 unique et sa
canonique.

## Après mise en ligne

1. Soumettre `https://nettoyage-perpignan.fr/sitemap.xml` dans Google Search
   Console et Bing Webmaster Tools.
2. Surveiller le rapport « Pages » (erreurs 404, pages exclues) pendant
   4 à 6 semaines.
3. Comparer clics et impressions des URL historiques avant/après sur la
   même période.
