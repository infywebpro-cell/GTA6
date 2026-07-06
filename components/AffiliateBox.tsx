import { ArrowUpRight } from "lucide-react";
import { amazonLink, amazonProducts, type AmazonProduct } from "@/lib/affiliate";

/**
 * Selection materiel : presentation editoriale discrete (pas de gros CTA).
 * Liens d'affiliation Amazon en rel sponsored nofollow.
 */
function AffiliateRow({ product }: { product: AmazonProduct }) {
  return (
    <a
      href={amazonLink(product)}
      target="_blank"
      rel="sponsored nofollow noopener"
      className="group flex items-baseline justify-between gap-4 rounded-xl px-4 py-3.5 transition-colors hover:bg-surface-2/70"
    >
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-ink group-hover:text-vice-300">
          {product.name}
        </span>
        <span className="mt-0.5 block truncate text-xs text-muted">
          {product.pitch}
        </span>
      </span>
      <span className="flex shrink-0 items-baseline gap-3">
        {product.priceHint && (
          <span className="text-sm font-medium text-sand">{product.priceHint}</span>
        )}
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-muted transition-colors group-hover:text-vice-300">
          Amazon
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </span>
    </a>
  );
}

/** Bande de produits affiliés (ex : sous un article, sur l'accueil). */
export function AffiliateStrip({
  ids,
  title = "S'équiper pour le jour J",
}: {
  ids?: string[];
  title?: string;
}) {
  const list = ids
    ? amazonProducts.filter((p) => ids.includes(p.id))
    : amazonProducts.slice(0, 4);

  if (list.length === 0) return null;

  return (
    <aside
      aria-label="Sélection matériel (liens affiliés)"
      className="my-12 rounded-3xl border border-border bg-surface/50 p-5 sm:p-6"
    >
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sand">
          {title}
        </h2>
        <p className="text-[10px] uppercase tracking-widest text-muted/80">
          Sélection de la rédaction · liens affiliés
        </p>
      </div>
      <div className="divide-y divide-border/50 rounded-2xl border border-border/60 bg-surface">
        {list.map((p) => (
          <AffiliateRow key={p.id} product={p} />
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-muted/70">
        Si vous achetez via ces liens, on touche une petite commission qui aide
        à faire vivre le site. Ça ne change rien à votre prix.
      </p>
    </aside>
  );
}
