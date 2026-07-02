import Link from "next/link";
import Image from "next/image";
import { Check, Gift, ArrowRight } from "lucide-react";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const STANDARD = [
  "Le jeu complet Grand Theft Auto VI",
  "PS5, PS5 Pro et Xbox Series X|S",
  "Mise a niveau vers l'Ultimate possible",
];

const ULTIMATE = [
  "Le jeu complet Grand Theft Auto VI",
  "Vapid Dominator Buggy (1967) exclusive",
  "Garage Paradise a Watson Bay",
  "Contenus exclusifs debloques au fil de l'histoire",
];

/** Section éditions & prix officiels (précommandes ouvertes). */
export function EditionsSection({ num }: { num: string }) {
  return (
    <section className="border-t border-border py-16 sm:py-20">
      <Container>
        <SectionHeading
          num={num}
          kicker="Précommandes ouvertes depuis le 25 juin"
          title="Les éditions"
          action={{ label: "Guide précommande", href: "/guides/precommande-gta-6-editions-prix" }}
        />

        <Reveal>
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Standard */}
          <div className="flex flex-col rounded-3xl border border-border bg-surface p-7">
            <p className="text-[11px] font-bold uppercase tracking-mega text-muted">
              Edition Standard
            </p>
            <p className="mt-3 font-display text-6xl uppercase tracking-wide text-ink">
              79,99&nbsp;€
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {STANDARD.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/guides/precommande-gta-6-editions-prix"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:border-vice"
            >
              Tout savoir <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Ultimate */}
          <div className="relative flex flex-col overflow-hidden rounded-3xl border border-vice/50 bg-surface shadow-glow-pink">
            <div className="relative h-40 sm:h-44">
              <Image
                src="/images/veh-vapid-buggy.jpg"
                alt="Vapid Dominator Buggy (1967) — exclusivite de l'édition Ultimate"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
              <span className="btn-sunset absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-bg">
                La plus complète
              </span>
            </div>
            <div className="flex flex-1 flex-col p-7 pt-3">
              <p className="text-[11px] font-bold uppercase tracking-mega text-sand">
                Edition Ultimate
              </p>
              <p className="mt-3 font-display text-6xl uppercase tracking-wide">
                <span className="text-gradient">99,99&nbsp;€</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {ULTIMATE.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-vice-300" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/guides/precommande-gta-6-editions-prix"
                className="btn-sunset mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-widest text-bg"
              >
                Comparer les éditions <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bonus précommande */}
        <div className="mt-5 flex flex-col items-start gap-3 rounded-3xl border border-sand/30 bg-sand/5 p-5 sm:flex-row sm:items-center backdrop-blur">
          <span className="inline-flex items-center gap-2 rounded-full border border-sand/40 bg-sand/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sand">
            <Gift className="h-3.5 w-3.5" /> Bonus officiel
          </span>
          <p className="text-sm text-muted">
            <strong className="text-ink">Pack Vice City Vintage offert</strong>{" "}
            pour toute précommande jusqu'au 20 novembre 2026 — Vapid Stanier
            vintage, tenues et motifs d'armes rétro, sur toutes les éditions.
          </p>
        </div>
        </Reveal>
      </Container>
    </section>
  );
}
