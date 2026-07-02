/**
 * Base de véhicules GTA 6.
 *
 * Statuts :
 *  - "confirmé" : nom officiel révélé par Rockstar (media kit éditions,
 *    screenshots officiels des précommandes du 25 juin 2026)
 *  - "aperçu"   : véhicule visible dans les bandes-annonces officielles,
 *    nom in-game encore inconnu (description factuelle)
 *  - "supposé"  : catégorie attendue (historique de la série), à confirmer
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
  /** Ou le véhicule a été vu (trailer 1 / trailer 2 / media kit / attendu). */
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
  // --- CONFIRMÉS (noms officiels, media kit précommandes) -------------------
  {
    slug: "grotti-cheetah",
    name: "Grotti Cheetah",
    brand: "Grotti",
    class: "Sportives",
    status: "confirme",
    seenIn: "Media kit officiel",
    image: "/images/veh-grotti-cheetah.jpg",
    description:
      "La supercar legendaire de la série fait son retour a Vice City. Dévoilée dans les visuels officiels de l'édition Ultimate, la Cheetah reste la référence des sportives italiennes façon Grotti.",
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
      "Le hors-bord racing iconique de GTA, confirmé par les screenshots officiels des éditions. Taille pour les courses entre les Keys et les poursuites en haute mer.",
  },
  {
    slug: "vapid-dominator-buggy",
    name: "Vapid Dominator Buggy (1967)",
    brand: "Vapid",
    class: "Muscle & classiques",
    status: "confirme",
    seenIn: "Édition Ultimate",
    image: "/images/veh-vapid-buggy.jpg",
    description:
      "Exclusivite de l'édition Ultimate (99,99 €) : cette Dominator de 1967 preparee façon buggy est livree avec le garage Paradise a Watson Bay. Le muscle car américain dans sa version la plus radicale.",
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
      "La berline américaine culte de la série revient dans une déclinaison vintage, offerte via le pack Vice City Vintage remis avec toute précommande (du 25 juin au 20 novembre 2026).",
  },
  {
    slug: "vapid-ganado-retro",
    name: "Vapid Ganado (retro build)",
    brand: "Vapid",
    class: "Tout-terrain",
    status: "confirme",
    seenIn: "Édition Ultimate",
    image: "/images/veh-vapid-ganado.jpg",
    description:
      "Pickup Vapid Ganado en preparation retro, aperçu dans les visuels officiels des éditions. Le compagnon idéal des routes d'Ambrosia.",
  },
  {
    slug: "canis-one-eyed-willie",
    name: "Canis « One-Eyed Willie »",
    brand: "Canis",
    class: "Tout-terrain",
    status: "confirme",
    seenIn: "Édition Ultimate",
    image: "/images/veh-one-eyed-willie.jpg",
    description:
      "Build tout-terrain surleve signe Canis, roues surdimensionnees et livree « WARNING » : le mudding floridien assume, tout droit sorti du media kit officiel.",
  },
  {
    slug: "collection-wyman",
    name: "Collection de Wyman",
    brand: "Classiques variés",
    class: "Muscle & classiques",
    status: "confirme",
    seenIn: "Édition Ultimate",
    image: "/images/veh-wyman-collection.jpg",
    description:
      "Une collection de classiques américaines liée au personnage de Wyman, montree dans les screenshots officiels de l'édition Ultimate. Les amateurs de chrome sont servis.",
  },
  // --- APERÇUS (trailers officiels, noms à confirmer) -----------------------
  {
    slug: "cabriolet-lowrider-violet",
    name: "Cabriolet lowrider violet",
    brand: "A confirmer",
    class: "Muscle & classiques",
    status: "apercu",
    seenIn: "Trailer 1",
    description:
      "Le cabriolet violet devenu embleme du jeu : c'est au volant de ce classique decapotable que Lucia apparaît à la fin de la première bande-annonce.",
  },
  {
    slug: "lowrider-hydraulique",
    name: "Lowrider a hydrauliques",
    brand: "A confirmer",
    class: "Muscle & classiques",
    status: "apercu",
    seenIn: "Trailer 1",
    description:
      "Aperçus en plein bounce lors d'un rassemblement de rue : les lowriders a suspensions hydrauliques signent le retour de la culture car-meet dans GTA 6.",
  },
  {
    slug: "moto-sportive",
    name: "Moto sportive",
    brand: "A confirmer",
    class: "Motos",
    status: "apercu",
    seenIn: "Trailer 2",
    description:
      "Jason enfourche une sportive dans la deuxième bande-annonce. Vitesse pure et wheelings sur l'asphalte de Vice City.",
  },
  {
    slug: "chopper-cruiser",
    name: "Chopper / cruiser",
    brand: "A confirmer",
    class: "Motos",
    status: "apercu",
    seenIn: "Trailer 1",
    description:
      "Des cruisers descendent le strip du front de mer dans la première bande-annonce, l'esprit Floride jusque dans les guidons.",
  },
  {
    slug: "pickup-jason",
    name: "Pickup (le véhicule de Jason)",
    brand: "A confirmer",
    class: "Tout-terrain",
    status: "apercu",
    seenIn: "Trailer 2",
    description:
      "Le pickup use que conduit Jason dans la deuxième bande-annonce. Idéal pour l'arrière-pays d'Ambrosia et les chemins de terre.",
  },
  {
    slug: "berline-banalisee",
    name: "Berline banalisee",
    brand: "A confirmer",
    class: "Berlines & SUV",
    status: "apercu",
    seenIn: "Trailers 1 & 2",
    description:
      "Le trafic de Leonida fourmille de berlines ordinaires : parfaites pour passer inapercu après un coup.",
  },
  {
    slug: "suv-urbain",
    name: "SUV urbain",
    brand: "A confirmer",
    class: "Berlines & SUV",
    status: "apercu",
    seenIn: "Trailers 1 & 2",
    description:
      "SUV et crossovers omnipresents dans les rues, a l'aise en ville comme sur les routes côtières des Keys.",
  },
  {
    slug: "hydroglisseur-airboat",
    name: "Hydroglisseur (airboat)",
    brand: "A confirmer",
    class: "Nautiques",
    status: "apercu",
    seenIn: "Trailer 1",
    description:
      "L'airboat a helice des marais de Grassrivers, aperçu au milieu des alligators. LE véhicule signature des Everglades version GTA.",
  },
  {
    slug: "jet-ski",
    name: "Jet-ski",
    brand: "A confirmer",
    class: "Nautiques",
    status: "apercu",
    seenIn: "Trailer 2",
    description:
      "Aperçu le long des plages de Vice City : le jet-ski promet des virees rapides entre marinas, canaux et haute mer.",
  },
  {
    slug: "voiture-police-vice",
    name: "Voiture de police de Vice City",
    brand: "A confirmer",
    class: "Services",
    status: "apercu",
    seenIn: "Trailers 1 & 2",
    description:
      "Les cruisers de la police de Vice City sont bien visibles dans les deux bandes-annonces : gyrophares, poursuites et barrages compris.",
  },
  {
    slug: "helicoptere-police",
    name: "Helicoptere de police",
    brand: "A confirmer",
    class: "Services",
    status: "apercu",
    seenIn: "Trailer 1",
    description:
      "Projecteur braque sur les fuyards : l'helico de la police apparaît dès la première bande-annonce.",
  },
  // --- SUPPOSES ---------------------------------------------------------------
  {
    slug: "avion-leger",
    name: "Avion léger",
    brand: "A confirmer",
    class: "Aeriens",
    status: "suppose",
    seenIn: "Attendu",
    description:
      "Avions de tourisme et petits coucous font partie de l'ADN de la série. Leur présence a Leonida reste à confirmer officiellement.",
  },
  {
    slug: "helicoptere-civil",
    name: "Helicoptere civil",
    brand: "A confirmer",
    class: "Aeriens",
    status: "suppose",
    seenIn: "Attendu",
    description:
      "Pour survoler Vice City et rejoindre les Keys en quelques minutes. Catégorie attendue, sans apparition officielle claire pour l'instant.",
  },
];

export function getVehicle(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}
