"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-11-19T00:00:00+01:00").getTime();

function diff() {
  const ms = TARGET - Date.now();
  if (ms <= 0) return null;
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

/** Compte a rebours "affiche" : chiffres geants en dégradé sunset. */
export function Countdown() {
  // null au premier rendu serveur pour éviter les ecarts d'hydratation
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
    <div className="flex items-start gap-3 sm:gap-5" suppressHydrationWarning>
      {cells.map(([v, label], i) => (
        <div key={label} className="flex items-start gap-3 sm:gap-5">
          <div className="flex flex-col items-center">
            <span className="text-gradient font-display text-5xl leading-none tabular-nums sm:text-7xl">
              {String(v).padStart(2, "0")}
            </span>
            <span className="mt-2 text-[10px] font-semibold uppercase tracking-mega text-muted">
              {label}
            </span>
          </div>
          {i < cells.length - 1 && (
            <span className="font-display text-4xl leading-none text-border sm:text-6xl">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
