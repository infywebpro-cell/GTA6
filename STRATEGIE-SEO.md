# Stratégie SEO — guidegta6.fr

> Objectif : **#1 sur les SERP françaises GTA 6** au moment de la sortie (19 nov. 2026),
> en capitalisant sur la fenêtre pré-lancement où les gros médias n'ont pas encore
> saturé les requêtes « guide/soluce ».

## 1. Domaine & marque

- **Domaine principal : `guidegta6.fr`** (✅ vérifié disponible via RDAP AFNIC le 02/07/2026, ~7 €/an).
  - = la requête naturelle FR « guide gta 6 », .fr = signal géo France.
  - Distinct dès la 1ʳᵉ lettre du concurrent `gta6guide.fr` (ordre inversé).
- **Défensif conseillé (optionnel, ~14 €/an)** : `gta6-guide.fr` + `carte-gta6.fr` (dispo aussi) → redirections 301.
- ⚠️ « GTA » est une marque Take-Two : les fan-sites EMD sont tolérés de longue date
  (gta6.fr, gta6guide.fr, gta-6-france.fr existent), mais un transfert UDRP reste
  théoriquement possible. Le disclaimer « non officiel » est déjà partout sur le site.
- Après achat : configurer sur Vercel, `NEXT_PUBLIC_SITE_URL=https://guidegta6.fr`,
  boîte mail `contact@guidegta6.fr` (config déjà alignée dans le code).

## 2. Paysage concurrentiel (constat 02/07/2026)

| Concurrent | Force | Faiblesse exploitable |
|---|---|---|
| jeuxvideo.com, Millenium, Gamekult | Autorité de domaine énorme | Pages GTA 6 génériques, pas de profondeur dédiée |
| gta6guide.fr | EMD, se dit « site FR #1 » | Jeune aussi — la course est ouverte |
| gta-6-france.fr / gta6france.fr | Actifs, contenus précommande | Design daté, peu de pages outils |
| rockstarmag.fr | Communauté, X actif | Média généraliste Rockstar, pas un guide structuré |

**Notre angle différenciant** : (1) outils interactifs (carte, garage filtrable) que
personne n'a en FR, (2) honnêteté officiel/rumeur = E-E-A-T, (3) visuels officiels
du media kit, (4) vitesse (SSG, CWV verts).

## 3. Acquis techniques (fait ✅)

- Metadata + canonical + OG/Twitter par page, OG dynamiques, images media kit
- JSON-LD : Organization, WebSite+SearchAction, VideoGame, **NewsArticle** (actu) /
  Article, BreadcrumbList, **FAQPage** (chaque article), ItemList
- `sitemap.xml` (lastmod réels) · `robots.txt` avec **crawlers IA autorisés**
  (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) · **`llms.txt`** (GEO) ·
  **`feed.xml`** RSS · manifest PWA
- Liens internes des articles résolus par slug (zéro 404 interne)
- 100 % statique : LCP/CLS excellents d'office ; fonts self-hostées

### Reste à faire au lancement du domaine (jour J de l'achat)
1. Déployer sur Vercel + domaine + HTTPS.
2. **Google Search Console** : vérifier la propriété, soumettre `sitemap.xml`.
3. Bing Webmaster Tools (import GSC en 1 clic) — active aussi Copilot.
4. Demander l'indexation manuelle des 10 URLs clés dans GSC.
5. Analytics (Plausible ou GA4) + suivi de positions (GSC suffit au début).

## 4. Architecture de contenu cible

```
/                    hub « tout GTA 6 » (fait)
/actu/…              news datées — fraîcheur + Discover (NewsArticle)
/guides/…            evergreen (précommande, plateformes, personnages…)
/soluces/…           LA machine post-lancement (missions, 100 %, trophées)
/astuces/…           codes, argent, secrets
/carte               outil + à terme /carte/<lieu> (pSEO lieux)
/vehicules/<slug>    pSEO véhicules (20 fiches, extensible à 200+ post-launch)
```

**Règle d'or interne** : chaque article lie ≥ 3 pages internes (déjà le cas),
chaque page outil lie vers les articles piliers.

## 5. Calendrier éditorial

