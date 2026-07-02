"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/site";

interface AdSlotProps {
  /** data-ad-slot fourni par AdSense pour ce bloc. */
  slot?: string;
  format?: string;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Bloc publicitaire AdSense.
 * - Si NEXT_PUBLIC_ADSENSE_CLIENT est configure et qu'un `slot` est fourni,
 *   affiche une vraie unite AdSense.
 * - Sinon, affiche un emplacement "placeholder" pour visualiser la mise en
 *   page sans casser le rendu (utile avant l'approbation AdSense).
 */
export function AdSlot({ slot, format = "auto", className, label = "Publicite" }: AdSlotProps) {
  const enabled = Boolean(siteConfig.adsenseClient && slot);

  useEffect(() => {
    if (!enabled) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense pas encore charge : ignore */
    }
  }, [enabled]);

  if (!enabled) {
    return (
      <div
        className={`flex min-h-[90px] items-center justify-center rounded-2xl border border-dashed border-border/80 bg-surface/40 text-[10px] font-semibold uppercase tracking-mega text-muted/70 ${className ?? ""}`}
        aria-hidden="true"
      >
        {label}
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={siteConfig.adsenseClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
