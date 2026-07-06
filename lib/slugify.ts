/**
 * Slug d'ancre stable à partir d'un titre : accents retirés, minuscules,
 * séparateurs normalisés. Partagé entre le rendu des H2 (Markdown.tsx)
 * et l'extraction du sommaire (toc.ts) pour garantir des ancres identiques.
 */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Extrait les titres H2 d'un corps Markdown pour construire le sommaire.
 * Retire gras et liens pour ne garder que le texte affiché (même base
 * que ce que voit le renderer H2, donc mêmes ids).
 */
export function extractToc(body: string): TocItem[] {
  const items: TocItem[] = [];
  for (const line of body.split("\n")) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const label = m[1]
      .replace(/\*\*/g, "")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .trim();
    items.push({ id: slugify(label), label });
  }
  return items;
}
