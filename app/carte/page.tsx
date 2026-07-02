import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapExplorer } from "@/components/MapExplorer";
import { AdSlot } from "@/components/AdSlot";
import { PageHeader } from "@/components/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { lieux } from "@/lib/lieux";

export const metadata: Metadata = buildMetadata({
  title: "Carte interactive de GTA 6 (Leonida)",
  description:
    "Carte interactive de GTA 6 : explorez l'Etat de Leonida, Vice City, les Leonida Keys et les points d'interet. Filtres, zoom et reperage des lieux.",
  path: "/carte",
  keywords: ["carte gta 6", "map gta 6", "carte leonida", "vice city carte"],
});

export default function CartePage() {

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Carte", path: "/carte" }]} />

      <PageHeader
        kicker="L'Etat de Leonida"
        title="La"
        gradientWord="carte"
        lede="GTA 6 se deroule dans l'Etat fictif de Leonida (inspire de la Floride), avec Vice City pour metropole. Explorez les regions connues a ce jour — la carte officielle sera integree des sa publication par Rockstar."
      />

      <MapExplorer />

      <AdSlot slot="" label="Publicite" className="my-10" />

      <section className="mt-4">
        <h2 className="mb-5 font-display text-3xl uppercase tracking-wide">
          Les <span className="text-gradient-hot">regions</span> de Leonida
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lieux.map((l) => (
            <Link
              key={l.id}
              href={`/carte/${l.id}`}
              className="group relative flex min-h-[180px] flex-col justify-end overflow-hidden rounded-2xl border border-border transition-all hover:-translate-y-0.5 hover:border-sunset/70 hover:shadow-glow-orange"
            >
              <Image
                src={l.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
              <div className="relative p-4">
                <p className="text-[9px] font-bold uppercase tracking-mega text-sand">
                  {l.tagline}
                </p>
                <h3 className="font-display text-xl uppercase tracking-wide text-ink group-hover:text-gradient-hot">
                  {l.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted">
          Les noms et positions reposent sur les bandes-annonces et les premieres
          informations ; certains details restent a confirmer en jeu.
        </p>
      </section>
    </Container>
  );
}
