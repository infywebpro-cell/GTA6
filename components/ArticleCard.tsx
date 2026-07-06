import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/content";
import { readingMinutes } from "@/lib/content";
import { categoryMeta } from "@/lib/categories";
import { formatDate } from "@/lib/format";

export function ArticleCard({
  article,
  index,
}: {
  article: Article;
  index?: number;
}) {
  const cat = categoryMeta[article.category];
  const href = `/${article.category}/${article.slug}`;
  return (
    <article className="card-shine group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-vice/70 hover:shadow-glow-pink">
      {article.cover && (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={article.cover}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          {typeof index === "number" && (
            <span
              aria-hidden="true"
              className="absolute right-3 top-2 font-display text-5xl leading-none text-white/25 drop-shadow"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 pt-4">
        <div className="relative mb-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sunset/40 bg-sunset/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-sunset-300">
            <cat.icon className="h-3 w-3" />
            {cat.label}
          </span>
          <ArrowUpRight className="h-4 w-4 text-muted transition-colors group-hover:text-vice" />
        </div>

        <h3 className="relative font-display text-xl uppercase leading-tight tracking-wide text-ink">
          <Link
            href={href}
            className="before:absolute before:inset-0 before:content-[''] group-hover:text-gradient-hot"
          >
            {article.title}
          </Link>
        </h3>
        <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted">
          {article.excerpt}
        </p>
        <div className="relative mt-4 flex items-center gap-3 text-[11px] uppercase tracking-widest text-muted">
          <time dateTime={article.updated}>{formatDate(article.updated)}</time>
          <span aria-hidden="true" className="text-vice">
            ✦
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readingMinutes(article)} min
          </span>
        </div>
      </div>
    </article>
  );
}
