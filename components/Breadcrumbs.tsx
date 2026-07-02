import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export interface Crumb {
  name: string;
  path: string;
}

/** Fil d'ariane visuel + JSON-LD BreadcrumbList. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const full: Crumb[] = [{ name: "Accueil", path: "/" }, ...items];
  return (
    <nav aria-label="Fil d'ariane" className="mb-6 text-sm text-muted">
      <JsonLd data={breadcrumbLd(full)} />
      <ol className="flex flex-wrap items-center gap-1">
        {full.map((c, i) => {
          const last = i === full.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1">
              {last ? (
                <span className="text-ink" aria-current="page">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="transition-colors hover:text-vice-300">
                  {c.name}
                </Link>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5 opacity-50" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
