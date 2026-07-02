import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/ArticleCard";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { CATEGORIES, categoryMeta, isCategory } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/content";
import { buildMetadata, itemListLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return {};
  const meta = categoryMeta[category];
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/${category}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isCategory(category)) notFound();

  const meta = categoryMeta[category];
  const articles = getArticlesByCategory(category);

  return (
    <Container className="py-10">
      <JsonLd
        data={itemListLd(
          articles.map((a) => ({ name: a.title, path: `/${a.category}/${a.slug}` }))
        )}
      />
      <Breadcrumbs items={[{ name: meta.label, path: `/${category}` }]} />

      <PageHeader
        kicker="Section"
        title=""
        gradientWord={meta.label}
        lede={meta.description}
      />

      <AdSlot slot="" label="Publicité" className="mb-10" />

      {articles.length === 0 ? (
        <p className="rounded-2xl border border-border bg-surface p-8 text-center text-muted">
          Les premiers contenus de cette section arrivent bientot.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </div>
      )}
    </Container>
  );
}
