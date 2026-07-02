import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, Eye } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AffiliateStrip } from "@/components/AffiliateBox";
import { buildMetadata } from "@/lib/seo";
import { vehicles, getVehicle } from "@/lib/vehicles";

export const dynamicParams = false;

const statusLabel: Record<string, string> = {
  confirme: "Confirmé officiellement",
  apercu: "Apercu dans les trailers officiels",
  suppose: "Supposé / à confirmer",
};

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = getVehicle(slug);
  if (!v) return {};
  return buildMetadata({
    title: `${v.name} — Véhicule GTA 6`,
    description: `${v.name} dans GTA 6 : ${v.description}`.slice(0, 155),
    path: `/vehicules/${slug}`,
    keywords: [`${v.name} gta 6`, "véhicules gta 6", v.class.toLowerCase()],
    image: v.image,
  });
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = getVehicle(slug);
  if (!v) notFound();

  const sameClass = vehicles.filter((o) => o.class === v.class && o.slug !== v.slug);

  return (
    <Container className="py-10">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          items={[
            { name: "Véhicules", path: "/vehicules" },
            { name: v.name, path: `/vehicules/${slug}` },
          ]}
        />

        {v.image && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-3xl border border-border">
            <Image
              src={v.image}
              alt={`Screenshot officiel — ${v.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
            <p className="absolute bottom-2 right-3 rounded bg-black/60 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/80">
              © Rockstar Games
            </p>
          </div>
        )}

        <p className="text-[11px] font-bold uppercase tracking-mega text-sand">
          {v.class}
        </p>
        <h1 className="mt-2 font-display text-4xl uppercase leading-[0.95] tracking-wide sm:text-6xl">
          <span className="text-gradient">{v.name}</span>
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
            <BadgeCheck className="h-4 w-4 text-sand" />
            {statusLabel[v.status]}
          </span>
          {v.seenIn && (
            <span className="inline-flex items-center gap-2 rounded-full border border-vice/40 bg-vice/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-vice-300">
              <Eye className="h-4 w-4" /> {v.seenIn}
            </span>
          )}
        </div>

        <div className="divider-sunset mt-7" />

        <p className="mt-7 text-[15px] leading-7 text-muted">{v.description}</p>

        <p className="mt-5 rounded-2xl border border-border bg-surface/70 p-4 text-sm leading-relaxed text-muted">
          Les caracteristiques detaillees (vitesse, maniabilite, prix in-game,
          ou l'acheter) seront ajoutees après la sortie de GTA 6, le 19 novembre
          2026. Le nom officiel in-game sera également mis à jour des sa
          confirmation.
        </p>

        <AffiliateStrip
          ids={["ps5-slim", "dualsense", "logitech-g29", "secretlab-titan"]}
          title="Pour profiter de la conduite"
        />

        {sameClass.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-5 font-display text-2xl uppercase tracking-wide">
              Aussi en <span className="text-gradient-hot">{v.class}</span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {sameClass.map((o) => (
                <Link
                  key={o.slug}
                  href={`/vehicules/${o.slug}`}
                  className="group rounded-2xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-vice/70"
                >
                  <h3 className="font-display text-lg uppercase tracking-wide text-ink group-hover:text-gradient-hot">
                    {o.name}
                  </h3>
                  {o.seenIn && (
                    <p className="mt-1 text-[11px] uppercase tracking-widest text-muted">
                      {o.seenIn}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        <Link
          href="/vehicules"
          className="mt-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-vice-300 hover:text-vice"
        >
          <ArrowLeft className="h-4 w-4" /> Retour au garage
        </Link>
      </div>
    </Container>
  );
}
