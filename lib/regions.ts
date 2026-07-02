/**
 * Régions de l'État de Leonida : visuels officiels Rockstar (media kit,
 * sections "Places" du site officiel).
 */
export interface Region {
  id: string;
  num: string;
  name: string;
  tagline: string;
  description: string;
  status: "officiel" | "rapporte";
  /** Artwork officiel Rockstar (chemin public). */
  image: string;
}

export const regions: Region[] = [
  {
    id: "vice-city",
    num: "01",
    name: "Vice City",
    tagline: "La métropole néon",
    description:
      "Inspirée de Miami : plages, art deco, nightlife et gratte-ciels. Le coeur battant de GTA 6 et la ville la plus dense jamais construite par Rockstar.",
    status: "officiel",
    image: "/images/region-vicecity.jpg",
  },
  {
    id: "leonida-keys",
    num: "02",
    name: "Leonida Keys",
    tagline: "Le chapelet d'îles",
    description:
      "Ponts sans fin, marinas et eaux turquoise au sud de l'État, la version GTA des Florida Keys, paradis du hors-bord.",
    status: "officiel",
    image: "/images/region-leonidakeys.jpg",
  },
  {
    id: "grassrivers",
    num: "03",
    name: "Grassrivers",
    tagline: "Les Everglades",
    description:
      "Marais a perte de vue, alligators et cabanes sur pilotis. Terrain de jeu de l'hydroglisseur aperçu dans le trailer 1.",
    status: "officiel",
    image: "/images/region-grassrivers.jpg",
  },
  {
    id: "mount-kalaga",
    num: "04",
    name: "Mount Kalaga",
    tagline: "Le parc national",
    description:
      "Reliefs, forêts et panoramas au nord de Leonida. Chasse, randonnée et routes sinueuses loin du tumulte de Vice City.",
    status: "officiel",
    image: "/images/region-mountkalaga.jpg",
  },
  {
    id: "port-gellhorn",
    num: "05",
    name: "Port Gellhorn",
    tagline: "La ville portuaire",
    description:
      "Industrie, rouille et motels défraîchis : la face cachée de l'État, théâtre idéal pour les trafics en tous genres.",
    status: "officiel",
    image: "/images/region-portgellhorn.jpg",
  },
  {
    id: "ambrosia",
    num: "06",
    name: "Ambrosia",
    tagline: "L'arrière-pays",
    description:
      "Champs de canne, raffineries et lignes droites brulantes. L'Amérique rurale de Leonida, à mille lieues du strip.",
    status: "officiel",
    image: "/images/region-ambrosia.jpg",
  },
];

/** Personnages secondaires officiels (artworks Rockstar). */
export interface Character {
  id: string;
  name: string;
  role: string;
  image: string;
}

export const characters: Character[] = [
  {
    id: "cal-hampton",
    name: "Cal Hampton",
    role: "Complotiste et voisin de Jason",
    image: "/images/char-calhampton.jpg",
  },
  {
    id: "boobie-ike",
    name: "Boobie Ike",
    role: "Legende locale de Vice City",
    image: "/images/char-boobieike.jpg",
  },
  {
    id: "drequan-priest",
    name: "Dre'Quan Priest",
    role: "Patron du label Only Raw Records",
    image: "/images/char-drequanpriest.jpg",
  },
  {
    id: "real-dimez",
    name: "Real Dimez",
    role: "Duo rap monte sur jet-ski",
    image: "/images/char-realdimez.jpg",
  },
  {
    id: "raul-bautista",
    name: "Raul Bautista",
    role: "Braqueur de banques chevronne",
    image: "/images/char-raulbautista.jpg",
  },
  {
    id: "brian-heder",
    name: "Brian Heder",
    role: "Trafiquant old-school des Keys",
    image: "/images/char-brianheder.jpg",
  },
];
