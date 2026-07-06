/**
 * Quiz GTA 6 : uniquement des faits vérifiés (matériel officiel Rockstar).
 * Chaque question porte une explication : le quiz enseigne autant qu'il teste,
 * et chaque explication renvoie vers ce que couvrent nos guides.
 */

export interface QuizQuestion {
  question: string;
  choices: string[];
  /** Index de la bonne réponse dans choices. */
  answer: number;
  explanation: string;
}

export interface QuizRank {
  /** Score minimal (inclus) pour obtenir ce titre. */
  min: number;
  title: string;
  text: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Quelle est la date de sortie officielle de GTA 6 ?",
    choices: ["26 mai 2026", "19 novembre 2026", "17 septembre 2026", "Début 2027"],
    answer: 1,
    explanation:
      "Rockstar a confirmé le 19 novembre 2026 sur PS5 et Xbox Series X|S, après un report depuis l'automne 2025.",
  },
  {
    question: "Comment s'appelle l'État fictif où se déroule le jeu ?",
    choices: ["San Andreas", "Alderney", "Leonida", "Liberty State"],
    answer: 2,
    explanation:
      "Leonida est la version Rockstar de la Floride. Vice City en est la métropole, mais l'État compte aussi marais, montagnes et archipel.",
  },
  {
    question: "Qui sont les deux personnages jouables ?",
    choices: ["Michael et Trevor", "Tommy et Mercedes", "Carl et Sweet", "Jason et Lucia"],
    answer: 3,
    explanation:
      "Jason Duval et Lucia Caminos forment le premier duo homme-femme jouable de la série, présenté façon Bonnie and Clyde.",
  },
  {
    question: "Quel est le prix de l'édition standard en France ?",
    choices: ["59,99 €", "69,99 €", "79,99 €", "89,99 €"],
    answer: 2,
    explanation:
      "79,99 € pour la standard, 99,99 € pour l'édition Ultimate et ses bonus. Les précommandes sont ouvertes depuis le 25 juin 2026.",
  },
  {
    question: "De quelle ville réelle Vice City s'inspire-t-elle ?",
    choices: ["Los Angeles", "Miami", "La Nouvelle-Orléans", "Atlanta"],
    answer: 1,
    explanation:
      "Front de mer art déco, plages, néons et culture latino : Vice City est la Miami de l'univers GTA depuis 2002.",
  },
  {
    question: "Quand le premier trailer a-t-il été publié ?",
    choices: ["4 décembre 2018", "26 octobre 2011", "1er février 2024", "5 décembre 2023"],
    answer: 3,
    explanation:
      "Diffusé le 5 décembre 2023 avec un jour d'avance après une fuite, il a explosé les records de vues sur YouTube.",
  },
  {
    question: "Sur quelles plateformes GTA 6 sort-il au lancement ?",
    choices: [
      "PS5 et Xbox Series X|S",
      "PS5, Xbox Series X|S et PC",
      "PS5 uniquement",
      "Toutes plateformes, Switch 2 comprise",
    ],
    answer: 0,
    explanation:
      "Aucune version PC n'est annoncée au lancement, fidèle à l'habitude Rockstar : GTA 5 avait attendu 19 mois avant d'arriver sur PC.",
  },
  {
    question: "Comment s'appelle le trafiquant old-school installé dans les Keys ?",
    choices: ["Cal Hampton", "Brian Heder", "Raul Bautista", "Boobie Ike"],
    answer: 1,
    explanation:
      "Brian Heder, dévoilé sur le site officiel. Cal, Raul et Boobie font aussi partie du casting confirmé de Leonida.",
  },
  {
    question: "Quelle région de Leonida s'inspire des Everglades ?",
    choices: ["Mount Kalaga", "Port Gellhorn", "Grassrivers", "Ambrosia"],
    answer: 2,
    explanation:
      "Grassrivers : marais, alligators et hydroglisseurs. Mount Kalaga est le parc national montagneux du nord de la carte.",
  },
  {
    question: "Quel animal s'invite dans une supérette dès le trailer 1 ?",
    choices: ["Un alligator", "Un flamant rose", "Un puma", "Un pélican"],
    answer: 0,
    explanation:
      "L'alligator, star officieuse de Leonida. La faune est mise en avant partout dans le matériel officiel, piscines comprises.",
  },
  {
    question: "Que contient l'édition Ultimate en plus de la standard ?",
    choices: [
      "Une semaine d'accès anticipé",
      "Une mission exclusive",
      "Un quartier bonus de Vice City",
      "La Dominator de 1967 et le garage Paradise",
    ],
    answer: 3,
    explanation:
      "Des bonus véhicule et garage à Watson Bay, pas de contenu de mission exclusif. On détaille tout dans notre comparatif des éditions.",
  },
  {
    question: "Combien de temps sépare le trailer 1 de la sortie du jeu ?",
    choices: ["Environ 1 an", "Environ 2 ans", "Presque 3 ans", "Plus de 4 ans"],
    answer: 2,
    explanation:
      "Du 5 décembre 2023 au 19 novembre 2026 : presque trois ans d'attente. Notre compte à rebours tourne depuis le premier jour.",
  },
];

/** Paliers de résultat, du plus haut au plus bas. */
export const quizRanks: QuizRank[] = [
  {
    min: 11,
    title: "Légende de Leonida",
    text: "Score parfait ou presque. Rockstar devrait vous embaucher comme consultant. Respect.",
  },
  {
    min: 8,
    title: "Vétéran de Vice City",
    text: "Vous connaissez votre sujet. Quelques détails vous échappent encore, nos dossiers sont là pour ça.",
  },
  {
    min: 5,
    title: "Citoyen de Leonida",
    text: "Les fondamentaux sont là, mais vous suivez l'actu de loin. Un tour dans nos guides et vous serez au niveau.",
  },
  {
    min: 0,
    title: "Touriste de passage",
    text: "Vous débarquez à peine à l'aéroport de Vice City. Bonne nouvelle : tout ce qu'il faut savoir est sur ce site, gratuitement.",
  },
];

export function rankForScore(score: number): QuizRank {
  return quizRanks.find((r) => score >= r.min) ?? quizRanks[quizRanks.length - 1];
}
