import { siteConfig, absoluteUrl } from "@/lib/site";
import { getAllArticles } from "@/lib/content";

export const dynamic = "force-static";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Flux RSS 2.0 — decouverte, agregateurs, Google Discover-friendly. */
export function GET() {
  const articles = getAllArticles();
  const lastBuild = new Date(
    `${articles[0]?.updated ?? "2026-07-02"}T08:00:00Z`
  ).toUTCString();

  const items = articles
    .map((a) => {
      const url = absoluteUrl(`/${a.category}/${a.slug}`);
      return `    <item>
      <title>${esc(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${a.published}T08:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(a.metaDescription)}</description>
      ${a.cover ? `<enclosure url="${absoluteUrl(a.cover)}" type="image/jpeg" length="0" />` : ""}
      <category>${esc(a.category)}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
    <description>${esc(siteConfig.description)}</description>
    <language>fr</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
