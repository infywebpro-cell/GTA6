"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { clsx } from "clsx";
import { mainNav } from "@/lib/site";
import { Container } from "./Container";

function Wordmark() {
  return (
    <span className="flex items-baseline gap-2">
      <span className="font-display text-2xl uppercase leading-none tracking-wide text-ink">
        GTA<span className="text-gradient-hot">VI</span>
      </span>
      <span className="hidden text-[10px] font-semibold uppercase tracking-mega text-muted sm:inline">
        Guide FR
      </span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Effet verre progressif : transparent en haut de page, opaque au scroll.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Liseré signature */}
      <div className="h-[3px] w-full bg-gradient-to-r from-sunset via-vice to-haze" />

      <div
        className={clsx(
          "border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300",
          scrolled
            ? "border-border bg-bg/85 shadow-[0_10px_34px_-16px_rgba(0,0,0,0.7)]"
            : "border-transparent bg-bg/40"
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link href="/" onClick={() => setOpen(false)} aria-label="Guide GTA 6, accueil">
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
            {mainNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "text-xs font-semibold uppercase tracking-[0.2em] transition-colors",
                    active ? "text-gradient-hot" : "text-muted hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/recherche"
              aria-label="Recherche"
              className="rounded-full border border-border p-2 text-muted transition-colors hover:border-vice hover:text-ink"
            >
              <Search className="h-4 w-4" />
            </Link>
            <Link
              href="/carte"
              className="btn-sunset hidden rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest text-bg lg:inline-flex"
            >
              La carte
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-border p-2 text-ink lg:hidden"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </Container>
      </div>

      {/* Menu mobile plein écran, typographie affiche */}
      {open && (
        <nav
          className="fixed inset-x-0 bottom-0 top-[67px] z-40 overflow-y-auto bg-bg/97 backdrop-blur-xl lg:hidden"
          aria-label="Navigation mobile"
        >
          <Container className="flex flex-col gap-1 py-10">
            {mainNav.map((item, i) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "flex items-baseline gap-4 border-b border-border/60 py-4 font-display text-4xl uppercase leading-none tracking-wide",
                    active ? "text-gradient" : "text-ink"
                  )}
                >
                  <span className="text-sm text-muted">0{i + 1}</span>
                  {item.label}
                </Link>
              );
            })}
            <p className="mt-8 text-[11px] uppercase tracking-mega text-muted">
              Sortie mondiale : 19 novembre 2026
            </p>
          </Container>
        </nav>
      )}
    </header>
  );
}
