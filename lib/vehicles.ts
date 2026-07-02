/**
 * Base de vehicules GTA 6.
 *
 * Statuts :
 *  - "confirme" : nom officiel revele par Rockstar (media kit editions,
 *    screenshots officiels des precommandes du 25 juin 2026)
 *  - "apercu"   : vehicule visible dans les bandes-annonces officielles,
 *    nom in-game encore inconnu (description factuelle)
 *  - "suppose"  : categorie attendue (historique de la serie), a confirmer
 * Les images proviennent du media kit officiel Rockstar Games.
 */

export type VehicleClass =
  | "Sportives"
  | "Muscle & classiques"
  | "Berlines & SUV"
  | "Motos"
  | "Tout-terrain"
  | "Nautiques"
  | "Aeriens"
  | "Services";

export type VehicleStatus = "confirme" | "apercu" | "suppose";

export interface Vehicle {
  slug: string;
  name: string;
  brand: string;
  class: VehicleClass;
  status: VehicleStatus;
  description: string;
  /** Ou le vehicule a ete vu (trailer 1 / trailer 2 / media kit / attendu). */
  seenIn?: string;
  /** Screenshot officiel Rockstar (chemin public). */
  image?: string;
}

export const vehicleClasses: VehicleClass[] = [
  "Sportives",
  "Muscle & classiques",
  "Berlines & SUV",
  "Motos",
  "Tout-terrain",
  "Nautiques",
  "Aeriens",
  "Services",
];

