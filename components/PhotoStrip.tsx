import Image from "next/image";

const SHOTS = [
  { src: "/images/screen-vice-city-1.jpg", alt: "Vice City — screenshot officiel" },
  { src: "/images/screen-keys.jpg", alt: "Leonida Keys — screenshot officiel" },
  { src: "/images/screen-vice-city-3.jpg", alt: "Vice City — screenshot officiel" },
  { src: "/images/screen-kalaga.jpg", alt: "Mount Kalaga — screenshot officiel" },
  { src: "/images/screen-rideout-customs.jpg", alt: "Rideout Customs — screenshot officiel" },
  { src: "/images/screen-grassrivers.jpg", alt: "Grassrivers — screenshot officiel" },
  { src: "/images/screen-vice-city-6.jpg", alt: "Vice City — screenshot officiel" },
  { src: "/images/screen-gellhorn.jpg", alt: "Port Gellhorn — screenshot officiel" },
];

/** Bande de screenshots officiels en defilement continu (pur CSS). */
export function PhotoStrip() {
  const strip = [...SHOTS, ...SHOTS];
  return (
    <section aria-label="Screenshots officiels de GTA 6" className="border-y border-border bg-surface/40 py-6">
      <div className="mask-fade-x overflow-hidden">
        <div className="animate-marquee flex w-max gap-4 [animation-duration:60s]">
          {strip.map((s, i) => (
            <div
              key={i}
              className="relative aspect-video h-40 shrink-0 overflow-hidden rounded-2xl border border-border sm:h-52"
              aria-hidden={i >= SHOTS.length}
            >
              <Image
                src={s.src}
                alt={i < SHOTS.length ? s.alt : ""}
                fill
                sizes="370px"
                quality={60}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-mega text-muted">
        Screenshots officiels — © Rockstar Games
      </p>
    </section>
  );
}
