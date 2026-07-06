import type { Category } from "./categories";
import { articles as rawArticles } from "@/content/articles";
import { articlesJuillet } from "@/content/articles-juillet";
import { articlesMoney } from "@/content/articles-money";
import { articleCovers } from "./covers";

export interface FaqItem {
  q: string;
  a: string;
}

export interface Article {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: Category;
  targetKeyword: string;
  secondaryKeywords?: string[];
  /** Corps de l'article en Markdown (GFM) */
  body: string;
  faq?: FaqItem[];
  /** Image de couverture (chemin public ou URL absolue) */
  cover?: string;
  /** Vidéos YouTube officielles intégrées (façade légère + VideoObject). */
  videos?: { id: string; title: string; uploadDate: string }[];
  /** Produits affiliés ciblés pour cet article (ids de lib/affiliate). */
  affiliateIds?: string[];
  author?: string;
  /** Dates ISO (YYYY-MM-DD) */
  published: string;
  updated: string;
}

const articles: Article[] = [...rawArticles, ...articlesJuillet, ...articlesMoney]
  .map((a) => ({ ...a, cover: a.cover ?? articleCovers[a.slug] }))
  .sort((a, b) => b.updated.localeCompare(a.updated));

export function getAllArticles(): Article[] {
  return articles;
}

export function getArticle(category: string, slug: string): Article | undefined {
  return articles.find((a) => a.category === category && a.slug === slug);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: Category): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getRecentArticles(limit = 6): Article[] {
  return articles.slice(0, limit);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const sameCat = articles.filter(
    (a) => a.slug !== article.slug && a.category === article.category
  );
  const others = articles.filter(
    (a) => a.slug !== article.slug && a.category !== article.category
  );
  return [...sameCat, ...others].slice(0, limit);
}

const WORDS_PER_MINUTE = 200;

export function readingMinutes(article: Article): number {
  const words = article.body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
