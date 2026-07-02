import { regions, type Region } from "./regions";
import { mapMarkers } from "./map";

/**
 * Contenu editorial des pages lieux (/carte/<lieu>) — pSEO.
 * Chaque lieu = contenu unique (~250 mots), points d'interet et FAQ,
 * pour eviter tout contenu "thin". Regle : officiel vs rapporte.
 */

export interface Lieu extends Region {
  /** Paragraphes du corps de page (contenu unique). */
  body: string[];
  pois: string[];
  faq: { q: string; a: string }[];
  metaDescription: string;
}

const LIEUX_CONTENT: Record<
  string,
  Pick<Lieu, "body" | "pois" | "faq" | "metaDescription">
> = {
  "vice-city": {
    metaDescription:
      "Vice City dans GTA 6 : quartiers, plage, nightlife et points d'interet de la metropole de Leonida inspiree de Miami. Tout ce qui est confirme.",
    body: [
      "Vice City est la metropole de GTA 6 et le coeur battant de l'Etat de Leonida. Inspiree de Miami, elle est presentee par Rockstar comme la ville la plus dense et la plus detaillee jamais construite par le studio. C'est ici que se croisent les destins de Jason et Lucia, entre front de mer art deco, gratte-ciels et arriere-cours moins reluisantes.",
      "Confirme par le materiel officiel : le strip du front de mer et sa vie nocturne, les quartiers d'affaires, la plage emblematique (sport, fetes, muscle beach), ainsi qu'une culture de rue tres presente — car meets, lowriders et clubs. Les bandes-annonces montrent aussi la police de Vice City en action, entre poursuites urbaines et barrages.",
      "Sur la carte communautaire, Vice City occupe la cote est de Leonida, avec son aeroport international au sud-ouest et l'ile de Catalana au sud-est. La superficie exacte de la ville reste a confirmer a la sortie, le 19 novembre 2026.",
    ],
    pois: [
      "Ocean Drive et le front de mer (officiel)",
      "La plage de Vice City (officiel)",
      "Aeroport international (position rapportee)",
      "Catalana, l'ile au sud-est (rapporte)",
      "Downtown et ses gratte-ciels (apercu trailers)",
    ],
    faq: [
      {
        q: "Vice City est-elle la seule ville de GTA 6 ?",
        a: "Non. Vice City est la metropole principale, mais l'Etat de Leonida compte d'autres localites comme Port Gellhorn ou Ambrosia, ainsi que des regions entieres a explorer (Keys, Grassrivers, Mount Kalaga).",
      },
      {
        q: "Vice City est-elle fidele a Miami ?",
        a: "Vice City est une version fictive de Miami : art deco, plages, neons et culture latino. Rockstar s'inspire de la ville reelle sans la copier rue par rue.",
      },
      {
        q: "Peut-on visiter l'interieur des batiments ?",
        a: "Rockstar promet une densite inedite et les trailers montrent plusieurs interieurs. L'etendue exacte des interieurs accessibles reste a confirmer en jeu.",
      },
    ],
  },
  "leonida-keys": {
    metaDescription:
      "Les Leonida Keys dans GTA 6 : le chapelet d'iles au sud de Leonida, inspire des Florida Keys. Route unique, marinas et hors-bord — le point complet.",
    body: [
      "Les Leonida Keys ferment le sud de la carte de GTA 6 : un chapelet d'iles reliees par une route unique, version Rockstar des Florida Keys. C'est le decor des sequences les plus « cartes postales » du materiel officiel — marinas, eaux turquoise, ponts sans fin.",
      "C'est aussi, selon la fiche officielle de Brian Heder, le territoire des trafiquants old-school : criques discretes, hydravions et hors-bords rapides. Attendez-vous a des activites nautiques (jet-ski, peche, courses de bateaux — a confirmer) et a un role central du Squalo, le hors-bord confirme par le media kit.",
      "Sur la carte communautaire, les Keys s'etirent tout au sud, avec un aerodrome local rapporte sur l'une des iles. Leur taille exacte et le nombre d'iles accessibles restent a verifier a la sortie.",
    ],
    pois: [
      "La route des Keys, unique acces routier (rapporte)",
      "Marinas et pontons (officiel, artworks)",
      "Aerodrome insulaire (rapporte)",
      "Criques et mouillages discrets (ambiance officielle)",
    ],
    faq: [
      {
        q: "Peut-on rejoindre les Keys autrement qu'en voiture ?",
        a: "La route unique est l'acces principal, mais bateaux et avions legers devraient offrir des alternatives naturelles — l'aviation civile reste toutefois a confirmer officiellement.",
      },
      {
        q: "Qui est Brian Heder, lie aux Keys ?",
        a: "Brian Heder est un personnage officiel devoile par Rockstar : un trafiquant a l'ancienne installe dans les Keys, figure du casting secondaire de GTA 6.",
      },
      {
        q: "Les Keys sont-elles inspirees de Key West ?",
        a: "L'inspiration des Florida Keys (dont Key West) est evidente dans les visuels officiels, mais Rockstar n'a pas detaille les equivalences ile par ile.",
      },
    ],
  },
  grassrivers: {
    metaDescription:
      "Grassrivers dans GTA 6 : les Everglades de Leonida — marais, alligators, hydroglisseur et bayous. Ce qui est officiel et ce qui reste a confirmer.",
    body: [
      "Grassrivers est la version GTA des Everglades : un immense marais au sud-ouest de Leonida, navigable en hydroglisseur, peuple d'alligators et parseme de cabanes sur pilotis. La region apparait des la premiere bande-annonce, airboat lance a pleine vitesse entre les roseaux.",
      "L'artwork officiel de la region (sections « Places » du site Rockstar) confirme l'ambiance : lumiere de crepuscule, herons, vegetation dense. C'est le terrain de jeu ideal des courses de marais et, sans doute, de trafics loin des regards — l'exact role narratif de la region reste a confirmer.",
      "Attendez-vous a une faune active (les alligators sont montres dans le materiel officiel) et a des acces limites en vehicule terrestre : ici, le bateau est roi.",
    ],
    pois: [
      "Marais navigables en hydroglisseur (officiel)",
      "Cabanes sur pilotis (artwork officiel)",
      "Faune : alligators, oiseaux (officiel)",
      "Village de Grassrivers (position rapportee)",
    ],
    faq: [
      {
        q: "Peut-on conduire dans Grassrivers ?",
        a: "Les routes semblent rares dans le marais : l'hydroglisseur (airboat) apercu dans le trailer 1 y est clairement le vehicule signature. Les 4x4 devraient s'aventurer en peripherie.",
      },
      {
        q: "Les alligators sont-ils dangereux en jeu ?",
        a: "Les alligators sont bien presents dans le materiel officiel. Leur comportement (agressif ou decoratif) n'a pas ete detaille par Rockstar.",
      },
      {
        q: "Grassrivers correspond-il aux vrais Everglades ?",
        a: "Oui dans l'esprit : un parc de zones humides geant au sud de la Floride. Le nom, lui, est propre a l'univers du jeu.",
      },
    ],
  },
  "mount-kalaga": {
    metaDescription:
      "Mount Kalaga National Park dans GTA 6 : le grand parc national du nord de Leonida — reliefs, forets, panoramas. Infos officielles et carte.",
    body: [
      "Mount Kalaga National Park est le poumon vert et montagneux du nord de Leonida. L'artwork officiel montre reliefs boises, panneaux de parc national (« Fire Danger ») et panoramas — un contrepoint total au tumulte de Vice City.",
      "C'est le terrain naturel des activites outdoor : randonnee, chasse, tout-terrain — a confirmer une a une, mais l'ADN de la serie (et le pickup de Jason apercu dans le trailer 2) pointe dans cette direction. Le nom « Mount Kalaga » figure dans le materiel officiel, ce qui en fait l'un des lieux les mieux etablis de la carte.",
      "Sur la carte communautaire, le parc occupe tout le nord de l'Etat, avec le point culminant de Leonida. La ville de Yorktown et Port Gellhorn se trouvent a l'ouest du massif.",
    ],
    pois: [
      "Massif et point culminant de Leonida (rapporte)",
      "Forets et sentiers (artwork officiel)",
      "Zones de chasse potentielles (a confirmer)",
      "Routes panoramiques vers Port Gellhorn (rapporte)",
    ],
    faq: [
      {
        q: "Le parc est-il inspire d'un lieu reel ?",
        a: "La Floride n'a pas de vraies montagnes : Mount Kalaga condense plutot l'imaginaire des parcs nationaux du sud-est americain (type Ocala/Appalaches) au service du gameplay.",
      },
      {
        q: "Y aura-t-il de la chasse dans GTA 6 ?",
        a: "Rien d'officiel. La chasse existait dans GTA 5 et Red Dead Redemption 2, et un parc national s'y preterait, mais cela reste a confirmer.",
      },
    ],
  },
  "port-gellhorn": {
    metaDescription:
      "Port Gellhorn dans GTA 6 : la ville portuaire du panhandle de Leonida (inspiree de Panama City Beach) — industrie, motels, circuit. Le point complet.",
    body: [
      "Port Gellhorn est la ville portuaire du nord-ouest de Leonida, inspiree de Panama City Beach. Loin du glamour de Vice City : ici, ce sont grues, rouille, motels defraichis et economie qui tourne au ralenti — le decor parfait pour les combines des personnages en marge.",
      "Le materiel officiel associe plusieurs figures du casting a cette region cote « redneck riviera », et un circuit automobile y est rapporte par la communaute — de quoi imaginer courses locales et paris. La fiche officielle de la region insiste sur son identite ouvriere et balnéaire declinante.",
      "Sur la carte communautaire, Port Gellhorn (avec la mention « Panama City ») se situe sur la cote du panhandle, a l'ouest du Mount Kalaga National Park, avec Yorktown un peu plus au nord.",
    ],
    pois: [
      "Le port industriel et ses grues (officiel)",
      "Circuit automobile local (rapporte)",
      "Motels et front de mer decati (artwork officiel)",
      "Yorktown, la ville voisine (rapporte)",
    ],
    faq: [
      {
        q: "Pourquoi « Panama City » apparait sur certaines cartes ?",
        a: "La carte communautaire indique entre parentheses la ville reelle qui inspire chaque lieu. Port Gellhorn est la transposition de Panama City Beach, en Floride.",
      },
      {
        q: "Port Gellhorn aura-t-il ses propres missions ?",
        a: "Rockstar n'a pas detaille la structure des missions par region. La presence de personnages officiels lies a la zone laisse toutefois presager un vrai arc narratif local.",
      },
    ],
  },
  ambrosia: {
    metaDescription:
      "Ambrosia dans GTA 6 : l'arriere-pays agricole et industriel de Leonida — champs de canne, raffinerie, routes droites. Infos et carte.",
    body: [
      "Ambrosia est l'arriere-pays de Leonida : champs de canne a sucre, raffinerie et lignes droites brulantes au centre de l'Etat. La region incarne l'Amerique rurale du jeu, a mille lieues du strip de Vice City.",
      "L'artwork officiel montre une ville-usine ecrasee de soleil, dominee par sa raffinerie. C'est un carrefour routier naturel entre Vice City, Port Gellhorn et le nord — attendez-vous a y croiser pickups, 4x4 mudding (le Canis « One-Eyed Willie » du media kit y serait chez lui) et economie agricole.",
      "Position sur la carte communautaire : au centre-ouest de l'Etat, traversee par les grands axes. Son role exact dans l'histoire reste a confirmer.",
    ],
    pois: [
      "La raffinerie d'Ambrosia (artwork officiel)",
      "Champs de canne a sucre (officiel)",
      "Grands axes routiers de l'interieur (rapporte)",
    ],
    faq: [
      {
        q: "Ambrosia est-elle inspiree d'une vraie ville ?",
        a: "L'ambiance evoque les villes sucrieres de l'interieur de la Floride comme Clewiston ou Belle Glade, sans equivalence officielle confirmee par Rockstar.",
      },
      {
        q: "Que faire a Ambrosia ?",
        a: "Rockstar n'a pas encore detaille les activites. Le profil de la region (agricole, routier, industriel) se prete aux courses tout-terrain et aux missions de contrebande.",
      },
    ],
  },
};

export const lieux: Lieu[] = regions.map((r) => ({
  ...r,
  ...LIEUX_CONTENT[r.id],
}));

export function getLieu(id: string): Lieu | undefined {
  return lieux.find((l) => l.id === id);
}

/** Marqueurs de carte associes a un lieu (pour lien carte interactive). */
export function markersForLieu(id: string) {
  return mapMarkers.filter((m) => m.id === id);
}
