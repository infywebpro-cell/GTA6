# Guide GTA 6 — guidegta6.fr

> Stratégie SEO & calendrier éditorial : voir [STRATEGIE-SEO.md](STRATEGIE-SEO.md)

Site de niche SEO francophone dédié à **Grand Theft Auto VI** : actu, guides, soluces,
carte interactive de Leonida, base de véhicules et astuces. Pensé pour capter le trafic
pré‑lancement (**sortie officielle : 19 novembre 2026**) et monétisé via **Google AdSense**
et l'**affiliation Amazon**.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 3** — DA « Vice City sunset » façon site officiel Rockstar :
  palette violet → rose → orange, typo affiche (Anton), grain de film,
  ticker défilant, sections numérotées
- **Visuels officiels Rockstar** (media kit) dans `public/images/` : key art,
  jaquette, artworks Jason/Lucia + 6 personnages, 6 régions, screenshots
  véhicules. Crédits « © Rockstar Games » affichés (site de fans, non affilié)
- **Carte de Leonida** : reconstitution communautaire YANIS v13 (créditée),
  marqueurs positionnés sur la vraie géographie — remplacée par la carte
  officielle dès sa publication
- **react-markdown** pour le contenu éditorial
- Génération 100 % statique (SSG) → CWV excellents, hébergement gratuit sur Vercel

> ⚠️ Ne jamais lancer `npm run build` pendant que `npm run dev` tourne :
> les deux partagent `.next` (CSS 404 sinon). Stopper le dev, builder,
> `rm -rf .next`, relancer.

## Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm start        # sert le build
```

## Variables d'environnement

Copier `.env.example` vers `.env.local` et remplir :

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canonique de prod (ex. `https://guide-gta6.fr`) |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | ID AdSense `ca-pub-…` (vide → emplacements placeholder) |
| `NEXT_PUBLIC_AMAZON_TAG` | Tag Partenaires Amazon (ex. `guidegta6-21`) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Code de vérification Google Search Console |

Tant qu'AdSense n'est pas configuré, des blocs « emplacement publicitaire » s'affichent
à la place des vraies pubs (rien ne casse).

## Structure

```
app/                  Routes (App Router)
  page.tsx            Accueil (hero + compte à rebours + derniers articles)
  [category]/         Pages catégorie + articles : /guides/<slug>, /actu/<slug>…
  carte/              Carte interactive de Leonida
  vehicules/          Base de véhicules + fiches
  og/route.tsx        Image OpenGraph générée dynamiquement
  sitemap.ts robots.ts manifest.ts
components/            Header, Footer, cartes, MapExplorer, AdSlot, AffiliateBox…
content/articles.ts   ⭐ Les 8 articles piliers (modifier/ajouter ici)
lib/                  site, seo (metadata + JSON‑LD), content, vehicles, map, affiliate
```

## Ajouter / modifier du contenu

- **Articles** : éditer `content/articles.ts` (un objet `Article` par article). Le slug
  forme l'URL `/<catégorie>/<slug>`. Catégories : `actu`, `guides`, `soluces`, `astuces`.
- **Véhicules** : `lib/vehicles.ts`.
- **Points de carte** : `lib/map.ts`.
- **Produits Amazon** : `lib/affiliate.ts` (ajouter les ASIN réels quand connus).

## SEO intégré

- Metadata + canonical + OpenGraph/Twitter par page (`lib/seo.ts`)
- JSON‑LD : Organization, WebSite (+ SearchAction), VideoGame, Article, BreadcrumbList,
  FAQPage, ItemList
- `sitemap.xml` + `robots.txt` + `manifest` automatiques
- Images OG générées à la volée (`/og?title=…`)
- Honnêteté éditoriale : distinction officiel / rapporté / à confirmer (signal E‑E‑A‑T)

## À faire avant la mise en ligne

1. Acheter le domaine **guidegta6.fr** (≈ 7 €/an — vérifié disponible le 02/07/2026).
2. Déployer sur **Vercel** (import du repo, build auto).
3. Renseigner les placeholders légaux : `app/mentions-legales`, `app/confidentialite`,
   `app/contact` (éditeur, hébergeur, e‑mail).
4. Créer le compte **Google Search Console** et soumettre le sitemap.
5. Demander la validation **AdSense** et le programme **Partenaires Amazon**, puis
   remplir les variables d'env.
6. Ajouter une bannière de **consentement cookies (CMP)** avant pubs personnalisées (UE).

> Site de fans indépendant. Non affilié à Rockstar Games ni Take‑Two Interactive.
