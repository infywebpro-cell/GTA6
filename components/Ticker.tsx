const DEFAULT_ITEMS = [
  "Sortie mondiale — 19 novembre 2026",
  "PS5",
  "Xbox Series X|S",
  "Précommandes le 25 juin 2026",
  "Vice City",
  "État de Leonida",
  "Jason & Lucia",
];

/** Bandeau defilant type "billboard" — pur CSS, coupe aux motion-reduced. */
export function Ticker({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  const strip = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-surface/60 py-3">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {strip.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-display text-sm uppercase tracking-[0.25em] text-muted"
            aria-hidden={i >= items.length}
          >
            {item}
            <span className="text-gradient-hot text-base">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
