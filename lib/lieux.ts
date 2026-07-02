import { regions, type Region } from "./regions";
import { mapMarkers } from "./map";

/**
 * Contenu editorial des pages lieux (/carte/<lieu>) : pSEO.
 * Chaque lieu = contenu unique (~250 mots), points d'intérêt et FAQ,
 * pour éviter tout contenu "thin". Règle : officiel vs rapporté.
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
      "Vice City dans GTA 6 : quartiers, plage, nightlife et points d'intérêt de la métropole de Leonida inspirée de Miami. Tout ce qui est confirmé.",
    body: [
      "Vice City est la métropole de GTA 6 et le coeur battant de l'État de Leonida. Inspirée de Miami, elle est présentée par Rockstar comme la ville la plus dense et la plus détaillée jamais construite par le studio. C'est ici que se croisent les destins de Jason et Lucia, entre front de mer art deco, gratte-ciels et arrière-cours moins reluisantes.",
      "Confirmé par le matériel officiel : le strip du front de mer et sa vie nocturne, les quartiers d'affaires, la plage emblématique (sport, fêtes, muscle beach), ainsi qu'une culture de rue très présente : car meets, lowriders et clubs. Les bandes-annonces montrent aussi la police de Vice City en action, entre poursuites urbaines et barrages.",
      "Sur la carte communautaire, Vice City occupe la côte est de Leonida, avec son aéroport international au sud-ouest et l'île de Catalana au sud-est. La superficie exacte de la ville reste à confirmer à la sortie, le 19 novembre 2026.",
    ],
    pois: [
      "Ocean Drive et le front de mer (officiel)",
      "La plage de Vice City (officiel)",
      "Aéroport international (position rapportée)",
      "Catalana, l'île au sud-est (rapporté)",
      "Downtown et ses gratte-ciels (aperçu trailers)",
    ],
    faq: [
      {
        q: "Vice City est-elle la seule ville de GTA 6 ?",
        a: "Non. Vice City est la métropole principale, mais l'État de Leonida compte d'autres localités comme Port Gellhorn ou Ambrosia, ainsi que des régions entières à explorer (Keys, Grassrivers, Mount Kalaga).",
      },
      {
        q: "Vice City est-elle fidèle a Miami ?",
        a: "Vice City est une version fictive de Miami : art deco, plages, néons et culture latino. Rockstar s'inspire de la ville réelle sans la copier rue par rue.",
      },
      {
        q: "Peut-on visiter l'intérieur des bâtiments ?",
        a: "Rockstar promet une densité inédite et les trailers montrent plusieurs intérieurs. L'étendue exacte des intérieurs accessibles reste à confirmer en jeu.",
      },
    ],
  },
  "leonida-keys": {
    metaDescription:
      "Les Leonida Keys dans GTA 6 : le chapelet d'îles au sud de Leonida, inspiré des Florida Keys. Route unique, marinas et hors-bord, le point complet.",
    body: [
      "Les Leonida Keys ferment le sud de la carte de GTA 6 : un chapelet d'îles reliées par une route unique, version Rockstar des Florida Keys. C'est le décor des séquences les plus « cartes postales » du matériel officiel : marinas, eaux turquoise, ponts sans fin.",
      "C'est aussi, selon la fiche officielle de Brian Heder, le territoire des trafiquants old-school : criques discrètes, hydravions et hors-bords rapides. Attendez-vous à des activités nautiques (jet-ski, pêche, courses de bateaux : à confirmer) et à un rôle central du Squalo, le hors-bord confirmé par le media kit.",
      "Sur la carte communautaire, les Keys s'étirent tout au sud, avec un aérodrome local rapporté sur l'une des îles. Leur taille exacte et le nombre d'îles accessibles restent à vérifier à la sortie.",
    ],
    pois: [
      "La route des Keys, unique accès routier (rapporté)",
      "Marinas et pontons (officiel, artworks)",
      "Aérodrome insulaire (rapporté)",
      "Criques et mouillages discrets (ambiance officielle)",
    ],
    faq: [
      {
        q: "Peut-on rejoindre les Keys autrement qu'en voiture ?",
        a: "La route unique est l'accès principal, mais bateaux et avions légers devraient offrir des alternatives naturelles, l'aviation civile reste toutefois à confirmer officiellement.",
      },
      {
        q: "Qui est Brian Heder, lié aux Keys ?",
        a: "Brian Heder est un personnage officiel dévoilé par Rockstar : un trafiquant à l'ancienne installé dans les Keys, figure du casting secondaire de GTA 6.",
      },
      {
        q: "Les Keys sont-elles inspirées de Key West ?",
        a: "L'inspiration des Florida Keys (dont Key West) est évidente dans les visuels officiels, mais Rockstar n'a pas détaillé les équivalences île par île.",
      },
    ],
  },
  grassrivers: {
    metaDescription:
      "Grassrivers dans GTA 6 : les Everglades de Leonida : marais, alligators, hydroglisseur et bayous. Ce qui est officiel et ce qui reste à confirmer.",
    body: [
      "Grassrivers est la version GTA des Everglades : un immense marais au sud-ouest de Leonida, navigable en hydroglisseur, peuplé d'alligators et parsemé de cabanes sur pilotis. La région apparaît dès la première bande-annonce, airboat lancé à pleine vitesse entre les roseaux.",
      "L'artwork officiel de la région (sections « Places » du site Rockstar) pose l'ambiance : lumière de crépuscule, hérons, végétation dense. C'est le terrain de jeu idéal des courses de marais et, sans doute, de trafics loin des regards, l'exact rôle narratif de la région reste à confirmer.",
      "Attendez-vous à une faune active (les alligators sont montrés dans le matériel officiel) et à des accès limités en véhicule terrestre : ici, le bateau est roi.",
    ],
    pois: [
      "Marais navigables en hydroglisseur (officiel)",
      "Cabanes sur pilotis (artwork officiel)",
      "Faune : alligators, oiseaux (officiel)",
      "Village de Grassrivers (position rapportée)",
    ],
    faq: [
      {
        q: "Peut-on conduire dans Grassrivers ?",
        a: "Les routes semblent rares dans le marais : l'hydroglisseur (airboat) aperçu dans le trailer 1 y est clairement le véhicule signature. Les 4x4 devraient s'aventurer en périphérie.",
      },
      {
        q: "Les alligators sont-ils dangereux en jeu ?",
        a: "Les alligators sont bien présents dans le matériel officiel. Leur comportement (agressif ou décoratif) n'a pas été détaillé par Rockstar.",
      },
      {
        q: "Grassrivers correspond-il aux vrais Everglades ?",
        a: "Oui dans l'esprit : un parc de zones humides géant au sud de la Floride. Le nom, lui, est propre à l'univers du jeu.",
      },
    ],
  },
  "mount-kalaga": {
    metaDescription:
      "Mount Kalaga National Park dans GTA 6 : le grand parc national du nord de Leonida : reliefs, forêts, panoramas. Infos officielles et carte.",
    body: [
      "Mount Kalaga National Park est le poumon vert et montagneux du nord de Leonida. L'artwork officiel montre reliefs boisés, panneaux de parc national (« Fire Danger ») et panoramas, un contrepoint total au tumulte de Vice City.",
      "C'est le terrain naturel des activités outdoor : randonnée, chasse, tout-terrain : à confirmer une à une, mais l'ADN de la série (et le pickup de Jason aperçu dans le trailer 2) pointe dans cette direction. Le nom « Mount Kalaga » figure dans le matériel officiel, ce qui en fait l'un des lieux les mieux établis de la carte.",
      "Sur la carte communautaire, le parc occupe tout le nord de l'État, avec le point culminant de Leonida. La ville de Yorktown et Port Gellhorn se trouvent à l'ouest du massif.",
    ],
    pois: [
      "Massif et point culminant de Leonida (rapporté)",
      "Forêts et sentiers (artwork officiel)",
      "Zones de chasse potentielles (à confirmer)",
      "Routes panoramiques vers Port Gellhorn (rapporté)",
    ],
    faq: [
      {
        q: "Le parc est-il inspire d'un lieu réel ?",
        a: "La Floride n'a pas de vraies montagnes : Mount Kalaga condense plutot l'imaginaire des parcs nationaux du sud-est américain (type Ocala/Appalaches) au service du gameplay.",
      },
      {
        q: "Y aura-t-il de la chasse dans GTA 6 ?",
        a: "Rien d'officiel. La chasse existait dans GTA 5 et Red Dead Redemption 2, et un parc national s'y preterait, mais cela reste à confirmer.",
      },
    ],
  },
  "port-gellhorn": {
    metaDescription:
      "Port Gellhorn dans GTA 6 : la ville portuaire du panhandle de Leonida (inspirée de Panama City Beach) : industrie, motels, circuit. Le point complet.",
    body: [
      "Port Gellhorn est la ville portuaire du nord-ouest de Leonida, inspirée de Panama City Beach. Loin du glamour de Vice City : ici, ce sont grues, rouille, motels défraîchis et économie qui tourne au ralenti, le décor parfait pour les combines des personnages en marge.",
      "Le matériel officiel associe plusieurs figures du casting à cette région cote « redneck riviera », et un circuit automobile y est rapporté par la communaute, de quoi imaginer courses locales et paris. La fiche officielle de la région insiste sur son identité ouvriere et balnéaire declinante.",
      "Sur la carte communautaire, Port Gellhorn (avec la mention « Panama City ») se situé sur la cote du panhandle, à l'ouest du Mount Kalaga National Park, avec Yorktown un peu plus au nord.",
    ],
    pois: [
      "Le port industriel et ses grues (officiel)",
      "Circuit automobile local (rapporté)",
      "Motels et front de mer decati (artwork officiel)",
      "Yorktown, la ville voisine (rapporté)",
    ],
    faq: [
      {
        q: "Pourquoi « Panama City » apparaît sur certaines cartes ?",
        a: "La carte communautaire indique entre parentheses la ville réelle qui inspire chaque lieu. Port Gellhorn est la transposition de Panama City Beach, en Floride.",
      },
      {
        q: "Port Gellhorn aura-t-il ses propres missions ?",
        a: "Rockstar n'a pas détaillé la structure des missions par région. La présence de personnages officiels liés à la zone laisse toutefois presager un vrai arc narratif local.",
      },
    ],
  },
  ambrosia: {
    metaDescription:
      "Ambrosia dans GTA 6 : l'arrière-pays agricole et industriel de Leonida : champs de canne, raffinerie, routes droites. Infos et carte.",
    body: [
      "Ambrosia est l'arrière-pays de Leonida : champs de canne a sucre, raffinerie et lignes droites brulantes au centre de l'État. La région incarne l'Amérique rurale du jeu, à mille lieues du strip de Vice City.",
      "L'artwork officiel montre une ville-usine écrasée de soleil, dominée par sa raffinerie. C'est un carrefour routier naturel entre Vice City, Port Gellhorn et le nord, attendez-vous à y croiser pickups, 4x4 mudding (le Canis « One-Eyed Willie » du media kit y serait chez lui) et économie agricole.",
      "Position sur la carte communautaire : au centre-ouest de l'État, traversee par les grands axes. Son rôle exact dans l'histoire reste à confirmer.",
    ],
    pois: [
      "La raffinerie d'Ambrosia (artwork officiel)",
      "Champs de canne a sucre (officiel)",
      "Grands axes routiers de l'intérieur (rapporté)",
    ],
    faq: [
      {
        q: "Ambrosia est-elle inspirée d'une vraie ville ?",
        a: "L'ambiance évoque les villes sucrieres de l'intérieur de la Floride comme Clewiston ou Belle Glade, sans équivalence officielle confirmée par Rockstar.",
      },
      {
        q: "Que faire a Ambrosia ?",
        a: "Rockstar n'a pas encore détaillé les activités. Le profil de la région (agricole, routier, industriel) se prete aux courses tout-terrain et aux missions de contrebande.",
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