### Phase 1 — Juillet-août 2026 (fondations, 2-3 art./sem.)
| Contenu | Requête cible | Type |
|---|---|---|
| Config PC : ce qu'on sait + specs probables | gta 6 pc config | guides |
| GTA 6 Online : tout ce qui est confirmé | gta 6 online | guides |
| Taille de la carte : Leonida vs GTA 5 | taille carte gta 6 | carte |
| Trailer 1 & 2 décryptés image par image | gta 6 trailer | actu |
| Toutes les éditions comparées (tableau) | gta 6 edition ultimate | guides |
| Peut-on précommander moins cher ? (cartes PSN) | gta 6 pas cher | guides + affil. |
| Histoire de Vice City (2002 → 2026) | vice city | guides |
| Real Dimez, Boobie Ike… : le casting complet | personnages gta 6 | guides |
| Pages lieux : /carte/vice-city, /carte/leonida-keys… (6 pages pSEO) | vice city gta 6, leonida keys | carte |

### Phase 2 — Septembre-octobre (montée en pression, 3/sem.)
- Chaque annonce Rockstar = article actu **dans l'heure** (fraîcheur = 80 % de la bataille Discover).
- « Combien d'heures pour finir GTA 6 ? », « GTA 6 sur PS4 ? », « GTA+ et GTA 6 »,
  « précharger GTA 6 », « GTA 6 crossplay ? » — les requêtes questions explosent à J-60.
- Mise à jour datée des piliers (dateModified visible = CTR).

### Phase 3 — Semaine du 19 novembre (blitz, quotidien)
- **J-7 → J-1** : « heure de déblocage par pays », « taille du download », « installer/précharger », « test presse (méta-review) ».
- **Jour J et J+** : soluce mission 1 → N publiées au fil de la progression (2-4/jour),
  « argent rapide », « toutes les voitures » (fusion garage), « carte complète officielle »
  (remplacement de la carte communautaire = gros pic), trophées/succès.
- C'est ici que le site gagne ou perd : les requêtes « soluce mission X » n'ont
  AUCUNE concurrence installée avant la sortie.

### Phase 4 — Décembre+ (fond de catalogue)
- pSEO missions (une URL/mission), collectibles, 100 %, guides Online au fil des MAJ.

## 6. E-E-A-T & GEO (IA)

- Encadré « Ce qui est officiel / En attente » sur l'accueil (fait) → citable tel quel
  par les IA ; `llms.txt` expose les faits vérifiés (fait).
- Sur chaque article : source Rockstar Newswire liée + date de mise à jour (fait).
- À ajouter progressivement : page auteur avec bio, captures maison dès la sortie
  (expérience de première main = E de E-E-A-T).

## 7. Netlinking & distribution (0 € budget)

1. **Reddit** r/GTA6, r/jeuxvideo (partager la carte interactive — les outils se partagent seuls).
2. **Forums** jeuxvideo.com (topic GTA 6 = le plus actif de France) — signature/citations utiles, pas de spam.
3. **Discord** communautés GTA FR : proposer la carte comme ressource épinglée.
4. **X/Twitter** : compte @guidegta6, publier les infographies (éditions, countdown) — Rockstar Mag repartage volontiers la communauté.
5. **YouTube Shorts/TikTok** : 30 s « la carte de GTA 6 expliquée » → lien bio (les vidéastes FR cherchent des sources : être LA source citée).
6. Wikipédia FR (article GTA VI) : lien en « Liens externes » si le contenu devient référence (à tenter après 3 mois).

## 8. KPI & pilotage

| Échéance | Objectif |
|---|---|
| J+30 (août) | 100 % des pages indexées, premières impressions GSC |
| J+90 (oct.) | Top 10 sur 5 requêtes moyenne traîne (« édition ultimate », « leonida keys »…) |
| Sortie (19/11) | Top 3 « soluce gta 6 » + missions ; pic Discover via actu |
| J+180 (jan. 27) | Top 3 « guide gta 6 », 50k clics/mois organiques |

Rituel hebdo : GSC → requêtes à CTR faible/position 5-15 → réécrire title/meta →
resoumettre. C'est le levier n°1 les 6 premiers mois.
