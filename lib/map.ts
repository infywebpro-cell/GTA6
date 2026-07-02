/**
 * Données de la carte interactive de Leonida (GTA 6).
 *
 * Fond de carte : reconstitution communautaire "YANIS : GTA VI Community
 * Map v13" (GTA VI Mapping Community), établie a partir des trailers,
 * screenshots officiels et informations publiques. Carte NON officielle :
 * Rockstar n'a pas encore publié la carte du jeu.
 *
 * Les coordonnees x/y des marqueurs sont en pourcentage (0-100) de l'image
 * recadree (public/images/map-leonida-crop.jpg, 815x1140).
 */

export const mapImage = {
  src: "/images/map-leonida-crop.jpg",
  width: 815,
  height: 1140,
  /** Couleur de l'ocean de l'image (fond du panneau). */
  ocean: "#2A5C9E",
  credit:
    "Reconstitution communautaire : YANIS / GTA VI Mapping Community (v13). Carte non officielle.",
};

export type MarkerCategory =
  | "region"
  | "ville"
  | "interet"
  | "activite"
  | "collectible";

export interface MapMarker {
  id: string;
  name: string;
  category: MarkerCategory;
  /** Position en % de la largeur/hauteur de l'image. */
  x: number;
  y: number;
  description: string;
  /** Affiche dans la barre "Aller a". */
  quickNav?: boolean;
}

export const markerCategories: { id: MarkerCategory; label: string; color: string }[] = [
  { id: "region", label: "Régions", color: "#FF8A3C" },
  { id: "ville", label: "Villes", color: "#FF3FB4" },
  { id: "interet", label: "Points d'intérêt", color: "#FFD37E" },
  { id: "activite", label: "Activités", color: "#8A5CFF" },
  { id: "collectible", label: "Collectibles", color: "#58E39B" },
];

export const mapMarkers: MapMarker[] = [
  {
    id: "vice-city",
    name: "Vice City",
    category: "ville",
    x: 80.7,
    y: 55.3,
    quickNav: true,
    description:
      "La métropole de Leonida, inspirée de Miami : Ocean Drive, gratte-ciels et nightlife. Position confirmée sur la côte est.",
  },
  {
    id: "vice-beach",
    name: "Plage de Vice City",
    category: "activite",
    x: 84.7,
    y: 53.9,
    description:
      "Le front de mer emblématique : sport, fêtes, muscle beach et vie nocturne face à l'Atlantique.",
  },
  {
    id: "leonida-keys",
    name: "Leonida Keys",
    category: "region",
    x: 47.9,
    y: 92.8,
    quickNav: true,
    description:
      "Chapelet d'îles tout au sud de l'État, relie par une route unique, la version GTA des Florida Keys.",
  },
  {
    id: "grassrivers",
    name: "Grassrivers",
    category: "region",
    x: 52.5,
    y: 77.2,
    quickNav: true,
    description:
      "Les Everglades de Leonida : marais navigables en hydroglisseur, alligators et bayous.",
  },
  {
    id: "ambrosia",
    name: "Ambrosia",
    category: "region",
    x: 58.5,
    y: 44.9,
    quickNav: true,
    description:
      "Zone rurale et industrielle de l'intérieur des terres : champs de canne et raffineries.",
  },
  {
    id: "mount-kalaga",
    name: "Mount Kalaga National Park",
    category: "region",
    x: 50.8,
    y: 25,
    quickNav: true,
    description:
      "Le grand parc national du nord : reliefs, forêts et panoramas sur tout l'État.",
  },
  {
    id: "port-gellhorn",
    name: "Port Gellhorn",
    category: "ville",
    x: 24.9,
    y: 36.7,
    quickNav: true,
    description:
      "Ville portuaire du panhandle (inspirée de Panama City Beach) : industrie, motels et circuits.",
  },
  {
    id: "yorktown",
    name: "Yorktown",
    category: "ville",
    x: 17.2,
    y: 27.2,
    description: "Petite ville du nord-ouest de Leonida, près de Port Gellhorn.",
  },
  {
    id: "aeroport-leonida",
    name: "Aéroport international",
    category: "interet",
    x: 57.7,
    y: 62.7,
    description:
      "Le grand aéroport de Vice City, au sud-ouest de la métropole : hub des véhicules aeriens.",
  },
  {
    id: "catalana",
    name: "Catalana",
    category: "interet",
    x: 77.3,
    y: 70.6,
    description: "Île au sud-est de Vice City, identifiee sur la carte communautaire.",
  },
];
