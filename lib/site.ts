/**
 * Configuration centrale du site. Tout ce qui touche à la marque, au domaine
 * et à la monetisation passe par ici pour rester modifiable en un seul endroit.
 */

export const siteConfig = {
  name: "Guide GTA 6",
  shortName: "GuideGTA6",
  domain: "guidegta6.fr",
  // Surcharge possible via la variable d'env (utile en preview / Vercel)
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://guidegta6.fr").replace(/\/$/, ""),
  locale: "fr_FR",
  lang: "fr",
  description:
    "Guide GTA 6 : la référence francaise sur Grand Theft Auto VI. Date de sortie, carte interactive de Leonida, base de véhicules, soluces, astuces et codes.",
  tagline: "date de sortie, carte, soluces et véhicules",
  twitter: "@guidegta6",
  // Monetisation (vide tant que non configure -> placeholders)
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
  amazonTag: process.env.NEXT_PUBLIC_AMAZON_TAG || "",
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Actu", href: "/actu" },
  { label: "Guides", href: "/guides" },
  { label: "Soluces", href: "/soluces" },
  { label: "Carte", href: "/carte" },
  { label: "Véhicules", href: "/vehicules" },
  { label: "Astuces", href: "/astuces" },
];

export const footerNav: NavItem[] = [
  { label: "A propos", href: "/a-propos" },
  { label: "Mentions legales", href: "/mentions-legales" },
  { label: "Confidentialite", href: "/confidentialite" },
  { label: "Contact", href: "/contact" },
];

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${siteConfig.url}${path.startsWith("/") ? "" : "/"}${path}`;
}
