/**
 * En-tete de page unifie : kicker + titre affiche (mot en degrade) + lede
 * + separateur sunset. Garantit la coherence entre toutes les pages.
 */
export function PageHeader({
  kicker,
  title,
  gradientWord,
  lede,
}: {
  kicker: string;
  /** Partie du titre en couleur encre (avant le mot en degrade). */
  title: string;
  /** Mot mis en valeur en degrade sunset (optionnel). */
  gradientWord?: string;
  lede?: string;
}) {
  return (
    <header className="mb-10">
      <p className="text-[11px] font-bold uppercase tracking-mega text-sand">
        {kicker}
      </p>
      <h1 className="mt-2 font-display text-5xl uppercase leading-none tracking-wide sm:text-7xl">
        {title}
        {gradientWord && (
          <>
            {" "}
            <span className="text-gradient">{gradientWord}</span>
          </>
        )}
      </h1>
      {lede && <p className="mt-4 max-w-2xl text-muted">{lede}</p>}
      <div className="divider-sunset mt-8" />
    </header>
  );
}
