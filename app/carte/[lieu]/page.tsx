import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight, HelpCircle, Compass } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, faqLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { lieux, getLieu } from "@/lib/lieux";
import { clsx } from "clsx";

export const dynamicParams = false;

export function generateStaticParams() {
  return lieux.map((l) => ({ lieu: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lieu: string }>;
}): Promise<Metadata> {
  const { lieu } = await params;
  const l = getLieu(lieu);
  if (!l) return {};
  return buildMetadata({
    title: `${l.name} — Carte et guide du lieu (GTA 6)`,
    description: l.metaDescription,
    path: `/carte/${l.id}`,
    image: l.image,
    keywords: [`${l.name.toLowerCase()} gta 6`, "carte gta 6", "leonida"],
  });
}

function placeLd(l: NonNullable<ReturnType<typeof getLieu>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${l.name} (GTA 6)`,
    description: l.metaDescription,
    image: absoluteUrl(l.image),
    containedInPlace: {
      "@type": "Place",
      name: "Etat de Leonida (Grand Theft Auto VI)",
    },
  };
}

export default async function LieuPage({
  params,
}: {
  params: Promise<{ lieu: string }>;
}) {
  const { lieu } = await params;
  const l = getLieu(lieu);
  if (!l) notFound();

  const autres = lieux.filter((o) => o.id !== l.id);

  return (
    <Container className="py-10">
      <JsonLd data={[placeLd(l), faqLd(l.faq)]} />
      <Breadcrumbs
        items={[
          { name: "Carte", path: "/carte" },
          { name: l.name, path: `/carte/${l.id}` },
        ]}
      />

      {/* Hero du lieu : artwork officiel */}
      <header className="relative mb-10 flex min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl border border-border sm:min-h-[440px]">
        <Image
          src={l.image}
          alt={`Artwork officiel — ${l.name} dans GTA 6`}
          fill
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
        <p className="absolute right-3 top-3 rounded bg-black/50 px-2 py-0.5 text-[9px] uppercase tracking-widest text-white/70 backdrop-blur-sm">
          © Rockstar Games
        </p>
        <div className="relative p-7 sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-mega text-sand">
            {l.tagline} — {l.num}/06
          </p>
          <h1 className="mt-2 font-display text-5xl uppercase leading-none tracking-wide sm:text-7xl">
            <span className="text-gradient">{l.name}</span>
          </h1>
          <span
            className={clsx(
              "mt-4 inline-block rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest",
              l.status === "officiel"
                ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                : "border-haze/40 bg-haze/10 text-haze-300"
            )}
          >
            {l.status === "officiel" ? "Lieu officiel" : "Rapporte"}
          </span>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <article className="max-w-prose">
          {l.body.map((p, i) => (
            <p key={i} className="mb-4 text-[15px] leading-7 text-muted">
              {p}
            </p>
          ))}

          <AdSlot slot="" label="Publicite" className="my-8" />

          <h2 className="mb-4 mt-10 font-display text-3xl uppercase tracking-wide">
            Points <span className="text-gradient-hot">d'interet</span>
          </h2>
          <ul className="space-y-2.5">
            {l.pois.map((poi) => (
              <li key={poi} className="flex items-start gap-2.5 text-sm text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sunset" />
                {poi}
              </li>
            ))}
          </ul>

          <section className="mt-12">
            <h2 className="mb-5 flex items-center gap-3 font-display text-3xl uppercase tracking-wide">
              <HelpCircle className="h-6 w-6 text-vice" /> Questions frequentes
            </h2>
            <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
              {l.faq.map((f, i) => (
                <details key={i} className="group p-5">
                  <summary className="cursor-pointer list-none font-semibold text-ink transition-colors marker:hidden hover:text-vice-300">
                    {f.q}
                  </summary>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </article>

        <aside className="flex flex-col gap-4">
          <Link
            href="/carte"
            className="btn-sunset inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-widest text-bg"
          >
            <Compass className="h-4 w-4" /> Voir sur la carte interactive
          </Link>

          <div className="rounded-3xl border border-border bg-surface p-5">
            <h2 className="mb-4 text-[11px] font-bold uppercase tracking-mega text-sand">
              Les autres regions
            </h2>
            <ul className="space-y-1">
              {autres.map((o) => (
                <li key={o.id}>
                  <Link
                    href={`/carte/${o.id}`}
                    className="group flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-2"
                  >
                    <span>
                      <span className="block font-display text-sm uppercase tracking-wide text-ink group-hover:text-gradient-hot">
                        {o.name}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-muted">
                        {o.tagline}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-vice" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-surface/60 p-5 text-xs leading-relaxed text-muted">
            Les positions precises proviennent de la reconstitution communautaire
            (mapping project) : elles seront verifiees des la publication de la
            carte officielle par Rockstar.
          </div>
        </aside>
      </div>
    </Container>
  );
}
