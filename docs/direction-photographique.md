# Direction photographique

## État actuel (octobre 2026)

- **Aucune photo d'intervention réelle** n'est disponible dans le dépôt.
- Les visuels utilisés sont des **images d'illustration** existantes du site
  historique (banques d'images ou génération), converties en WebP optimisés
  (`npm run images:optimize` : les 18 visuels utilisés passent de 45 Mo à
  1,8 Mo, avant même la conversion AVIF/WebP à la volée de `next/image`). Elles sont signalées
  « Photo d'illustration » sur chaque page et dans le pied de page.
- **Licences à vérifier** : l'origine et la licence de ces images n'étant pas
  documentées, confirmer qu'elles peuvent être utilisées commercialement.
- Images écartées volontairement : `diogene2.jpg`, `diogene2.png`,
  `diogene3.jpg`, `diogene4.jpg` (scènes d'insalubrité ou personne en
  détresse, jugées stigmatisantes) et `post-mortem.png` (ambiance sombre et
  inquiétante). Elles restent dans `/public` pour ne casser aucune URL
  d'image déjà indexée.
- Aucun outil de génération d'images n'était disponible pendant la refonte :
  **aucune image n'a été générée**. Les prompts ci-dessous sont prêts à
  l'emploi.

## Règles

1. Photographies réelles prioritaires (avec accord écrit des clients et sans
   élément identifiant : visages, adresses, plaques, courriers).
2. Toute image générée par IA est enregistrée avec `illustrative: true` dans
   `lib/images.ts` : la mention « Photo d'illustration » s'affiche alors
   automatiquement.
3. Jamais de texte incrusté, de logo inventé, de personne en situation
   humiliante, de corps, de fluides ou de scène choquante.
4. Palette : bleu nuit, bleu pétrole, vert d'eau, blanc cassé, touches
   champagne. Lumière naturelle, grain fin, profondeur de champ maîtrisée.
5. Livraison : JPEG ou PNG haute définition (≥ 2400 px de large pour le hero,
   ≥ 1600 px sinon), déposé dans `/public`, puis ajouté à
   `scripts/optimize-images.mjs` et `lib/images.ts`.

## Style commun (à ajouter à chaque prompt)

> Editorial interior photography, natural window light, soft shadows,
> realistic textures, color palette of deep navy, petrol blue, pale sea-green
> and warm off-white with subtle champagne accents, shot on a full-frame
> camera, 35mm lens, f/2.8, calm and premium atmosphere, no text, no logo, no
> watermark, no recognizable face.

## Prompts par famille

### Hero (accueil) — format 16:9, 2400 × 1350

> A bright, freshly cleaned Mediterranean apartment living room in
> Perpignan, terracotta floor tiles gleaming, tall window with half-open
> wooden shutters, morning light, a professional's gloved hand placing a
> folded microfiber cloth on a stone countertop in the foreground, shallow
> depth of field.

### Nettoyage pour particuliers — 4:5

> Close-up of a spotless white bathroom with limestone-free chrome faucet,
> water droplets, a neatly folded petrol-blue towel, soft daylight.

> A kitchen in an old stone house of the Roussillon after deep cleaning,
> clear countertops, polished cabinet fronts, a single green plant.

### Nettoyage de bureaux — 4:5 et 16:10

> Empty modern office at dawn, clean desks with nothing on them, glass
> partitions reflecting soft light, a discreet cleaning cart in
> the background, petrol-blue accents.

> Detail of a person in a navy uniform wiping a door handle with a
> microfiber cloth, gloved hand only, blurred office background.

### Désinfection — 4:5

> Professional in a white protective suit and mask applying disinfectant
> with a low-pressure sprayer in a bright empty room, calm and clinical,
> no hazard symbols.

> Macro shot of a disinfectant being wiped from a stainless steel surface,
> visible wet sheen, timer feeling, cool light.

### Syndrome de Diogène — respectueux, sans insalubrité visible — 4:5

> A sunlit room partially cleared, cardboard boxes neatly labeled and
> stacked by the door, an open window, a chair with a carefully folded
> blanket and a small box of family photographs set aside, hopeful mood.

> Gloved hands placing old letters and photographs into a clean archive box
> on a table, warm light, sense of care and respect.

### Nettoyage après décès — sobre — 4:5

> A quiet, empty bedroom with freshly made neutral bedding, window open
> onto a Mediterranean garden, white curtains moving slightly, serene and
> respectful atmosphere.

> A hallway with a simple bouquet of white flowers on a console, soft
> afternoon light, nobody in the frame.

### Traitement des nuisibles — 4:5

> Technician kneeling to place a closed, secured bait station behind a
> kitchen cabinet plinth, gloved hands, clean modern kitchen.

> Close-up inspection of mattress seams with a flashlight by a gloved hand,
> neutral bedroom, no insects visible.

### Pages locales — 16:9 (sans monument identifiable reproduit à l'identique)

> Rooftops and facades of a Roussillon town in soft morning light, Canigou
> mountain silhouette in the distance, pastel tones.

> Mediterranean seaside residence balcony with sea view, clean glass
> balustrade, beach-town feeling (Canet-en-Roussillon / Argelès-sur-Mer).

### Guides — 3:2

Un visuel par guide, cohérent avec la famille de prestation concernée
(voir `data/articles.ts`, champ `image`).
