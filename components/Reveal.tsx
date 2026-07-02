"use client";

import { useReducedMotion } from "framer-motion";
import { MotionProvider, m } from "@/components/Motion";
import { cn } from "@/lib/utils";

/**
 * Apparition douce au scroll (une seule fois). Respecte
 * prefers-reduced-motion. Moteur d'animation charge en lazy (voir Motion.tsx).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <MotionProvider>
      <m.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] }}
        className={cn(className)}
      >
        {children}
      </m.div>
    </MotionProvider>
  );
}
