#!/usr/bin/env node
/**
 * Corrige les accents manquants dans le contenu francais du site.
 *
 * Securite : n'opere QUE sur le contenu des chaines de caracteres
 * ("...", '...', `...`), jamais sur le code brut (imports, identifiants,
 * chemins de module). A l'interieur d'une chaine, ignore tout mot colle
 * a un '-' ou precede d'un '/' (protege les slugs kebab-case et les
 * chemins/URLs). Usage: node scripts/fix-accents.mjs [--write]
 */
import { readFileSync, writeFileSync, globSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const WORDS = {
  francais: "français",
  reference: "référence",
  references: "références",
  vehicule: "véhicule",
  vehicules: "véhicules",
  precommande: "précommande",
  precommandes: "précommandes",
  precommander: "précommander",
  confirme: "confirmé",
  confirmee: "confirmée",
  confirmees: "confirmées",
  confirmes: "confirmés",
  region: "région",
  regions: "régions",
  etat: "état",
  etats: "états",
  edition: "édition",
  editions: "éditions",
  cree: "créé",
  creee: "créée",
  crees: "créés",
  creees: "créées",
  derniere: "dernière",
  dernieres: "dernières",
  premiere: "première",
  premieres: "premières",
  donnee: "donnée",
  donnees: "données",
  integree: "intégrée",
  integrees: "intégrées",
  integre: "intégré",
  amenagee: "aménagée",
  equipee: "équipée",
  securite: "sécurité",
  proprietaire: "propriétaire",
  proprietaires: "propriétaires",
  generale: "générale",
  generales: "générales",
  general: "général",
  generalement: "généralement",
  generateurs: "générateurs",
  generation: "génération",
  generee: "générée",
  genereuse: "généreuse",
  numerique: "numérique",
  numeriques: "numériques",
  numero: "numéro",
  specifique: "spécifique",
  specifiques: "spécifiques",
  specifications: "spécifications",
  ete: "été",
  serie: "série",
  rapporte: "rapporté",
  rapportee: "rapportée",
  rapportees: "rapportées",
  rapportes: "rapportés",
  apres: "après",
  metropole: "métropole",
  materiel: "matériel",
  inspiree: "inspirée",
  inspirees: "inspirées",
  detaille: "détaillé",
  detaillee: "détaillée",
  detaillees: "détaillées",
  detailles: "détaillés",
  interet: "intérêt",
  interets: "intérêts",
  facon: "façon",
  debutant: "débutant",
  suppose: "supposé",
  supposee: "supposée",
  resume: "résumé",
  precis: "précis",
  precise: "précise",
  deja: "déjà",
  complete: "complète",
  completes: "complètes",
  categorie: "catégorie",
  categories: "catégories",
  publiee: "publiée",
  publiees: "publiées",
  publicite: "publicité",
  precedent: "précédent",
  precedents: "précédents",
  precedemment: "précédemment",
  presence: "présence",
  presentant: "présentant",
  presentation: "présentation",
  presente: "présente",
  presentee: "présentée",
  presentees: "présentées",
  presentent: "présentent",
  presentes: "présentés",
  presents: "présents",
  regulierement: "régulièrement",
  systeme: "système",
  systemes: "systèmes",
  telechargement: "téléchargement",
  telechargements: "téléchargements",
  telecharger: "télécharger",
  americain: "américain",
  americaine: "américaine",
  americaines: "américaines",
  americains: "américains",
  amerique: "Amérique",
  cotes: "côtes",
  fidele: "fidèle",
  fideles: "fidèles",
  apparait: "apparaît",
  decouvrir: "découvrir",
  decouvrirez: "découvrirez",
  decouverte: "découverte",
  decrire: "décrire",
  decrit: "décrit",
  decrite: "décrite",
  decrivent: "décrivent",
  defis: "défis",
  credible: "crédible",
  credibles: "crédibles",
  credit: "crédit",
  crepuscule: "crépuscule",
  entiere: "entière",
  entieres: "entières",
  entierement: "entièrement",
  scenario: "scénario",
  scenarise: "scénarisé",
  scenarisee: "scénarisée",
  litteralement: "littéralement",
  eleve: "élevé",
  elevee: "élevée",
  elevees: "élevées",
  developpe: "développé",
  developpee: "développée",
  developpement: "développement",
  developper: "développer",
  degrade: "dégradé",
  degradee: "dégradée",
  degrades: "dégradés",
  probleme: "problème",
  problemes: "problèmes",
  celebre: "célèbre",
  celebres: "célèbres",
  phenomene: "phénomène",
  reseau: "réseau",
  reseaux: "réseaux",
  reussi: "réussi",
  reussie: "réussie",
  reussite: "réussite",
  repere: "repère",
  reperes: "repères",
  reperer: "repérer",
  liees: "liées",
  lies: "liés",
  liee: "liée",
  situe: "situé",
  situee: "située",
  situees: "situées",
  situes: "situés",
  varie: "varié",
  variee: "variée",
  varies: "variés",
  variees: "variées",
  variete: "variété",
  veritable: "véritable",
  veritables: "véritables",
  verite: "vérité",
  verifie: "vérifié",
  verifiee: "vérifiée",
  verifiees: "vérifiées",
  verifies: "vérifiés",
  verifier: "vérifier",
  verification: "vérification",
  aeroport: "aéroport",
  ideal: "idéal",
  ideale: "idéale",
  ideaux: "idéaux",
  acces: "accès",
  succes: "succès",
  exces: "excès",
  tres: "très",
  pres: "près",
  interesse: "intéressé",
  interessee: "intéressée",
  interessant: "intéressant",
  interessante: "intéressante",
  interesser: "intéresser",
  meme: "même",
  memes: "mêmes",
  theme: "thème",
  themes: "thèmes",
  extreme: "extrême",
  extremement: "extrêmement",
  piece: "pièce",
  pieces: "pièces",
  matiere: "matière",
  matieres: "matières",
  criteres: "critères",
  critere: "critère",
  frequente: "fréquente",
  frequemment: "fréquemment",
  frequent: "fréquent",
  frequence: "fréquence",
  espece: "espèce",
  especes: "espèces",
  siege: "siège",
  sieges: "sièges",
  qualite: "qualité",
  qualites: "qualités",
  quantite: "quantité",
  quantites: "quantités",
  activite: "activité",
  activites: "activités",
  capacite: "capacité",
  capacites: "capacités",
  possibilite: "possibilité",
  possibilites: "possibilités",
  realite: "réalité",
  realites: "réalités",
  totalite: "totalité",
  personnalite: "personnalité",
  proximite: "proximité",
  intensite: "intensité",
  diversite: "diversité",
  identite: "identité",
  societe: "société",
  societes: "sociétés",
  propriete: "propriété",
  proprietes: "propriétés",
  specialite: "spécialité",
  specialites: "spécialités",
  simplicite: "simplicité",
  complexite: "complexité",
  authenticite: "authenticité",
  efficacite: "efficacité",
  fidelite: "fidélité",
  gratuite: "gratuité",
  operation: "opération",
  operations: "opérations",
  operateur: "opérateur",
  cooperation: "coopération",
  refere: "réfère",
  preferee: "préférée",
  preferees: "préférées",
  prefere: "préféré",
  preferes: "préférés",
  preference: "préférence",
  preferences: "préférences",
  different: "différent",
  differente: "différente",
  differents: "différents",
  differentes: "différentes",
  difference: "différence",
  differences: "différences",
  necessaire: "nécessaire",
  necessaires: "nécessaires",
  necessite: "nécessite",
  necessitent: "nécessitent",
  immediatement: "immédiatement",
  immediat: "immédiat",
  immediate: "immédiate",
  mediatique: "médiatique",
  medias: "médias",
  intermediaire: "intermédiaire",
  cinquieme: "cinquième",
  quatrieme: "quatrième",
  troisieme: "troisième",
  deuxieme: "deuxième",
  sixieme: "sixième",
  legere: "légère",
  legeres: "légères",
  leger: "léger",
  legers: "légers",
  legerement: "légèrement",
  severe: "sévère",
  severes: "sévères",
  severement: "sévèrement",
  reveler: "révéler",
  revele: "révélé",
  revelee: "révélée",
  revelees: "révélées",
  reveles: "révélés",
  revelation: "révélation",
  revelations: "révélations",
  devoile: "dévoilé",
  devoilee: "dévoilée",
  devoiler: "dévoiler",
  devoilees: "dévoilées",
  devoiles: "dévoilés",
  epoque: "époque",
  episode: "épisode",
  episodes: "épisodes",
  equipe: "équipe",
  equipes: "équipes",
  equilibre: "équilibre",
  equipement: "équipement",
  equipements: "équipements",
  equivalent: "équivalent",
  equivalente: "équivalente",
  etendue: "étendue",
  etendu: "étendu",
  etroit: "étroit",
  etroite: "étroite",
  etrange: "étrange",
  etranger: "étranger",
  etrangere: "étrangère",
  eviter: "éviter",
  evite: "évite",
  evitent: "évitent",
  evidemment: "évidemment",
  evident: "évident",
  evidente: "évidente",
  evolution: "évolution",
  evoluer: "évoluer",
  evolue: "évolue",
  evoluant: "évoluant",
  evoque: "évoque",
  evoquee: "évoquée",
  evoquees: "évoquées",
  evoquent: "évoquent",
  evoquer: "évoquer",
  evenement: "événement",
  evenements: "événements",
  eventuel: "éventuel",
  eventuelle: "éventuelle",
  eventuellement: "éventuellement",
  eventuelles: "éventuelles",
  eventuels: "éventuels",
  echelle: "échelle",
  echapper: "échapper",
  echange: "échange",
  echanger: "échanger",
  eclat: "éclat",
  economie: "économie",
  economique: "économique",
  economiques: "économiques",
  ecran: "écran",
  ecrans: "écrans",
  ecrit: "écrit",
  ecrite: "écrite",
  ecrire: "écrire",
  education: "éducation",
  effectue: "effectué",
  effectuee: "effectuée",
  effectuer: "effectuer",
  egale: "égale",
  egalement: "également",
  egal: "égal",
  eloigne: "éloigné",
  eloignee: "éloignée",
  emission: "émission",
  emotion: "émotion",
  energie: "énergie",
  enorme: "énorme",
  enormement: "énormément",
  entrainement: "entraînement",
  entraine: "entraîne",
  entrainer: "entraîner",
  eparpilles: "éparpillés",
  degat: "dégât",
  degats: "dégâts",
  arriere: "arrière",
  emblematique: "emblématique",
  emblematiques: "emblématiques",
  fete: "fête",
  fetes: "fêtes",
  ile: "île",
  iles: "îles",
  localite: "localité",
  localites: "localités",
  neon: "néon",
  neons: "néons",
  reel: "réel",
  reelle: "réelle",
  reelles: "réelles",
  reels: "réels",
  interieur: "intérieur",
  interieure: "intérieure",
  interieurs: "intérieurs",
  exterieur: "extérieur",
  exterieurs: "extérieurs",
  batiment: "bâtiment",
  batiments: "bâtiments",
  densite: "densité",
  inedit: "inédit",
  inedite: "inédite",
  inedits: "inédits",
  reliee: "reliée",
  reliees: "reliées",
  relies: "reliés",
  decor: "décor",
  decors: "décors",
  sequence: "séquence",
  sequences: "séquences",
  discrete: "discrète",
  discretes: "discrètes",
  peche: "pêche",
  etirent: "étirent",
  aerodrome: "aérodrome",
  equivalence: "équivalence",
  equivalences: "équivalences",
  lumiere: "lumière",
  lumieres: "lumières",
  heron: "héron",
  herons: "hérons",
  vegetation: "végétation",
  peripherie: "périphérie",
  decoratif: "décoratif",
  decorative: "décorative",
  geant: "géant",
  geante: "géante",
  geants: "géants",
  randonnee: "randonnée",
  randonnees: "randonnées",
  boise: "boisé",
  boisee: "boisée",
  boisees: "boisées",
  boises: "boisés",
  etabli: "établi",
  etablie: "établie",
  etablis: "établis",
  foret: "forêt",
  forets: "forêts",
  controle: "contrôle",
  controles: "contrôles",
  role: "rôle",
  roles: "rôles",
  heros: "héros",
  apercu: "aperçu",
  apercue: "aperçue",
  apercues: "aperçues",
  apercus: "aperçus",
  cinematique: "cinématique",
  cinematiques: "cinématiques",
  riviere: "rivière",
  rivieres: "rivières",
  frontiere: "frontière",
  frontieres: "frontières",
  annee: "année",
  annees: "années",
  journee: "journée",
  journees: "journées",
  soiree: "soirée",
  soirees: "soirées",
  duree: "durée",
  tete: "tête",
  tetes: "têtes",
  quete: "quête",
  quetes: "quêtes",
  enquete: "enquête",
  enquetes: "enquêtes",
  fenetre: "fenêtre",
  fenetres: "fenêtres",
  etage: "étage",
  etages: "étages",
  hopital: "hôpital",
  theatre: "théâtre",
  frequentes: "fréquentes",
  cotiere: "côtière",
  cotieres: "côtières",
  misere: "misère",
  installe: "installé",
  installee: "installée",
  installes: "installés",
  defraichis: "défraîchis",
  ecrasee: "écrasée",
  dominee: "dominée",
  elargis: "élargis",
  elargie: "élargie",
  dediee: "dédiée",
  dedie: "dédié",
  dedies: "dédiés",
  demontre: "démontré",
  reellement: "réellement",
  ecosystemes: "écosystèmes",
  ecosysteme: "écosystème",
  commercialise: "commercialisé",
  decalee: "décalée",
  speculation: "spéculation",
  speculations: "spéculations",
  speculative: "spéculative",
  speculatives: "spéculatives",
  transferee: "transférée",
  strategie: "stratégie",
  strategies: "stratégies",
  concu: "conçu",
  concue: "conçue",
  concus: "conçus",
  equipees: "équipées",
  equipe2: "équipé",
  recents: "récents",
  recent: "récent",
  recente: "récente",
  recentes: "récentes",
  optimises: "optimisés",
  optimise: "optimisé",
  optimisee: "optimisée",
  consequent: "conséquent",
  consequente: "conséquente",
  depassent: "dépassent",
  depasse: "dépasse",
  telecharge: "téléchargé",
  fonctionnalites: "fonctionnalités",
  fonctionnalite: "fonctionnalité",
  honnete: "honnête",
  honnetes: "honnêtes",
  estimee: "estimée",
  estimees: "estimées",
  annoncee: "annoncée",
  annoncees: "annoncées",
  presenter: "présenter",
  etre: "être",
  releve: "relève",
  relayes: "relayés",
  relayee: "relayée",
  relayees: "relayées",
  integration: "intégration",
  schema: "schéma",
  schemas: "schémas",
  delai: "délai",
  delais: "délais",
  mefiez: "méfiez",
  recommandee: "recommandée",
  recommandees: "recommandées",
  etaient: "étaient",
  precises: "précises",
  preparer: "préparer",
  deroule: "déroule",
  recoit: "reçoit",
  fleche: "flèche",
  fleches: "flèches",
  rangee: "rangée",
  rangees: "rangées",
  resultat: "résultat",
  resultats: "résultats",
  detail: "détail",
  details: "détails",
  tot: "tôt",
  boite: "boîte",
  boites: "boîtes",
  limitees: "limitées",
  limitee: "limitée",
  debloques: "débloqués",
  debloque: "débloqué",
  debloquee: "débloquée",
  declinaison: "déclinaison",
  declinaisons: "déclinaisons",
  ere: "ère",
  lignee: "lignée",
  decennie: "décennie",
  decennies: "décennies",
  completement: "complètement",
  sante: "santé",
  gravite: "gravité",
  etoile: "étoile",
  etoiles: "étoiles",
  telephone: "téléphone",
  desactivait: "désactivait",
  desactive: "désactivé",
  trophee: "trophée",
  trophees: "trophées",
  empechait: "empêchait",
  empeche: "empêché",
  methode: "méthode",
  methodes: "méthodes",
  verifiee: "vérifiée",
  video: "vidéo",
  videos: "vidéos",
  remunerees: "rémunérées",
  remunere: "rémunéré",
  denicher: "dénicher",
  marecage: "marécage",
  marecages: "marécages",
  tresor: "trésor",
  tresors: "trésors",
  mystere: "mystère",
  mysteres: "mystères",
  cachee: "cachée",
  cachees: "cachées",
  caches: "cachés",
  etranges: "étranges",
  demarrage: "démarrage",
  demarrer: "démarrer",
  verifiez: "vérifiez",
  liberez: "libérez",
  officialises: "officialisés",
  officialise: "officialisé",
  preparez: "préparez",
  anticipes: "anticipés",
  cle: "clé",
  cles: "clés",
  regle: "règle",
  regles: "règles",
  diffusee: "diffusée",
  diffusees: "diffusées",
  idee: "idée",
  idees: "idées",
  reperee: "repérée",
  hesitez: "hésitez",
  precommandez: "précommandez",
  etes: "êtes",
  reservation: "réservation",
  reservations: "réservations",
  prechargement: "préchargement",
  precharger: "précharger",
  reserver: "réserver",
  ulterieure: "ultérieure",
  ulterieur: "ultérieur",
  reapprovisionnement: "réapprovisionnement",
  disponibilite: "disponibilité",
  reperage: "repérage",
  inventee: "inventée",
  inventees: "inventées",
  sanctionnee: "sanctionnée",
  consideres: "considérés",
  considerez: "considérez",
  arrives: "arrivés",
  reperes2: "repérés",
  frequentes2: "fréquentées",
  ecrasee2: "écrasée",
};
for (const k of Object.keys(WORDS)) {
  if (/\d$/.test(k)) delete WORDS[k];
}
// Retire les cles suffixees (utilisees pour eviter les collisions JS)
for (const k of Object.keys(WORDS)) {
  if (/\d$/.test(k)) delete WORDS[k];
}

// Identifiants de code : jamais touches meme si un mot du dictionnaire
// matche exactement (variables/exports partages entre plusieurs fichiers).
const PROTECTED = new Set(["series"]);

const PHRASES = [
  [/\bgrace a\b/gi, "grâce à"],
  [/\bquant a\b/gi, "quant à"],
  [/\bjusqu'a\b/gi, "jusqu'à"],
  [/\bau-dela\b/gi, "au-delà"],
  [/\ba la\b/g, "à la"],
  [/\bA la\b/g, "À la"],
  [/\ba ce\b/g, "à ce"],
  [/\ba cette\b/g, "à cette"],
  [/\ba ces\b/g, "à ces"],
  [/\ba jour\b/g, "à jour"],
  [/\ba tout\b/g, "à tout"],
  [/\ba tous\b/g, "à tous"],
  [/\ba toute\b/g, "à toute"],
  [/\ba toutes\b/g, "à toutes"],
  [/\ba confirmer\b/g, "à confirmer"],
  [/\ba preciser\b/g, "à préciser"],
  [/\ba verifier\b/g, "à vérifier"],
  [/\ba prendre\b/g, "à prendre"],
  [/\ba ne pas\b/g, "à ne pas"],
  [/\ba partir de\b/g, "à partir de"],
  [/\ba travers\b/g, "à travers"],
  [/\ba mille\b/g, "à mille"],
  [/\ba retenir\b/g, "à retenir"],
  [/\ba anticiper\b/g, "à anticiper"],
  [/\ba prevoir\b/g, "à prévoir"],
  [/\ba venir\b/g, "à venir"],
  [/\ba tort\b/g, "à tort"],
  [/\ba droite\b/g, "à droite"],
  [/\ba gauche\b/g, "à gauche"],
  [/\bd'ou\b/gi, "d'où"],
  [/\bla ou\b/g, "là où"],
  [/\bvoila\b/gi, "voilà"],
  // "des" article ne precede jamais "le/la/l'/lors/que" : c'est "dès".
  [/\bdes (le|la|l'|lors|que)\b/g, "dès $1"],
  [/\bDes (le|la|l'|lors|que)\b/g, "Dès $1"],
  [/\breste a\b/g, "reste à"],
  [/\brestent a\b/g, "restent à"],
  [/(-vous) a\b/g, "$1 à"],
  [/\bune a une\b/g, "une à une"],
  [/\ba pleine vitesse\b/g, "à pleine vitesse"],
  [/\ba l'ouest\b/g, "à l'ouest"],
  [/\ba l'est\b/g, "à l'est"],
  [/\ba l'ancienne\b/g, "à l'ancienne"],
  [/\bface a\b/g, "face à"],
  [/\bpropre a\b/g, "propre à"],
  [/\ba explorer\b/g, "à explorer"],
  [/\ba chaque\b/g, "à chaque"],
  [/\bjouer a\b/g, "jouer à"],
  [/\bete annonce\b/g, "été annoncé"],
  [/\bété annonce\b/g, "été annoncé"],
  [/\bété annonces\b/g, "été annoncés"],
  [/\bsont inventes\b/g, "sont inventés"],
  [/\bpas communique\b/g, "pas communiqué"],
  [/\bn'a communique\b/g, "n'a communiqué"],
  [/\ba aborder\b/g, "à aborder"],
  [/\ba s'/g, "à s'"],
  [/\ba tester\b/g, "à tester"],
  [/\ba composer\b/g, "à composer"],
  [/\ba pleine\b/g, "à pleine"],
  [/\ba l'avance\b/g, "à l'avance"],
  [/\ba partir du\b/g, "à partir du"],
  [/\bs'attendre a\b/g, "s'attendre à"],
  [/\bpre-lancement\b/g, "pré-lancement"],
  [/\bplus tot\b/g, "plus tôt"],
  [/\ba y croiser\b/g, "à y croiser"],
  [/\bet a (un|une|des) /g, "et à $1 "],
  [/\ba stock limite\b/g, "à stock limité"],
  [/\bmise a niveau\b/g, "mise à niveau"],
  [/\bmise a jour\b/g, "mise à jour"],
  [/\bBon a savoir\b/g, "Bon à savoir"],
  [/\bpasser a l'/g, "passer à l'"],
  [/\bcote est\b/g, "côte est"],
  [/\bcote ouest\b/g, "côte ouest"],
  // Composés avec tiret (le garde anti-slug du dico les ignore exprès) :
  [/\bMefiez-vous\b/g, "Méfiez-vous"],
  [/\bmefiez-vous\b/g, "méfiez-vous"],
  [/\bAttendez-vous\b/g, "Attendez-vous"],
  [/\barriere-pays\b/g, "arrière-pays"],
  [/\barriere-plan\b/g, "arrière-plan"],
  [/\barriere-cours\b/g, "arrière-cours"],
];

const TARGET_GLOBS = [
  "content/*.ts",
  "lib/*.ts",
  "components/**/*.tsx",
  "app/**/*.tsx",
];

function toGlobFiles() {
  const files = [];
  for (const pattern of TARGET_GLOBS) files.push(...globSync(pattern, { cwd: ROOT }));
  return [...new Set(files)];
}

function matchCase(sample, replacement) {
  if (sample === sample.toUpperCase() && sample !== sample.toLowerCase()) {
    return replacement.toUpperCase();
  }
  if (sample[0] === sample[0].toUpperCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

/** Applique le dictionnaire + les phrases a l'interieur d'un fragment de
 *  chaine (deja isole du code environnant). Protege les mots colles a
 *  '-' (slugs), precedes de '/' (chemins) ou dans PROTECTED. */
function fixProseFragment(fragment) {
  let count = 0;
  let text = fragment;
  for (const [bad, good] of Object.entries(WORDS)) {
    const re = new RegExp(`(^|.)\\b${bad}\\b(.?)`, "gi");
    text = text.replace(re, (m, before, after) => {
      const word = m.slice(before.length, m.length - after.length);
      if (PROTECTED.has(word.toLowerCase())) return m;
      if (before === "-" || before === "/") return m;
      if (after === "-" || after === "/") return m;
      count++;
      return before + matchCase(word, good) + after;
    });
  }
  for (const [re, good] of PHRASES) {
    // replace(re, string) interprete $1 ; via callback il serait litteral.
    const matches = text.match(re);
    if (matches) {
      count += matches.length;
      text = text.replace(re, good);
    }
  }
  return { text, count };
}

/** Repere les spans de chaines ("...", '...', `...`), les commentaires
 *  (// et /* *​/) et les segments de texte JSX brut (entre > et <), et
 *  n'applique les corrections qu'a l'interieur. Les commentaires sont
 *  traites AVANT la detection de chaines : une apostrophe francaise dans
 *  un commentaire (ex: "d'interet") ne doit jamais etre interpretee comme
 *  un guillemet de code, sous peine de desynchroniser tout le parseur.
 *  Le reste du fichier (code) est recopie tel quel. */
function processFile(source) {
  let out = "";
  let i = 0;
  let count = 0;
  const n = source.length;

  while (i < n) {
    const ch = source[i];

    // Commentaires bloc /* ... */ — traites comme prose isolee, jamais
    // comme du code (protege contre les apostrophes francaises internes).
    if (ch === "/" && source[i + 1] === "*") {
      let j = i + 2;
      while (j < n && !(source[j] === "*" && source[j + 1] === "/")) j++;
      const body = source.slice(i + 2, j);
      const { text: fixed, count: c } = fixProseFragment(body);
      count += c;
      out += "/*" + fixed + (j < n ? "*/" : "");
      i = j + 2;
      continue;
    }

    // Commentaires ligne // ... — idem, jusqu'a la fin de ligne.
    if (ch === "/" && source[i + 1] === "/") {
      let j = i + 2;
      while (j < n && source[j] !== "\n") j++;
      const body = source.slice(i + 2, j);
      const { text: fixed, count: c } = fixProseFragment(body);
      count += c;
      out += "//" + fixed;
      i = j;
      continue;
    }

    // Chaines classiques (" ' `) — on saute les caracteres echappes.
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      let j = i + 1;
      let body = "";
      let sawNewline = false;
      while (j < n && source[j] !== quote) {
        if (source[j] === "\\" && j + 1 < n) {
          body += source[j] + source[j + 1];
          j += 2;
          continue;
        }
        if (source[j] === "\n") sawNewline = true;
        body += source[j];
        j++;
      }
      // Garde anti-desynchronisation : une vraie chaine ' ou " tient sur
      // une seule ligne. Un saut de ligne signifie qu'on est parti d'une
      // apostrophe de TEXTE JSX (« l'actu ») : on n'etait pas dans une
      // chaine, on remet le caractere et on continue sans rien toucher.
      if (sawNewline && quote !== "`") {
        out += quote;
        i += 1;
        continue;
      }
      // Chaine utilisee comme valeur de discriminant de type (status:,
      // category:, id:) ou comme membre d'union litterale (precede de
      // '|' ou '= ' AVEC espace — style `type X = "a" | "b"` ; a
      // distinguer de l'attribut JSX `attr="valeur"`, colle sans espace,
      // qui doit rester une prose corrigeable) : jamais une prose.
      const lookback = source.slice(Math.max(0, i - 40), i);
      const isTypeToken =
        /\b(status|category|id)\s*:\s*$/.test(lookback) ||
        /\|\s*$/.test(lookback) ||
        /=\s+$/.test(lookback);
      if (isTypeToken) {
        out += quote + body + (j < n ? quote : "");
        i = j + 1;
        continue;
      }
      const { text: fixed, count: c } = fixProseFragment(body);
      count += c;
      out += quote + fixed + (j < n ? quote : "");
      i = j + 1;
      continue;
    }

    out += ch;
    i++;
  }

  return { text: out, count };
}

const write = process.argv.includes("--write");
const files = toGlobFiles();
let total = 0;
const changed = [];

for (const rel of files) {
  const abs = path.join(ROOT, rel);
  const original = readFileSync(abs, "utf8");
  const { text, count } = processFile(original);
  total += count;
  if (text !== original) {
    changed.push({ rel, count });
    if (write) writeFileSync(abs, text, "utf8");
  }
}

console.log(`Fichiers scannes : ${files.length}`);
console.log(`Fichiers modifies : ${changed.length}`);
console.log(`Remplacements : ${total}`);
for (const c of changed) console.log(`  - ${c.rel} (${c.count})`);
if (!write) console.log("\n(dry-run — relancer avec --write pour appliquer)");
