"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Eye } from "lucide-react";
import { clsx } from "clsx";
import { vehicles, vehicleClasses, type VehicleClass } from "@/lib/vehicles";

const statusStyle: Record<string, { label: string; cls: string }> = {
  confirme: {
    label: "Confirme",
    cls: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  },
  apercu: {
    label: "Apercu",
    cls: "border-sunset/40 bg-sunset/10 text-sunset-300",
  },
  suppose: {
    label: "Suppose",
    cls: "border-haze/40 bg-haze/10 text-haze-300",
  },
};

export function VehicleBrowser() {
  const [query, setQuery] = useState("");
  const [cls, setCls] = useState<VehicleClass | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vehicles.filter((v) => {
      const okClass = cls === "all" || v.class === cls;
      const okQuery =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q);
      return okClass && okQuery;
    });
  }, [query, cls]);

  return (
    <div>
      <div className="mb-5">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un vehicule (Cheetah, Squalo...)"
            className="w-full rounded-full border border-border bg-surface py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-muted focus:border-vice focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Chip active={cls === "all"} onClick={() => setCls("all")}>
          Tous
        </Chip>
        {vehicleClasses.map((c) => (
          <Chip key={c} active={cls === c} onClick={() => setCls(c)}>
            {c}
          </Chip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted">
          Aucun vehicule ne correspond a votre recherche.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => {
            const st = statusStyle[v.status];
            return (
              <Link
                key={v.slug}
                href={`/vehicules/${v.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-vice/70 hover:shadow-glow-pink"
              >
                {v.image && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={v.image}
                      alt={`Screenshot officiel — ${v.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5 pt-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sand">
                      {v.class}
                    </span>
                    <span
                      className={clsx(
                        "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest",
                        st.cls
                      )}
                    >
                      {st.label}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl uppercase leading-tight tracking-wide text-ink group-hover:text-gradient-hot">
                    {v.name}
                  </h3>
                  {v.seenIn && (
                    <p className="mt-1 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted">
                      <Eye className="h-3 w-3 text-vice" /> {v.seenIn}
                    </p>
                  )}
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {v.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest transition-all",
        active
          ? "btn-sunset border-transparent text-bg"
          : "border-border text-muted hover:border-vice hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}
