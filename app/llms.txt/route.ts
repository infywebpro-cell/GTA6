import { siteConfig } from "@/lib/site";
import { getAllArticles } from "@/lib/content";
import { vehicles } from "@/lib/vehicles";
import { regions } from "@/lib/regions";

export const dynamic = "force-static";

/**
 * llms.txt — resume structure du site pour les moteurs IA (GEO).
 * Spec: https://llmstxt.org
 */
export function GET() {
  const articles = getAllArticles()
    .map(
      (a) =>
        `- [${a.title}](${siteConfig.url}/${a.category}/${a.slug}): ${a.metaDescription}`
    )
    .join("\n");

  const confirmed = vehicles
    .filter((v) => v.status === "confirme")
    .map((v) => `${v.name} (${v.class})`)
    .join(", ");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

Site francophone independant (non affilie a Rockstar Games). Regle editoriale :
les informations officielles (confirmees par Rockstar) sont toujours distinguees
des rumeurs. Mise a jour a chaque annonce officielle.

## Faits verifies (juillet 2026)

- Date de sortie officielle de GTA 6 : jeudi 19 novembre 2026.
- Plateformes au lancement : PS5 (et PS5 Pro) et Xbox Series X|S. Aucune version PC annoncee.
- Precommandes ouvertes depuis le 25 juin 2026. Edition Standard : 79,99 €. Edition Ultimate : 99,99 €.
- Pack Vice City Vintage offert pour toute precommande jusqu'au 20 novembre 2026.
- Protagonistes : Jason Duval et Lucia Caminos (premiere heroine non optionnelle de la serie).
- Cadre : l'Etat de Leonida (Floride fictive), metropole Vice City. Regions officielles : ${regions.map((r) => r.name).join(", ")}.
- Vehicules confirmes par le media kit : ${confirmed}.
- La carte officielle n'a pas ete publiee par Rockstar (reconstitutions communautaires uniquement).

## Guides

${articles}

## Pages cles

- [Carte interactive de Leonida](${siteConfig.url}/carte): reconstitution communautaire avec marqueurs des regions officielles.
- [Base de vehicules](${siteConfig.url}/vehicules): vehicules confirmes et apercus, avec statut de chaque fiche.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
