"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export interface SearchEntry {
  title: string;
  href: string;
  excerpt: string;
  kind: string;
}

export function SearchClient({ index }: { index: SearchEntry[] }) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return index.filter(
      (e) =>
        e.title.toLowerCase().includes(term) ||
        e.excerpt.toLowerCase().includes(term)
    );
  }, [q, index]);

  return (
    <div>
      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          autoFocus
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher un guide, une astuce, un véhicule..."
          className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 text-ink placeholder:text-muted focus:border-vice focus:outline-none"
        />
      </div>

      {q.trim() && (
        <p className="mb-4 text-sm text-muted">
          {results.length} resultat{results.length > 1 ? "s" : ""} pour «&nbsp;{q}&nbsp;»
        </p>
      )}

      <div className="space-y-3">
        {results.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="block rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-vice/60"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sand">
              {r.kind}
            </span>
            <h2 className="font-display text-lg uppercase tracking-wide text-ink">
              {r.title}
            </h2>
            <p className="mt-1 text-sm text-muted">{r.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
