import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapExplorer } from "@/components/MapExplorer";
import { AdSlot } from "@/components/AdSlot";
import { PageHeader } from "@/components/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { mapMarkers } from "@/lib/map";

export const metadata: Metadata = buildMetadata({
  title: "Carte interactive de GTA 6 (Leonida)",
  description:
    "Carte interactive de GTA 6 : explorez l'Etat de Leonida, Vice City, les Leonida Keys et les points d'interet. Filtres, zoom et reperage des lieux.",
  path: "/carte",
  keywords: ["carte gta 6", "map gta 6", "carte leonida", "vice city carte"],
});

export default function CartePage() {
  const regions = mapMarkers.filter((m) => m.category === "region" || m.category === "ville");

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
        <div className="grid gap-4 sm:grid-cols-2">
          {regions.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-sunset/60"
            >
              <h3 className="font-display text-xl uppercase tracking-wide text-ink">
                {r.name}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.description}</p>
            </div>
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
