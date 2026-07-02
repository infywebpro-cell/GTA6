import { siteConfig } from "./site";

export interface AmazonProduct {
  id: string;
  name: string;
  category: string;
  pitch: string;
  /** Requete de recherche Amazon.fr (fallback tant qu'on n'a pas d'ASIN). */
  query: string;
  /** ASIN précis si connu (prioritaire sur la requete). */
  asin?: string;
  priceHint?: string;
}

/**
 * Construit un lien d'affiliation Amazon.fr.
 * - Si un ASIN est fourni : lien produit direct /dp/ASIN.
 * - Sinon : page de recherche Amazon.fr sur la requete.
 * Le tag d'affiliation n'est ajoute que s'il est configure.
 */
export function amazonLink(product: Pick<AmazonProduct, "query" | "asin">): string {
  const tag = siteConfig.amazonTag;
  const base = product.asin
    ? `https://www.amazon.fr/dp/${product.asin}`
    : `https://www.amazon.fr/s?k=${encodeURIComponent(product.query)}`;
  if (!tag) return base;
  return `${base}${base.includes("?") ? "&" : "?"}tag=${encodeURIComponent(tag)}`;
}

/**
 * Catalogue d'affiliation (issu de la recherche, a affiner avec des ASIN reels).
 * GTA 6 sort le 19 novembre 2026 sur PS5 / Xbox Series : les produits ci-dessous
 * preparent les joueurs au lancement.
 */
export const amazonProducts: AmazonProduct[] = [
  {
    id: "ps5-slim",
    name: "Console PS5 Slim (lecteur de disque)",
    category: "Console",
    pitch: "La console de référence pour jouer a GTA 6 des le 19 novembre 2026.",
    query: "PS5 Slim console lecteur disque",
    priceHint: "~ 499 €",
  },
  {
    id: "ps5-pro",
    name: "Console PS5 Pro",
    category: "Console",
    pitch: "Pour viser la meilleure image et le meilleur framerate dans Vice City.",
    query: "PS5 Pro console",
  },
  {
    id: "dualsense",
    name: "Manette DualSense",
    category: "Manette",
    pitch: "Gachettes adaptatives et retour haptique : la conduite GTA 6 prend vie.",
    query: "manette DualSense PS5 sans fil",
    priceHint: "~ 69 €",
  },
  {
    id: "dualsense-edge",
    name: "Manette DualSense Edge",
    category: "Manette",
    pitch: "La manette pro personnalisable pour le futur mode en ligne.",
    query: "manette DualSense Edge PS5",
  },
  {
    id: "dualsense-edition",
    name: "DualSense édition limitee",
    category: "Manette",
    pitch: "Un coloris exclusif pour accompagner votre partie de GTA 6.",
    query: "manette DualSense PS5 édition limitee coloris",
  },
  {
    id: "pulse-elite",
    name: "Casque sans fil Sony PULSE Elite",
    category: "Casque gaming",
    pitch: "Audio immersif pour profiter de la bande-son et du sound design de Leonida.",
    query: "casque Sony PULSE Elite PS5",
  },
  {
    id: "pulse-3d",
    name: "Casque sans fil Sony PULSE 3D",
    category: "Casque gaming",
    pitch: "Le casque PS5 au meilleur rapport qualite-prix pour l'audio 3D.",
    query: "casque Sony PULSE 3D PS5 sans fil",
  },
  {
    id: "casque-filaire",
    name: "Casque gaming filaire (SteelSeries / Razer)",
    category: "Casque gaming",
    pitch: "Micro clair et son précis pour le online, sans souci de batterie.",
    query: "casque gaming PS5 micro SteelSeries Arctis",
  },
  {
    id: "secretlab-titan",
    name: "Siège gaming Secretlab TITAN Evo",
    category: "Siege gaming",
    pitch: "Les sessions GTA 6 sont longues : le confort haut de gamme pour le dos.",
    query: "Secretlab TITAN Evo siège gaming",
  },
  {
    id: "noblechairs",
    name: "Siège gaming Noblechairs",
    category: "Siege gaming",
    pitch: "Une alternative milieu de gamme solide pour jouer confortablement.",
    query: "Noblechairs siège gaming",
  },
  {
    id: "logitech-g29",
    name: "Volant Logitech G29 Driving Force",
    category: "Volant",
    pitch: "Pour vivre les courses de Vice City avec un vrai retour de force.",
    query: "Logitech G29 volant PS5 pedalier",
  },
  {
    id: "thrustmaster-t300",
    name: "Volant Thrustmaster T300 RS GT",
    category: "Volant",
    pitch: "Un cran au-dessus pour les passionnes de conduite.",
    query: "Thrustmaster T300 RS GT volant PS5",
  },
  {
    id: "carte-psn",
    name: "Carte PlayStation Store (PSN)",
    category: "Carte PSN",
    pitch: "Pour précommander GTA 6 ou recharger sans carte bancaire.",
    query: "carte PlayStation Store PSN 50 euros code",
  },
  {
    id: "ecran-4k",
    name: "Écran gaming 4K 120Hz HDMI 2.1",
    category: "Ecran",
    pitch: "Pour exploiter pleinement la PS5 Pro : 4K, 120 Hz, HDMI 2.1.",
    query: "écran gaming 4K 120Hz HDMI 2.1 OLED PS5",
  },
  {
    id: "ssd-ps5",
    name: "SSD NVMe M.2 pour PS5 (avec dissipateur)",
    category: "Stockage",
    pitch: "GTA 6 sera volumineux : ajoutez de l'espace de stockage rapide.",
    query: "SSD NVMe PS5 WD_BLACK SN850P dissipateur 2To",
  },
];
