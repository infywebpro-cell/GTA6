import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Robots : tout ouvert (sauf recherche interne et OG dynamiques),
 * avec autorisation explicite des crawlers IA — les citations dans
 * ChatGPT / Perplexity / AI Overviews sont un canal d'acquisition.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/recherche", "/og"];
  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "PerplexityBot",
    "Google-Extended",
    "Applebot-Extended",
    "Bytespider",
    "CCBot",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/" as const, disallow })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
