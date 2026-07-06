import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HelpCircle } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapExplorer } from "@/components/MapExplorer";
import { AdSlot } from "@/components/AdSlot";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, faqLd } from "@/lib/seo";
import { lieux } from "@/lib/lieux";

/** FAQ de la page carte (requête forte « carte gta 6 ») + schema FAQPage. */
const CARTE_FAQ = [
  {
    q: "La carte officielle de GTA 6 a-t-elle été publiée ?",
    a: "Non. Rockstar n'a pas encore publié la carte officielle de GTA 6. La carte présentée ici est une reconstitution communautaire (mapping project), établie à partir des trailers et screenshots officiels, et sera remplacée dès la publication de la carte officielle.",
  },
  {
    q: "Quelle est la taille de la carte de GTA 6 par rapport à GTA 5 ?",
    a: "Aucune superficie officielle n'a été communiquée. Les reconstitutions communautaires suggèrent un monde environ deux fois plus grand que celui de GTA 5, mais ce chiffre reste une estimation à confirmer au lancement, le 19 novembre 2026.",
  },
  {
    q: "Quelles sont les régions de la carte de GTA 6 ?",
    a: "L'État de Leonida compte six zones connues : Vice City (la métropole inspirée de Miami), les Leonida Keys, Grassrivers (les Everglades), Mount Kalaga National Park, Port Gellhorn et Ambrosia.",
  },
  {
    q: "Où se trouve Vice City sur la carte ?",
    a: "Vice City occupe la côte est de Leonida, avec sa plage face à l'Atlantique, l'aéroport international au sud-ouest de la ville et l'île de Catalana au sud-est.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Carte GTA 6 : map interactive de Leonida et Vice City",
  description:
    "Carte GTA 6 interactive : explorez la map de Leonida, Vice City, les Keys et tous les points d'intérêt. Zoom, filtres, taille vs GTA 5 et FAQ.",
  path: "/carte",
  keywords: ["carte gta 6", "map gta 6", "carte leonida", "vice city carte"],
});

export default function CartePage() {

  return (
    <Container className="py-10">
      <JsonLd data={faqLd(CARTE_FAQ)} />
      <Breadcrumbs items={[{ name: "Carte", path: "/carte" }]} />

      <PageHeader
        kicker="L'État de Leonida"
        title="La"
        gradientWord="carte"
        lede="GTA 6 se déroule dans l'État fictif de Leonida (inspiré de la Floride), avec Vice City pour métropole. Explorez les régions connues à ce jour, la carte officielle sera intégrée dès sa publication par Rockstar."
      />

      <MapExplorer />

      <AdSlot slot="" label="Publicité" className="my-10" />

      <section className="mt-4">
        <h2 className="mb-5 font-display text-3xl uppercase tracking-wide">
          Les <span className="text-gradient-hot">régions</span> de Leonida
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
          Les noms et positions reposent sur les bandes-annonces et les
          premières informations ; certains détails restent à confirmer en jeu.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="mb-5 flex items-center gap-3 font-display text-3xl uppercase tracking-wide">
          <HelpCircle className="h-6 w-6 text-vice" /> Questions fréquentes
        </h2>
        <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
          {CARTE_FAQ.map((f, i) => (
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
