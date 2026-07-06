import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, CalendarDays, HelpCircle } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Markdown } from "@/components/Markdown";
import { ArticleCard } from "@/components/ArticleCard";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateStrip } from "@/components/AffiliateBox";
import { JsonLd } from "@/components/JsonLd";
import {
  getAllArticles,
  getArticle,
  getRelatedArticles,
  readingMinutes,
} from "@/lib/content";
import { categoryMeta } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import { buildMetadata, articleLd, faqLd, videoLd } from "@/lib/seo";
import { YouTubeLite } from "@/components/YouTubeLite";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ category: a.category, slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.metaDescription,
    path: `/${category}/${slug}`,
    type: "article",
    publishedTime: article.published,
    modifiedTime: article.updated,
    keywords: [article.targetKeyword, ...(article.secondaryKeywords ?? [])],
    image: article.cover,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) notFound();

  const cat = categoryMeta[article.category];
  const path = `/${category}/${slug}`;
  const related = getRelatedArticles(article, 3);

  return (
    <Container className="py-10">
      <JsonLd data={faqLd(article.faq ?? [])} />
      <JsonLd data={articleLd(article, path)} />
      {article.videos?.map((v) => <JsonLd key={v.id} data={videoLd(v)} />)}

      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          items={[
            { name: cat.label, path: `/${article.category}` },
            { name: article.title, path },
          ]}
        />

        <article>
          <header className="mb-8">
            {article.cover && (
              <div className="relative mb-7 aspect-[21/9] overflow-hidden rounded-3xl border border-border">
                <Image
                  src={article.cover}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
                <p className="absolute bottom-2 right-3 rounded bg-black/60 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/80">
                  © Rockstar Games
                </p>
              </div>
            )}
            <Link
              href={`/${article.category}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-sunset/40 bg-sunset/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-sunset-300"
            >
              <cat.icon className="h-3 w-3" /> {cat.label}
            </Link>
            <h1 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-wide sm:text-5xl">
              {article.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-widest text-muted">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-vice" /> Mis a jour le{" "}
                {formatDate(article.updated)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-vice" /> {readingMinutes(article)} min
              </span>
            </div>
            <div className="divider-sunset mt-6" />
          </header>

          <AdSlot slot="" label="Publicité" className="mb-8" />

          {article.videos && article.videos.length > 0 && (
            <div className="mb-8 space-y-5">
              {article.videos.map((v) => (
                <YouTubeLite key={v.id} id={v.id} title={v.title} />
              ))}
            </div>
          )}

          <Markdown>{article.body}</Markdown>

          {article.faq && article.faq.length > 0 && (
            <section className="mt-14">
              <h2 className="mb-5 flex items-center gap-3 font-display text-3xl uppercase tracking-wide">
                <HelpCircle className="h-6 w-6 text-vice" /> Questions frequentes
              </h2>
              <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
                {article.faq.map((f, i) => (
                  <details key={i} className="group p-5">
                    <summary className="cursor-pointer list-none font-semibold text-ink transition-colors marker:hidden hover:text-vice-300">
                      {f.q}
                    </summary>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </article>

        <AffiliateStrip ids={article.affiliateIds} />
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-3xl uppercase tracking-wide">
            <span className="text-gradient-hot">A lire aussi</span>
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
