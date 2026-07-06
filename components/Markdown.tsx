import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Image from "next/image";
import { getArticleBySlug } from "@/lib/content";
import { slugify } from "@/lib/slugify";

/** Texte brut d'un sous-arbre React (pour calculer l'ancre d'un titre). */
function nodeText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (typeof node === "object" && "props" in node) {
    return nodeText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

/**
 * Resout les liens internes des articles.
 * Les corps Markdown referencent d'autres contenus par slug nu
 * (ex: "date-de-sortie-gta-6") : on reconstruit l'URL canonique
 * /<catégorie>/<slug>. Un slug inconnu est rendu en texte simple
 * (zero lien casse pour le crawl).
 */
function resolveHref(href: string): string | null {
  if (/^(https?:)?\/\//.test(href) || href.startsWith("mailto:")) return href;
  if (href.startsWith("/")) return href;
  if (href.startsWith("#")) return href;
  const slug = href.replace(/\/$/, "");
  // Pages fonctionnelles referencees par nom court
  if (slug === "carte" || slug === "vehicules") return `/${slug}`;
  const article = getArticleBySlug(slug);
  return article ? `/${article.category}/${article.slug}` : null;
}

/** Rendu Markdown (GFM) avec la typographie du site (.prose-gta). */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-gta">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Ancres stables sur les H2 : cibles du sommaire d'article.
          h2({ children: headingChildren }) {
            return <h2 id={slugify(nodeText(headingChildren))}>{headingChildren}</h2>;
          },
          a({ href, children: linkChildren }) {
            const resolved = href ? resolveHref(href) : null;
            if (!resolved) return <strong>{linkChildren}</strong>;
            if (/^https?:\/\//.test(resolved)) {
              return (
                <a href={resolved} target="_blank" rel="noopener">
                  {linkChildren}
                </a>
              );
            }
            return <Link href={resolved}>{linkChildren}</Link>;
          },
          // Images locales optimisées (portraits officiels dans les articles).
          img({ src, alt }) {
            if (!src || typeof src !== "string") return null;
            return (
              <span className="my-5 block overflow-hidden rounded-2xl border border-border">
                <Image
                  src={src}
                  alt={alt ?? ""}
                  width={900}
                  height={1100}
                  className="h-auto w-full object-cover"
                />
                {alt && (
                  <span className="block bg-surface px-4 py-2 text-xs uppercase tracking-widest text-muted">
                    {alt} · © Rockstar Games
                  </span>
                )}
              </span>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
