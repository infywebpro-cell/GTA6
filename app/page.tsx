import Link from "next/link";
import Image from "next/image";
import {
  Map,
  ArrowRight,
  Check,
  CircleDashed,
  Eye,
  BadgeCheck,
} from "lucide-react";
import { Container } from "@/components/Container";
import { ArticleCard } from "@/components/ArticleCard";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateStrip } from "@/components/AffiliateBox";
import { Countdown } from "@/components/Countdown";
import { JsonLd } from "@/components/JsonLd";
import { Ticker } from "@/components/Ticker";
import { SectionHeading } from "@/components/SectionHeading";
import { PhotoStrip } from "@/components/PhotoStrip";
import { EditionsSection } from "@/components/EditionsSection";
import { RegionTabs } from "@/components/RegionTabs";
import { Reveal } from "@/components/Reveal";
import { getRecentArticles } from "@/lib/content";
import { itemListLd } from "@/lib/seo";
import { characters } from "@/lib/regions";
import { vehicles } from "@/lib/vehicles";
import { clsx } from "clsx";

const OFFICIEL = [
  { label: "Sortie le 19 novembre 2026", detail: "Date confirmee par Rockstar Games" },
  { label: "PS5 & Xbox Series X|S", detail: "Plateformes annoncees au lancement" },
  { label: "Precommandes ouvertes", detail: "Depuis le 25 juin 2026" },
  { label: "Standard 79,99 € · Ultimate 99,99 €", detail: "Deux editions officielles" },
  { label: "Pack Vice City Vintage offert", detail: "Pour toute precommande avant le 20 novembre" },
  { label: "Jason & Lucia", detail: "Duo de protagonistes jouables" },
  { label: "Vice City, Etat de Leonida", detail: "Le cadre officiel du jeu" },
];

const A_CONFIRMER = [
  { label: "Version PC", detail: "Non annoncee — attendue apres les consoles" },
  { label: "Mode en ligne", detail: "Successeur de GTA Online non detaille" },
  { label: "Carte officielle", detail: "Non publiee — reconstitutions communautaires seulement" },
  { label: "Taille exacte de la carte", detail: "Comparaison GTA 5 non officielle" },
];

const TICKER_ITEMS = [
  "Sortie mondiale — 19 novembre 2026",
  "Precommandes ouvertes",
  "Standard 79,99 €",
  "Ultimate 99,99 €",
  "PS5 · Xbox Series X|S",
  "Vice City",
  "Etat de Leonida",
  "Jason & Lucia",
];

