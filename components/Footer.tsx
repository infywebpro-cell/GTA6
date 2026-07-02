import Link from "next/link";
import { mainNav, footerNav, siteConfig } from "@/lib/site";
import { Container } from "./Container";

export function Footer() {
  const year = 2026;
  return (
    <footer className="mt-24 border-t border-border bg-surface/60">
      {/* Wordmark geant */}
      <div className="overflow-hidden border-b border-border py-8">
        <p
          aria-hidden="true"
          className="select-none whitespace-nowrap text-center font-display text-[16vw] uppercase leading-none tracking-wide text-surface-2 sm:text-[10vw]"
        >
          Vice <span className="text-gradient opacity-90">City</span> 2026
        </p>
      </div>

      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl uppercase tracking-wide text-ink">
            GTA<span className="text-gradient-hot">VI</span>{" "}
            <span className="text-sm text-muted">Guide FR</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-mega text-sand">
            Sections
          </h2>
          <ul className="space-y-2.5 text-sm text-muted">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-vice-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-mega text-sand">
            Le site
          </h2>
          <ul className="space-y-2.5 text-sm text-muted">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-vice-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-mega text-sand">
            Avertissement
          </h2>
          <p className="text-xs leading-relaxed text-muted">
            Site de fans independant. Non affilie a Rockstar Games ni a Take-Two
            Interactive. Artworks et screenshots © Rockstar Games (media kit
            officiel). Carte de Leonida : reconstitution communautaire non
            officielle (GTA VI Mapping Community).
          </p>
        </div>
      </Container>

      <div className="divider-sunset" />
      <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted sm:flex-row">
        <p>
          © {year} {siteConfig.name}. Tous droits reserves.
        </p>
        <p>
          En tant que Partenaire Amazon, ce site percoit un revenu sur les achats
          remplissant les conditions requises.
        </p>
      </Container>
    </footer>
  );
}
