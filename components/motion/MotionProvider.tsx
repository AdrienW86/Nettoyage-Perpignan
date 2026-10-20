"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Charge le moteur d'animation à la demande (LazyMotion + composants `m`) :
 * les fonctionnalités sont téléchargées après l'hydratation, hors du chemin
 * critique d'affichage. Respecte automatiquement `prefers-reduced-motion`.
 */
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
