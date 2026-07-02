"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Vertical tabs (style shadcn/21st.dev) : liste verticale d'onglets avec
 * indicateur actif anime (layoutId) + panneau de contenu en fondu/glisse.
 * Accessible (roles tablist/tab/tabpanel, fleches clavier), responsive
 * (les onglets passent en rangee scrollable sous lg).
 */

export interface VerticalTabItem {
  id: string;
  /** Contenu du bouton d'onglet. Recoit l'etat actif. */
  trigger: (active: boolean) => React.ReactNode;
  /** Contenu du panneau. */
  content: React.ReactNode;
}

interface VerticalTabsProps {
  items: VerticalTabItem[];
  defaultId?: string;
  className?: string;
  listClassName?: string;
  panelClassName?: string;
  /** Libelle accessible de la liste d'onglets. */
  label: string;
}

export function VerticalTabs({
  items,
  defaultId,
  className,
  listClassName,
  panelClassName,
  label,
}: VerticalTabsProps) {
  const [activeId, setActiveId] = React.useState(defaultId ?? items[0]?.id);
  const reduceMotion = useReducedMotion();
  const refs = React.useRef<Record<string, HTMLButtonElement | null>>({});

  const activeIndex = Math.max(0, items.findIndex((i) => i.id === activeId));
  const active = items[activeIndex];

  function onKeyDown(e: React.KeyboardEvent) {
    const dir =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? -1
          : 0;
    if (!dir) return;
    e.preventDefault();
    const next = items[(activeIndex + dir + items.length) % items.length];
    setActiveId(next.id);
    refs.current[next.id]?.focus();
  }

  return (
    <div className={cn("grid gap-5 lg:grid-cols-[320px_1fr]", className)}>
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className={cn(
          "flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin] lg:flex-col lg:overflow-visible lg:pb-0",
          listClassName
        )}
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[item.id] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "relative shrink-0 rounded-2xl border text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vice/70",
                isActive
                  ? "border-vice/60 bg-surface"
                  : "border-border bg-surface/40 hover:border-vice/40 hover:bg-surface/70"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="vtabs-indicator"
                  aria-hidden="true"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 38 }
                  }
                  className="absolute inset-y-2 left-0 hidden w-[3px] rounded-full bg-gradient-to-b from-sunset to-vice lg:block"
                />
              )}
              {item.trigger(isActive)}
            </button>
          );
        })}
      </div>

      <div className={cn("relative", panelClassName)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active?.id}
            role="tabpanel"
            id={`panel-${active?.id}`}
            aria-labelledby={`tab-${active?.id}`}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10, scale: 0.995 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0.24, 1] }}
            className="h-full"
          >
            {active?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
