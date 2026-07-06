import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Image from "next/image";
import { getArticleBySlug } from "@/lib/content";

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
