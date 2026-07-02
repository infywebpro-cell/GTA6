import type { LucideIcon } from "lucide-react";
import { Newspaper, BookOpen, ListChecks, Sparkles } from "lucide-react";

/** Categories editoriales (articles). Les sections "Carte" et "Vehicules"
 *  sont des fonctionnalites dediees, pas des categories d'articles. */
export type Category = "actu" | "guides" | "soluces" | "astuces";

export const CATEGORIES: Category[] = ["actu", "guides", "soluces", "astuces"];

export interface CategoryMeta {
  slug: Category;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const categoryMeta: Record<Category, CategoryMeta> = {
  actu: {
    slug: "actu",
    label: "Actu",
    title: "Actualites GTA 6",
    description:
      "Toute l'actualite de Grand Theft Auto VI : date de sortie, mises a jour, contenus et annonces de Rockstar Games.",
    icon: Newspaper,
  },
  guides: {
    slug: "guides",
    label: "Guides",
    title: "Guides GTA 6",
    description:
      "Nos guides complets pour bien debuter et progresser dans GTA 6 : prise en main, argent, personnages, configuration PC.",
    icon: BookOpen,
  },
  soluces: {
    slug: "soluces",
    label: "Soluces",
    title: "Soluces GTA 6",
    description:
      "Les soluces de GTA 6 : missions de l'histoire principale, missions secondaires et collectibles, pas a pas.",
    icon: ListChecks,
  },
  astuces: {
    slug: "astuces",
    label: "Astuces",
    title: "Astuces et codes GTA 6",
    description:
      "Astuces, codes de triche, argent facile et secrets de GTA 6 pour tirer le meilleur du jeu.",
    icon: Sparkles,
  },
};

export function isCategory(value: string): value is Category {
  return (CATEGORIES as string[]).includes(value);
}
