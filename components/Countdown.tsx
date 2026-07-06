"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-11-19T00:00:00+01:00").getTime();
// Reveal du trailer 1 : debut officiel de l'attente pour la communaute.
const REVEAL = new Date("2023-12-05T00:00:00+01:00").getTime();

function diff() {
  const ms = TARGET - Date.now();
  if (ms <= 0) return null;
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  const progress = Math.min(
    99.9,
    ((Date.now() - REVEAL) / (TARGET - REVEAL)) * 100
  );
  return { days, hours, minutes, seconds, progress };
}

/**
 * Compte à rebours en carte verre : chiffres dégradés (fondu discret à
 * chaque tick) + barre « chemin parcouru » depuis le trailer 1. La barre
 * est le clin d'oeil communautaire : on attend tous depuis décembre 2023.
 */
export function Countdown() {
  // null au premier rendu serveur pour éviter les écarts d'hydratation
  const [t, setT] = useState<ReturnType<typeof diff>>(null);

  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!t) {
    return (
      <p
        className="font-display text-2xl uppercase tracking-wide text-sand"
        suppressHydrationWarning
      >
        19 novembre 2026
      </p>
    );
  }

  const cells: [number, string][] = [
    [t.days, "jours"],
    [t.hours, "heures"],
    [t.minutes, "min"],
    [t.seconds, "sec"],
  ];

  return (
    <div
      className="inline-block rounded-2xl border border-ink/15 bg-bg/45 px-5 py-4 backdrop-blur-md sm:px-7 sm:py-5"
      suppressHydrationWarning
    >
      <p className="mb-3 text-[10px] font-bold uppercase tracking-mega text-sand">
        Sortie officielle · 19 novembre 2026
      </p>

      <div className="flex items-start gap-3 sm:gap-5">
        {cells.map(([v, label], i) => (
          <div key={label} className="flex items-start gap-3 sm:gap-5">
            <div className="flex flex-col items-center">
              <span className="text-gradient font-display text-4xl leading-none tabular-nums sm:text-6xl">
                {String(v).padStart(2, "0")}
              </span>
              <span className="mt-2 text-[10px] font-semibold uppercase tracking-mega text-muted">
                {label}
              </span>
            </div>
            {i < cells.length - 1 && (
              <span className="font-display text-3xl leading-none text-ink/20 sm:text-5xl">
                :
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Chemin parcouru depuis le trailer 1 (décembre 2023) */}
      <div className="mt-4">
        <div className="h-1 overflow-hidden rounded-full bg-ink/10">
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-sand via-sunset to-vice"
            style={{ width: `${t.progress}%` }}
          >
            <span className="absolute -right-0.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-vice shadow-glow-pink" />
          </div>
        </div>
        <p className="mt-1.5 text-[10px] uppercase tracking-widest text-muted">
          {t.progress.toFixed(1).replace(".", ",")} % de l'attente derrière
          nous depuis le trailer 1
        </p>
      </div>
    </div>
  );
}
