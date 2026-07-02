"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import Image from "next/image";
import { Plus, Minus, Locate, MapPin, Crosshair } from "lucide-react";
import { clsx } from "clsx";
import {
  mapImage,
  mapMarkers,
  markerCategories,
  type MarkerCategory,
  type MapMarker,
} from "@/lib/map";

const RATIO = mapImage.height / mapImage.width; // portrait: > 1
const MIN_SCALE = 1;
const MAX_SCALE = 5;

const colorFor = (cat: MarkerCategory) =>
  markerCategories.find((c) => c.id === cat)?.color ?? "#ffffff";

/**
 * Explorateur de carte facon jeu : l'image remplit tout le panneau
 * (fit-largeur), pan borne aux limites de la carte, zoom molette centre
 * sur le curseur, boutons "Aller a" pour voler vers une region.
 */
export function MapExplorer() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState({ w: 0, h: 0 });
  const [view, setView] = useState({ x: 0, y: 0, s: 1 });
  const [active, setActive] = useState<Record<MarkerCategory, boolean>>({
    region: true,
    ville: true,
    interet: true,
    activite: true,
    collectible: true,
  });
  const [selected, setSelected] = useState<MapMarker | null>(null);
  const drag = useRef<{ x: number; y: number; px: number; py: number; moved: boolean } | null>(null);

  const stageW = panel.w;
  const stageH = panel.w * RATIO;

  const clampView = useCallback(
    (x: number, y: number, s: number) => {
      const minX = Math.min(0, panel.w - stageW * s);
      const minY = Math.min(0, panel.h - stageH * s);
      const cx = stageW * s <= panel.w ? (panel.w - stageW * s) / 2 : Math.min(0, Math.max(minX, x));
      const cy = stageH * s <= panel.h ? (panel.h - stageH * s) / 2 : Math.min(0, Math.max(minY, y));
      return { x: cx, y: cy, s };
    },
    [panel.w, panel.h, stageW, stageH]
  );

  /* Mesure du panneau + vue initiale centree sur Vice City */
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setPanel({ w: r.width, h: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!panel.w) return;
    // vue initiale : plein cadre, centree sur Vice City (55 % de la hauteur)
    const y0 = panel.h / 2 - 0.553 * panel.w * RATIO;
    setView(clampView(0, y0, 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panel.w, panel.h]);

  /* Zoom molette (non-passif pour bloquer le scroll de page) */
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      setView((v) => {
        const s2 = Math.min(MAX_SCALE, Math.max(MIN_SCALE, v.s * Math.exp(-e.deltaY * 0.0016)));
        const k = s2 / v.s;
        return clampView(mx - (mx - v.x) * k, my - (my - v.y) * k, s2);
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [clampView]);

  const zoomAtCenter = (factor: number) =>
    setView((v) => {
      const s2 = Math.min(MAX_SCALE, Math.max(MIN_SCALE, v.s * factor));
      const k = s2 / v.s;
      const mx = panel.w / 2;
      const my = panel.h / 2;
      return clampView(mx - (mx - v.x) * k, my - (my - v.y) * k, s2);
    });

  const flyTo = (m: MapMarker) => {
    const s = 2.4;
    setSelected(m);
    setView(
      clampView(
        panel.w / 2 - (m.x / 100) * stageW * s,
        panel.h / 2 - (m.y / 100) * stageH * s,
        s
      )
    );
  };

  const reset = () => {
    const y0 = panel.h / 2 - 0.553 * stageH;
    setView(clampView(0, y0, 1));
  };

  function onPointerDown(e: PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    drag.current = { x: view.x, y: view.y, px: e.clientX, py: e.clientY, moved: false };
  }
  function onPointerMove(e: PointerEvent) {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.px;
    const dy = e.clientY - drag.current.py;
    if (Math.abs(dx) + Math.abs(dy) > 3) drag.current.moved = true;
    setView((v) => clampView(drag.current!.x + dx, drag.current!.y + dy, v.s));
  }
  function onPointerUp() {
    drag.current = null;
  }

  const visible = mapMarkers.filter((m) => active[m.category]);
  const quickNav = mapMarkers.filter((m) => m.quickNav);

  return (
    <div>
      {/* Barre "Aller a" */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-mega text-sand">
          <Crosshair className="h-3.5 w-3.5" /> Aller a
        </span>
        {quickNav.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => flyTo(m)}
            className={clsx(
              "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest transition-all",
              selected?.id === m.id
                ? "btn-sunset border-transparent text-bg"
                : "border-border text-muted hover:border-vice hover:text-ink"
            )}
          >
            {m.name.replace(" National Park", "")}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        {/* Panneau carte */}
        <div
          className="relative overflow-hidden rounded-3xl border border-border"
          style={{ backgroundColor: mapImage.ocean }}
        >
          <div
            ref={panelRef}
            className="relative h-[62vh] min-h-[420px] w-full cursor-grab touch-none select-none active:cursor-grabbing lg:h-[72vh]"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {panel.w > 0 && (
              <div
                className="absolute left-0 top-0"
                style={{
                  width: stageW,
                  height: stageH,
                  transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`,
                  transformOrigin: "0 0",
                }}
              >
                <Image
                  src={mapImage.src}
                  alt="Carte de l'Etat de Leonida (reconstitution communautaire, non officielle)"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="pointer-events-none object-cover"
                  priority
                />
                {visible.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      if (drag.current?.moved) return;
                      setSelected(m);
                    }}
                    className="absolute"
                    style={{
                      left: `${m.x}%`,
                      top: `${m.y}%`,
                      transform: `translate(-50%, -100%) scale(${1 / view.s})`,
                      transformOrigin: "50% 100%",
                    }}
                    aria-label={m.name}
                  >
                    <span className="flex flex-col items-center">
                      <MapPin
                        className={clsx(
                          "h-6 w-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-transform",
                          selected?.id === m.id && "scale-125"
                        )}
                        style={{ color: colorFor(m.category) }}
                        fill={colorFor(m.category)}
                        fillOpacity={selected?.id === m.id ? 0.7 : 0.35}
                      />
                      <span className="mt-0.5 whitespace-nowrap rounded-md bg-black/80 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                        {m.name}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Controles zoom */}
            <div className="absolute bottom-3 right-3 flex flex-col gap-1">
              <ZoomBtn label="Zoom avant" onClick={() => zoomAtCenter(1.45)}>
                <Plus className="h-4 w-4" />
              </ZoomBtn>
              <ZoomBtn label="Zoom arriere" onClick={() => zoomAtCenter(1 / 1.45)}>
                <Minus className="h-4 w-4" />
              </ZoomBtn>
              <ZoomBtn label="Recentrer" onClick={reset}>
                <Locate className="h-4 w-4" />
              </ZoomBtn>
            </div>

            <p className="absolute bottom-3 left-3 max-w-[58%] rounded-md bg-black/60 px-2 py-1 text-[10px] leading-tight text-white/80 backdrop-blur-sm">
              {mapImage.credit}
            </p>
          </div>
        </div>

        {/* Panneau lateral */}
        <aside className="flex flex-col gap-4">
          <div className="min-h-[150px] rounded-3xl border border-border bg-surface p-5">
            {selected ? (
              <>
                <div
                  className="mb-1 text-[10px] font-bold uppercase tracking-mega"
                  style={{ color: colorFor(selected.category) }}
                >
                  {markerCategories.find((c) => c.id === selected.category)?.label}
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wide text-ink">
                  {selected.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {selected.description}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted">
                Cliquez sur un marqueur (ou un bouton «&nbsp;Aller a&nbsp;»)
                pour afficher les details. Molette pour zoomer, glisser pour
                deplacer.
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-border bg-surface p-5">
            <h2 className="mb-3 text-[11px] font-bold uppercase tracking-mega text-sand">
              Filtres
            </h2>
            <div className="flex flex-col gap-2.5">
              {markerCategories.map((c) => (
                <label key={c.id} className="flex cursor-pointer items-center gap-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={active[c.id]}
                    onChange={() => setActive((a) => ({ ...a, [c.id]: !a[c.id] }))}
                    className="h-4 w-4 accent-[#FF3FB4]"
                  />
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="text-muted">{c.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-surface/60 p-5 text-xs leading-relaxed text-muted">
            Rockstar n'a pas encore publie la carte officielle de GTA 6. Cette
            reconstitution est l'oeuvre de la communaute (mapping project), a
            partir des trailers et screenshots officiels. Elle sera remplacee
            par la carte officielle des sa publication.
          </div>
        </aside>
      </div>
    </div>
  );
}

function ZoomBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="rounded-xl border border-white/20 bg-black/50 p-2 text-white backdrop-blur transition-colors hover:border-vice"
    >
      {children}
    </button>
  );
}
