"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Façade YouTube ultra-légère : miniature + bouton play, l'iframe
 * (youtube-nocookie) n'est injectée qu'au clic. Zéro JS YouTube au
 * chargement, donc aucun impact sur le LCP ni sur l'INP.
 */
export function YouTubeLite({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);

  if (play) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-border">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlay(true)}
      aria-label={`Lire la vidéo : ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-border text-left"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- miniature YouTube externe */}
      <img
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="btn-sunset flex h-16 w-16 items-center justify-center rounded-full shadow-glow-pink">
          <Play className="ml-1 h-7 w-7 text-bg" fill="currentColor" />
        </span>
      </span>
      <span className="absolute bottom-3 left-4 right-4 text-sm font-semibold text-ink drop-shadow">
        {title}
      </span>
    </button>
  );
}
