"use client";

import { LazyMotion, m } from "framer-motion";

/**
 * Chargement paresseux du moteur d'animation framer-motion.
 * Le bundle initial n'embarque que `m` (~1 ko) ; les features (domMax :
 * layout, gestures, exit) arrivent dans un chunk async après l'hydratation.
 * `strict` garantit qu'aucun composant n'importe `motion.` par erreur
 * (ce qui reintroduirait le moteur complet dans le bundle principal).
 */
const loadFeatures = () =>
  import("framer-motion").then((mod) => mod.domMax);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}

export { m };