export default function HomePage() {
  const recent = getRecentArticles(7);
  const [feature, ...rest] = recent;
  const garage = vehicles.filter((v) => v.status === "confirme").slice(0, 4);

  return (
    <>
      <JsonLd
        data={itemListLd(
          recent.map((a) => ({ name: a.title, path: `/${a.category}/${a.slug}` }))
        )}
      />

      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Key art officiel Rockstar (paysage desktop / portrait mobile) */}
        <picture>
          <source media="(max-width: 640px)" srcSet="/images/hero-keyart-916.jpg" />
          <img
            src="/images/hero-keyart-169.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
        </picture>
        {/* Voiles pour la lisibilite */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/20 to-bg"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-bg/60 via-transparent to-transparent"
          aria-hidden="true"
        />

        <Container className="relative flex h-[min(92svh,1000px)] min-h-[640px] flex-col justify-center py-16">
          <p className="text-[11px] font-bold uppercase tracking-mega text-sand sm:text-xs">
            Le guide francais — non officiel
          </p>

          <h1 className="mt-4 font-display uppercase leading-[0.85] tracking-wide">
            <span className="block text-7xl text-ink drop-shadow-[0_4px_24px_rgba(13,5,23,0.6)] sm:text-9xl lg:text-[10rem]">
              GTA<span className="text-gradient">VI</span>
            </span>
            <span className="mt-3 block text-2xl text-ink/95 sm:text-4xl">
              Vice City vous attend
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/85 sm:text-lg">
            Date de sortie, carte de Leonida, vehicules, personnages, astuces :
            tout GTA 6 verifie et en francais — et des le jour J, les soluces
            completes.
          </p>

          <div className="mt-10">
            <Countdown />
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-mega text-ink/70">
              19 novembre 2026 · PS5 · Xbox Series X|S · Precommandes ouvertes
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/carte"
              className="btn-sunset inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-bg shadow-glow-pink"
            >
              <Map className="h-4 w-4" /> Explorer la carte
            </Link>
            <Link
              href="/guides/precommande-gta-6-editions-prix"
              className="inline-flex items-center gap-2 rounded-full border border-sand/50 bg-bg/50 px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-sand backdrop-blur transition-colors hover:border-sand"
            >
              Precommander — le guide
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 rounded-full border border-ink/30 bg-bg/50 px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-ink backdrop-blur transition-colors hover:border-vice"
            >
              Les guides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <Ticker items={TICKER_ITEMS} />

      <PhotoStrip />

      {/* ====================== CE QUI EST OFFICIEL ====================== */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            num="01"
            kicker="Zero rumeur, zero intox"
            title="Ce qui est officiel"
            action={{ label: "Toute l'actu", href: "/actu" }}
          />
          <Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-border bg-surface p-6">
              <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-mega text-emerald-300">
                <Check className="h-4 w-4" /> Confirme par Rockstar
              </p>
              <ul className="divide-y divide-border/70">
                {OFFICIEL.map((f) => (
                  <li key={f.label} className="flex items-start gap-3 py-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                    <div>
                      <p className="font-semibold text-ink">{f.label}</p>
                      <p className="text-xs text-muted">{f.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <div className="rounded-3xl border border-border bg-surface p-6">
                <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-mega text-haze-300">
                  <CircleDashed className="h-4 w-4" /> En attente d'annonce
                </p>
                <ul className="divide-y divide-border/70">
                  {A_CONFIRMER.map((f) => (
                    <li key={f.label} className="flex items-start gap-3 py-3">
                      <CircleDashed className="mt-0.5 h-4 w-4 shrink-0 text-haze-300" />
                      <div>
                        <p className="font-semibold text-ink">{f.label}</p>
                        <p className="text-xs text-muted">{f.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative flex-1 overflow-hidden rounded-3xl border border-border">
                <Image
                  src="/images/cover-art.jpg"
                  alt="Jaquette officielle de GTA VI"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/40 to-transparent p-4 pt-12">
                  <p className="text-[10px] font-bold uppercase tracking-mega text-sand">
                    Jaquette officielle — © Rockstar Games
                  </p>
                </div>
              </div>
            </div>
          </div>
          </Reveal>
        </Container>
      </section>

      <EditionsSection num="02" />

      <Container>
        <AdSlot slot="" label="Publicite" />
      </Container>

      {/* ============================ DOSSIERS ============================ */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            num="03"
            kicker="Guides & actu verifies"
            title="Les dossiers"
            action={{ label: "Tout voir", href: "/guides" }}
          />

          {feature && (
            <Reveal>
            <Link
              href={`/${feature.category}/${feature.slug}`}
              className="group relative mb-6 block overflow-hidden rounded-3xl border border-border transition-all hover:border-vice/70"
            >
              {feature.cover && (
                <Image
                  src={feature.cover}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/60 to-bg/10" />
              <div className="relative p-8 sm:p-12 sm:pr-[38%]">
                <p className="text-[11px] font-bold uppercase tracking-mega text-sand">
                  A la une
                </p>
                <h3 className="mt-3 max-w-2xl font-display text-3xl uppercase leading-none tracking-wide text-ink group-hover:text-gradient sm:text-5xl">
                  {feature.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  {feature.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-vice-300">
                  Lire le dossier{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
            </Reveal>
          )}

          <Reveal delay={0.08}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((a, i) => (
                <ArticleCard key={a.slug} article={a} index={i + 1} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============================= LE DUO ============================= */}
      <section className="border-y border-border bg-surface/40 py-16 sm:py-20">
        <Container>
          <SectionHeading
            num="04"
            kicker="Les protagonistes"
            title="Jason & Lucia"
            action={{ label: "Leur histoire", href: "/guides/personnages-gta-6-jason-lucia" }}
          />
          <Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                name: "Jason",
                full: "Jason Duval",
                desc:
                  "S'il veut vivre facile, il va devoir se salir les mains. Ancien de l'armee pris dans les combines des Keys, embarque dans une cavale qui le depasse.",
                image: "/images/jason-lucia.jpg",
                position: "object-[72%_20%]",
              },
              {
                name: "Lucia",
                full: "Lucia Caminos",
                desc:
                  "Premiere protagoniste feminine de la serie principale. Sortie de prison, elle joue les regles a sa facon — et ne compte plus jamais y retourner.",
                image: "/images/jason-lucia-motel.jpg",
                position: "object-[45%_30%]",
              },
            ].map((c) => (
              <Link
                key={c.name}
                href="/guides/personnages-gta-6-jason-lucia"
                className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-3xl border border-border transition-all hover:border-vice/70 hover:shadow-glow-pink"
              >
                <Image
                  src={c.image}
                  alt={`Artwork officiel de ${c.full}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={clsx(
                    "object-cover transition-transform duration-500 group-hover:scale-[1.04]",
                    c.position
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                <div className="relative p-7">
                  <p className="text-[11px] font-bold uppercase tracking-mega text-sand">
                    Protagoniste — {c.full}
                  </p>
                  <h3 className="mt-1 font-display text-5xl uppercase tracking-wide text-ink sm:text-6xl">
                    {c.name}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/80">
                    {c.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          </Reveal>
          <p className="mt-4 text-center text-xs uppercase tracking-widest text-muted">
            Un duo criminel a la Bonnie & Clyde — artworks officiels © Rockstar Games
          </p>
        </Container>
      </section>

      {/* ========================== LES FIGURES =========================== */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            num="05"
            kicker="Les figures de Leonida"
            title="Le casting"
          />
        </Container>
        <div className="overflow-x-auto pb-4 [scrollbar-width:thin]">
          <div className="mx-auto flex w-max gap-4 px-4 sm:px-6 lg:px-[max(1rem,calc((100vw-72rem)/2))]">
            {characters.map((c) => (
              <div
                key={c.id}
                className="group relative flex h-80 w-60 shrink-0 flex-col justify-end overflow-hidden rounded-3xl border border-border"
              >
                <Image
                  src={c.image}
                  alt={`Artwork officiel de ${c.name}`}
                  fill
                  sizes="240px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
                <div className="relative p-4">
                  <h3 className="font-display text-2xl uppercase leading-none tracking-wide text-ink">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-xs text-ink/75">{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Container>
          <p className="mt-2 text-center text-xs uppercase tracking-widest text-muted">
            Personnages officiels devoiles par Rockstar — artworks © Rockstar Games
          </p>
        </Container>
      </section>

      {/* ============================ LEONIDA ============================ */}
      <section className="border-t border-border py-16 sm:py-20">
        <Container>
          <SectionHeading
            num="06"
            kicker="L'Etat, du strip aux marais"
            title="Leonida"
            action={{ label: "Carte interactive", href: "/carte" }}
          />
          <Reveal>
            <RegionTabs />
          </Reveal>
        </Container>
      </section>

      {/* ============================ LE GARAGE ============================ */}
      <section className="border-t border-border py-16 sm:py-20">
        <Container>
          <SectionHeading
            num="07"
            kicker="Noms officiels confirmes"
            title="Le garage"
            action={{ label: "Tous les vehicules", href: "/vehicules" }}
          />
          <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {garage.map((v) => (
              <Link
                key={v.slug}
                href={`/vehicules/${v.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-vice/70 hover:shadow-glow-pink"
              >
                {v.image && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={v.image}
                      alt={`Screenshot officiel — ${v.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                    />
                    <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-black/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-emerald-300 backdrop-blur">
                      <BadgeCheck className="h-3 w-3" /> Confirme
                    </span>
                  </div>
                )}
                <div className="p-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sand">
                    {v.class}
                  </span>
                  <h3 className="mt-1.5 font-display text-lg uppercase leading-tight tracking-wide text-ink group-hover:text-gradient-hot">
                    {v.name}
                  </h3>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted">
                    <Eye className="h-3 w-3 text-vice" /> {v.seenIn}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          </Reveal>
          <Link
            href="/vehicules"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-vice-300 hover:text-vice sm:hidden"
          >
            Tous les vehicules <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </section>

      <Container className="pb-4">
        <AffiliateStrip
          ids={["ps5-slim", "dualsense", "pulse-elite", "carte-psn"]}
          title="Pret pour le 19 novembre ?"
        />
        <AdSlot slot="" label="Publicite" className="mb-10" />
      </Container>
    </>
  );
}
