import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Titre de section editorial : numéro géant + kicker + titre affiche. */
export function SectionHeading({
  num,
  kicker,
  title,
  action,
}: {
  num: string;
  kicker: string;
  title: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div className="flex items-baseline gap-4 sm:gap-6">
        <span className="font-display text-5xl leading-none text-gradient sm:text-7xl">
          {num}
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-mega text-sand">
            {kicker}
          </p>
          <h2 className="mt-1 font-display text-3xl uppercase leading-none tracking-wide sm:text-5xl">
            {title}
          </h2>
        </div>
      </div>
      {action && (
        <Link
          href={action.href}
          className="hidden shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-widest text-vice-300 hover:text-vice sm:inline-flex"
        >
          {action.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
