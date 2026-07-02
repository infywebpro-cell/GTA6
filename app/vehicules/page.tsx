import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VehicleBrowser } from "@/components/VehicleBrowser";
import { AdSlot } from "@/components/AdSlot";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, itemListLd } from "@/lib/seo";
import { vehicles } from "@/lib/vehicles";

export const metadata: Metadata = buildMetadata({
  title: "Vehicules GTA 6 : voitures, motos, bateaux",
  description:
    "Base de vehicules GTA 6 : voitures, motos, bateaux et avions apercus dans les trailers. Recherche et filtres par categorie pour preparer Vice City.",
  path: "/vehicules",
  keywords: ["vehicules gta 6", "voitures gta 6", "liste vehicules gta 6"],
});

export default function VehiculesPage() {
  return (
    <Container className="py-10">
      <JsonLd
        data={itemListLd(
          vehicles.map((v) => ({ name: v.name, path: `/vehicules/${v.slug}` }))
        )}
      />
      <Breadcrumbs items={[{ name: "Vehicules", path: "/vehicules" }]} />

      <PageHeader
        kicker="Trailers & media kit officiels"
        title="Le"
        gradientWord="garage"
        lede="Grotti Cheetah, Squalo, Vapid Stanier... : les vehicules de GTA 6 confirmes par Rockstar (media kit des editions) et ceux apercus dans les bandes-annonces. Chaque fiche indique son statut — les stats detaillees arriveront des la sortie, le 19 novembre 2026."
      />

      <VehicleBrowser />

      <AdSlot slot="" label="Publicite" className="mt-10" />
    </Container>
  );
}
