import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getAllArticles } from "@/lib/content";
import { CATEGORIES } from "@/lib/categories";
import { vehicles } from "@/lib/vehicles";

export default function sitemap(): MetadataRoute.Sitemap {
  // lastmod des pages hub = date du contenu le plus recent
  const now = getAllArticles().reduce(
    (max, a) => (a.updated > max ? a.updated : max),
    "2026-07-02"
  );

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/carte"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/vehicules"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/a-propos"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/mentions-legales"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/confidentialite"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: absoluteUrl(`/${c}`),
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: absoluteUrl(`/${a.category}/${a.slug}`),
    lastModified: a.updated,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const vehiclePages: MetadataRoute.Sitemap = vehicles.map((v) => ({
    url: absoluteUrl(`/vehicules/${v.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...categoryPages, ...articlePages, ...vehiclePages];
}
