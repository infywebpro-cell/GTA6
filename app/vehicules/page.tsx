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
  title: "Véhicules GTA 6 : voitures, motos, bateaux",
  description:
    "Base de véhicules GTA 6 : voitures, motos, bateaux et avions aperçus dans les trailers. Recherche et filtres par catégorie pour preparer Vice City.",
  path: "/vehicules",
  keywords: ["véhicules gta 6", "voitures gta 6", "liste véhicules gta 6"],
});

export default function VehiculesPage() {
  return (
    <Container className="py-10">
      <JsonLd
        data={itemListLd(
          vehicles.map((v) => ({ name: v.name, path: `/vehicules/${v.slug}` }))
        )}
      />
      <Breadcrumbs items={[{ name: "Véhicules", path: "/vehicules" }]} />

      <PageHeader
        kicker="Trailers & media kit officiels"
        title="Le"
        gradientWord="garage"
        lede="Grotti Cheetah, Squalo, Vapid Stanier... : les véhicules de GTA 6 confirmés par Rockstar (media kit des éditions) et ceux aperçus dans les bandes-annonces. Chaque fiche indique son statut — les stats détaillées arriveront dès $1 sortie, le 19 novembre 2026."
      />

      <VehicleBrowser />

      <AdSlot slot="" label="Publicité" className="mt-10" />
    </Container>
  );
}
