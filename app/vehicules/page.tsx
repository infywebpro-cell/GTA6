import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VehicleBrowser } from "@/components/VehicleBrowser";
import { AdSlot } from "@/components/AdSlot";
import { PageHeader } from "@/components/PageHeader";

/** FAQ du hub véhicules (requête « véhicules gta 6 ») + schema FAQPage. */
const VEHICULES_FAQ = [
  {
    q: "Combien de véhicules dans GTA 6 ?",
    a: "Aucune liste officielle complète n'a été publiée. Le media kit des éditions a confirmé plusieurs noms (Grotti Cheetah, Squalo, Vapid Stanier, Dominator Buggy 1967) et les trailers montrent des dizaines de modèles. Les précédents GTA dépassaient les 600 véhicules : un catalogue au moins comparable est attendu.",
  },
  {
    q: "Quels véhicules sont confirmés dans GTA 6 ?",
    a: "Sept véhicules ont un nom officiel confirmé par le media kit : Grotti Cheetah, Squalo, Vapid Dominator Buggy (1967), Vapid Stanier, Vapid Ganado, le Canis « One-Eyed Willie » et la collection de classiques de Wyman.",
  },
  {
    q: "Les marques de voitures de GTA 6 sont-elles réelles ?",
    a: "Non. Comme toujours dans la série, les marques sont fictives et parodient les constructeurs réels : Grotti évoque Ferrari, Vapid s'inspire de Ford, Canis de Jeep.",
  },
];
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, itemListLd, faqLd } from "@/lib/seo";
import { vehicles } from "@/lib/vehicles";

export const metadata: Metadata = buildMetadata({
  title: "Véhicules GTA 6 : voitures, motos, bateaux",
  description:
    "Base de véhicules GTA 6 : voitures, motos, bateaux et avions aperçus dans les trailers. Recherche et filtres par catégorie pour préparer Vice City.",
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
      <JsonLd data={faqLd(VEHICULES_FAQ)} />
      <Breadcrumbs items={[{ name: "Véhicules", path: "/vehicules" }]} />

      <PageHeader
        kicker="Trailers & media kit officiels"
        title="Le"
        gradientWord="garage"
        lede="Grotti Cheetah, Squalo, Vapid Stanier... : les véhicules de GTA 6 confirmés par Rockstar (media kit des éditions) et ceux aperçus dans les bandes-annonces. Chaque fiche indique son statut, les stats détaillées arriveront dès la sortie, le 19 novembre 2026."
      />

      <VehicleBrowser />

      <AdSlot slot="" label="Publicité" className="mt-10" />

      <section className="mt-14">
        <h2 className="mb-5 flex items-center gap-3 font-display text-3xl uppercase tracking-wide">
          <HelpCircle className="h-6 w-6 text-vice" /> Questions fréquentes
        </h2>
        <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
          {VEHICULES_FAQ.map((f, i) => (
            <details key={i} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold text-ink transition-colors marker:hidden hover:text-vice-300">
                {f.q}
              </summary>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </Container>
  );
}
