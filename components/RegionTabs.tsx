"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { VerticalTabs } from "@/components/ui/vertical-tabs";
import { regions } from "@/lib/regions";
import { cn } from "@/lib/utils";

/** Vitrine des régions de Leonida : onglets verticaux + artwork officiel. */
export function RegionTabs() {
  return (
    <VerticalTabs
      label="Régions de Leonida"
      items={regions.map((r) => ({
        id: r.id,
        trigger: (active) => (
          <span className="flex items-center gap-4 px-5 py-4">
            <span
              className={cn(
                "font-display text-2xl leading-none",
                active ? "text-gradient" : "text-border"
              )}
            >
              {r.num}
            </span>
            <span className="min-w-0">
              <span
                className={cn(
                  "block font-display text-lg uppercase leading-tight tracking-wide",
                  active ? "text-ink" : "text-muted"
                )}
              >
                {r.name}
              </span>
              <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                {r.tagline}
              </span>
            </span>
          </span>
        ),
        content: (
          <div className="relative flex h-full min-h-[380px] flex-col justify-end overflow-hidden rounded-3xl border border-border sm:min-h-[460px]">
            <Image
              src={r.image}
              alt={`Artwork officiel — ${r.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority={r.num === "01"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent" />
            <div className="relative p-7 sm:p-9">
              <p className="text-[11px] font-bold uppercase tracking-mega text-sand">
                {r.tagline}
              </p>
              <h3 className="mt-1 font-display text-4xl uppercase leading-none tracking-wide text-ink sm:text-5xl">
                {r.name}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/85">
                {r.description}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href={`/carte/${r.id}`}
                  className="btn-sunset inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-bg"
                >
                  <MapPin className="h-3.5 w-3.5" /> Guide du lieu
                </Link>
                <Link
                  href="/carte"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/25 bg-bg/40 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-ink backdrop-blur transition-colors hover:border-vice"
                >
                  Carte interactive
                </Link>
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest",
                    r.status === "officiel"
                      ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                      : "border-haze/40 bg-haze/10 text-haze-300"
                  )}
                >
                  {r.status === "officiel" ? "Lieu officiel" : "Rapporté"}
                </span>
              </div>
            </div>
            <p className="absolute right-3 top-3 rounded bg-black/50 px-2 py-0.5 text-[9px] uppercase tracking-widest text-white/70 backdrop-blur-sm">
              © Rockstar Games
            </p>
          </div>
        ),
      }))}
    />
  );
}

export function RegionTabsFooterLink() {
  return (
    <Link
      href="/carte"
      className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-vice-300 hover:text-vice"
    >
      Explorer la carte interactive <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
