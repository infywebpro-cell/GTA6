import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "./site";
import type { Article, FaqItem } from "./content";

interface PageSeo {
  title: string;
  description: string;
  path: string;
  /** Image OG spécifique (chemin public). Defaut: OG dynamique du site. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  keywords?: string[];
}

/** Construit l'objet Metadata Next.js avec canonical, OpenGraph et Twitter. */
export function buildMetadata(seo: PageSeo): Metadata {
  const url = absoluteUrl(seo.path);
  const ogImage = seo.image ? absoluteUrl(seo.image) : ogImageUrl(seo.title);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: url },
    robots: seo.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: seo.type ?? "website",
      url,
      title: seo.title,
      description: seo.description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: seo.title }],
      ...(seo.publishedTime ? { publishedTime: seo.publishedTime } : {}),
      ...(seo.modifiedTime ? { modifiedTime: seo.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImage],
      site: siteConfig.twitter,
    },
  };
}

/** URL de l'image OpenGraph générée dynamiquement (route /og). */
export function ogImageUrl(title: string): string {
  return absoluteUrl(`/og?title=${encodeURIComponent(title.slice(0, 110))}`);
}

/* ------------------------------------------------------------------ */
/* JSON-LD builders                                                    */
/* ------------------------------------------------------------------ */

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.svg"),
    description: siteConfig.description,
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.lang,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/recherche?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Entite VideoGame pour relier le site au jeu GTA 6. */
export function videoGameLd() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Grand Theft Auto VI",
    alternateName: ["GTA 6", "GTA VI"],
    gamePlatform: ["PlayStation 5", "Xbox Series X|S", "PC"],
    publisher: "Rockstar Games",
    applicationCategory: "Game",
    genre: ["Action-aventure", "Monde ouvert"],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function articleLd(article: Article, path: string) {
  return {
    "@context": "https://schema.org",
    // NewsArticle pour l'actu (eligible aux carrousels/Discover), Article sinon
    "@type": article.category === "actu" ? "NewsArticle" : "Article",
    headline: article.title,
    description: article.metaDescription,
    inLanguage: siteConfig.lang,
    datePublished: article.published,
    dateModified: article.updated,
    image: article.cover ? absoluteUrl(article.cover) : ogImageUrl(article.title),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    author: {
      "@type": "Organization",
      name: article.author || siteConfig.name,
    },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    about: { "@type": "VideoGame", name: "Grand Theft Auto VI" },
  };
}

/** VideoObject pour un embed YouTube (résultats enrichis vidéo). */
export function videoLd(video: { id: string; title: string; uploadDate: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
    uploadDate: video.uploadDate,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
    publisher: {
      "@type": "Organization",
      name: "Rockstar Games",
    },
  };
}

export function faqLd(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function itemListLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.path),
    })),
  };
}
