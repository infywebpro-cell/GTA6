const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Formate une date ISO (YYYY-MM-DD) en français, ex: "26 mai 2026". */
export function formatDate(iso: string): string {
  // Force l'heure a midi UTC pour éviter les decalages de fuseau.
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return dateFormatter.format(d);
}
