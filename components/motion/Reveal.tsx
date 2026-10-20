"use client";

import { m, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article";
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">;

/**
 * Apparition progressive au défilement. Le contenu reste présent dans le HTML
 * (référencement) et redevient visible sans JavaScript grâce à la règle
 * <noscript> du layout (attribut data-reveal).
 */
export function Reveal({ children, delay = 0, y = 28, as = "div", className, ...rest }: Props) {
  const Component = m[as] as typeof m.div;
  return (
    <Component
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** Révélation d'image par un rideau qui se retire. */
export function ImageReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      data-reveal=""
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </m.div>
  );
}