export const vehicles: Vehicle[] = [
  // --- CONFIRMES (noms officiels, media kit precommandes) -------------------
  {
    slug: "grotti-cheetah",
    name: "Grotti Cheetah",
    brand: "Grotti",
    class: "Sportives",
    status: "confirme",
    seenIn: "Media kit officiel",
    image: "/images/veh-grotti-cheetah.jpg",
    description:
      "La supercar legendaire de la serie fait son retour a Vice City. Devoilee dans les visuels officiels de l'edition Ultimate, la Cheetah reste la reference des sportives italiennes facon Grotti.",
  },
  {
    slug: "squalo",
    name: "Squalo",
    brand: "Shitzu",
    class: "Nautiques",
    status: "confirme",
    seenIn: "Media kit officiel",
    image: "/images/veh-squalo.jpg",
    description:
      "Le hors-bord racing iconique de GTA, confirme par les screenshots officiels des editions. Taille pour les courses entre les Keys et les poursuites en haute mer.",
  },
  {
    slug: "vapid-dominator-buggy",
    name: "Vapid Dominator Buggy (1967)",
    brand: "Vapid",
    class: "Muscle & classiques",
    status: "confirme",
    seenIn: "Edition Ultimate",
    image: "/images/veh-vapid-buggy.jpg",
    description:
      "Exclusivite de l'edition Ultimate (99,99 €) : cette Dominator de 1967 preparee facon buggy est livree avec le garage Paradise a Watson Bay. Le muscle car americain dans sa version la plus radicale.",
  },
  {
    slug: "vapid-stanier",
    name: "Vapid Stanier",
    brand: "Vapid",
    class: "Berlines & SUV",
    status: "confirme",
    seenIn: "Pack Vice City Vintage",
    image: "/images/veh-vapid-stanier.jpg",
    description:
      "La berline americaine culte de la serie revient dans une declinaison vintage, offerte via le pack Vice City Vintage remis avec toute precommande (du 25 juin au 20 novembre 2026).",
  },
  {
    slug: "vapid-ganado-retro",
    name: "Vapid Ganado (retro build)",
    brand: "Vapid",
    class: "Tout-terrain",
    status: "confirme",
    seenIn: "Edition Ultimate",
    image: "/images/veh-vapid-ganado.jpg",
    description:
      "Pickup Vapid Ganado en preparation retro, apercu dans les visuels officiels des editions. Le compagnon ideal des routes d'Ambrosia.",
  },
  {
    slug: "canis-one-eyed-willie",
    name: "Canis « One-Eyed Willie »",
    brand: "Canis",
    class: "Tout-terrain",
    status: "confirme",
    seenIn: "Edition Ultimate",
    image: "/images/veh-one-eyed-willie.jpg",
    description:
      "Build tout-terrain surleve signe Canis, roues surdimensionnees et livree « WARNING » : le mudding floridien assume, tout droit sorti du media kit officiel.",
  },
  {
    slug: "collection-wyman",
    name: "Collection de Wyman",
    brand: "Classiques varies",
    class: "Muscle & classiques",
    status: "confirme",
    seenIn: "Edition Ultimate",
    image: "/images/veh-wyman-collection.jpg",
    description:
      "Une collection de classiques americaines liee au personnage de Wyman, montree dans les screenshots officiels de l'edition Ultimate. Les amateurs de chrome sont servis.",
  },
  // --- APERCUS (trailers officiels, noms a confirmer) -----------------------
  {
    slug: "cabriolet-lowrider-violet",
    name: "Cabriolet lowrider violet",
    brand: "A confirmer",
    class: "Muscle & classiques",
    status: "apercu",
    seenIn: "Trailer 1",
    description:
      "Le cabriolet violet devenu embleme du jeu : c'est au volant de ce classique decapotable que Lucia apparait a la fin de la premiere bande-annonce.",
  },
  {
    slug: "lowrider-hydraulique",
    name: "Lowrider a hydrauliques",
    brand: "A confirmer",
    class: "Muscle & classiques",
    status: "apercu",
    seenIn: "Trailer 1",
    description:
      "Apercus en plein bounce lors d'un rassemblement de rue : les lowriders a suspensions hydrauliques signent le retour de la culture car-meet dans GTA 6.",
  },
  {
    slug: "moto-sportive",
    name: "Moto sportive",
    brand: "A confirmer",
    class: "Motos",
    status: "apercu",
    seenIn: "Trailer 2",
    description:
      "Jason enfourche une sportive dans la deuxieme bande-annonce. Vitesse pure et wheelings sur l'asphalte de Vice City.",
  },
  {
    slug: "chopper-cruiser",
    name: "Chopper / cruiser",
    brand: "A confirmer",
    class: "Motos",
    status: "apercu",
    seenIn: "Trailer 1",
    description:
      "Des cruisers descendent le strip du front de mer dans la premiere bande-annonce — l'esprit Floride jusque dans les guidons.",
  },
  {
    slug: "pickup-jason",
    name: "Pickup (le vehicule de Jason)",
    brand: "A confirmer",
    class: "Tout-terrain",
    status: "apercu",
    seenIn: "Trailer 2",
    description:
      "Le pickup use que conduit Jason dans la deuxieme bande-annonce. Ideal pour l'arriere-pays d'Ambrosia et les chemins de terre.",
  },
  {
    slug: "berline-banalisee",
    name: "Berline banalisee",
    brand: "A confirmer",
    class: "Berlines & SUV",
    status: "apercu",
    seenIn: "Trailers 1 & 2",
    description:
      "Le trafic de Leonida fourmille de berlines ordinaires — parfaites pour passer inapercu apres un coup.",
  },
  {
    slug: "suv-urbain",
    name: "SUV urbain",
    brand: "A confirmer",
    class: "Berlines & SUV",
    status: "apercu",
    seenIn: "Trailers 1 & 2",
    description:
      "SUV et crossovers omnipresents dans les rues, a l'aise en ville comme sur les routes cotieres des Keys.",
  },
  {
    slug: "hydroglisseur-airboat",
    name: "Hydroglisseur (airboat)",
    brand: "A confirmer",
    class: "Nautiques",
    status: "apercu",
    seenIn: "Trailer 1",
    description:
      "L'airboat a helice des marais de Grassrivers, apercu au milieu des alligators. LE vehicule signature des Everglades version GTA.",
  },
  {
    slug: "jet-ski",
    name: "Jet-ski",
    brand: "A confirmer",
    class: "Nautiques",
    status: "apercu",
    seenIn: "Trailer 2",
    description:
      "Apercu le long des plages de Vice City : le jet-ski promet des virees rapides entre marinas, canaux et haute mer.",
  },
  {
    slug: "voiture-police-vice",
    name: "Voiture de police de Vice City",
    brand: "A confirmer",
    class: "Services",
    status: "apercu",
    seenIn: "Trailers 1 & 2",
    description:
      "Les cruisers de la police de Vice City sont bien visibles dans les deux bandes-annonces — gyrophares, poursuites et barrages compris.",
  },
  {
    slug: "helicoptere-police",
    name: "Helicoptere de police",
    brand: "A confirmer",
    class: "Services",
    status: "apercu",
    seenIn: "Trailer 1",
    description:
      "Projecteur braque sur les fuyards : l'helico de la police apparait des la premiere bande-annonce.",
  },
  // --- SUPPOSES ---------------------------------------------------------------
  {
    slug: "avion-leger",
    name: "Avion leger",
    brand: "A confirmer",
    class: "Aeriens",
    status: "suppose",
    seenIn: "Attendu",
    description:
      "Avions de tourisme et petits coucous font partie de l'ADN de la serie. Leur presence a Leonida reste a confirmer officiellement.",
  },
  {
    slug: "helicoptere-civil",
    name: "Helicoptere civil",
    brand: "A confirmer",
    class: "Aeriens",
    status: "suppose",
    seenIn: "Attendu",
    description:
      "Pour survoler Vice City et rejoindre les Keys en quelques minutes. Categorie attendue, sans apparition officielle claire pour l'instant.",
  },
];

export function getVehicle(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}
