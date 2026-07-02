import { ShoppingCart } from "lucide-react";
import { amazonLink, amazonProducts, type AmazonProduct } from "@/lib/affiliate";

/** Carte produit Amazon (lien d'affiliation, rel sponsored nofollow). */
export function AffiliateCard({ product }: { product: AmazonProduct }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-sunset/70 hover:shadow-glow-orange">
      <span className="mb-2 inline-flex w-fit rounded-full border border-haze/40 bg-haze/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-haze-300">
        {product.category}
      </span>
      <h3 className="font-semibold leading-snug text-ink">{product.name}</h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-muted">{product.pitch}</p>
      {product.priceHint && (
        <p className="mt-2 font-display text-lg tracking-wide text-sand">
          {product.priceHint}
        </p>
      )}
      <a
        href={amazonLink(product)}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="btn-sunset mt-3 inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-widest text-bg"
      >
        <ShoppingCart className="h-4 w-4" />
        Voir sur Amazon
      </a>
    </article>
  );
}

/** Bande de produits affilies (ex: 3-4 produits sous un article). */
export function AffiliateStrip({
  ids,
  title = "S'equiper pour le jour J",
}: {
  ids?: string[];
  title?: string;
}) {
  const list = ids
    ? amazonProducts.filter((p) => ids.includes(p.id))
    : amazonProducts.slice(0, 4);

  if (list.length === 0) return null;

  return (
    <section className="my-12 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface via-surface to-surface-2 p-6">
      <p className="text-[11px] font-bold uppercase tracking-mega text-sand">
        Selection materiel
      </p>
      <h2 className="mt-1 font-display text-2xl uppercase tracking-wide text-ink sm:text-3xl">
        {title}
      </h2>
      <p className="mb-5 mt-2 text-xs text-muted">
        Liens affilies — en tant que Partenaire Amazon, nous percevons un revenu
        sur les achats eligibles. Cela ne change rien a votre prix.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => (
          <AffiliateCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
