/**
 * Statuts éditoriaux des communes, indexés par code INSEE.
 *
 * Ce fichier est volontairement séparé de communes-66.json (régénéré par
 * `npm run communes:import`) pour qu'un nouvel import n'efface jamais une
 * décision éditoriale.
 *
 * - `service` :
 *   - "declared"   : desserte annoncée par l'entreprise (site historique ou
 *                    brief de refonte). À confirmer formellement par le gérant.
 *   - "to-confirm" : commune du département sans information de desserte.
 * - Une page locale n'est publiée (et indexée) que si la commune est
 *   "declared" ET qu'un contenu éditorial spécifique existe dans
 *   data/local-pages.ts. Toutes les autres communes restent consultables dans
 *   le moteur de recherche de /zones-intervention, sans page dédiée.
 *
 * Perpignan n'a pas de page locale : la page d'accueil cible déjà
 * « nettoyage Perpignan » (c'est aussi le nom de la marque) ; une seconde page
 * entrerait en concurrence avec elle.
 */

export type ServiceStatus = "declared" | "to-confirm";

export const communeStatus: Record<string, { service: ServiceStatus }> = {
  "66136": { service: "declared" }, // Perpignan
  "66141": { service: "declared" }, // Pia (siège)
  "66028": { service: "declared" }, // Cabestany
  "66037": { service: "declared" }, // Canet-en-Roussillon
  "66172": { service: "declared" }, // Saint-Estève
  "66008": { service: "declared" }, // Argelès-sur-Mer
};
