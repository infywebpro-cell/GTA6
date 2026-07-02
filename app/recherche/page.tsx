import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { SearchClient, type SearchEntry } from "@/components/SearchClient";
import { getAllArticles } from "@/lib/content";
import { vehicles } from "@/lib/vehicles";
import { categoryMeta } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Recherche",
    description: "Rechercher un guide, une astuce ou un véhicule GTA 6.",
    path: "/recherche",
    noindex: true,
  }),
};

function buildIndex(): SearchEntry[] {
  const articles: SearchEntry[] = getAllArticles().map((a) => ({
    title: a.title,
    href: `/${a.category}/${a.slug}`,
    excerpt: a.excerpt,
    kind: categoryMeta[a.category].label,
  }));
  const veh: SearchEntry[] = vehicles.map((v) => ({
    title: v.name,
    href: `/vehicules/${v.slug}`,
    excerpt: v.description,
    kind: "Véhicule",
  }));
  return [...articles, ...veh];
}

export default function RecherchePage() {
  const index = buildIndex();
  return (
    <Container className="py-10">
      <PageHeader
        kicker="Guides, véhicules, lieux"
        title=""
        gradientWord="Recherche"
        lede="Trouvez un guide, une astuce ou un véhicule en quelques lettres."
      />
      <div className="mx-auto max-w-2xl">
        <Suspense fallback={null}>
          <SearchClient index={index} />
        </Suspense>
      </div>
    </Container>
  );
}
