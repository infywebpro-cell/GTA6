import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || siteConfig.tagline).slice(0, 110);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0D0517",
          backgroundImage:
            "radial-gradient(circle at 50% 130%, rgba(255,122,69,0.55), rgba(217,55,110,0.35) 40%, transparent 65%), radial-gradient(circle at 0% 0%, rgba(138,92,255,0.28), transparent 45%)",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <div style={{ fontSize: 52, fontWeight: 800, color: "#FFF9FE", letterSpacing: 2 }}>
              GTA
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: 800,
                letterSpacing: 2,
                backgroundImage: "linear-gradient(92deg, #FF8A3C, #FF3FB4)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              VI
            </div>
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#C3AEE0",
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            {siteConfig.domain}
          </div>
        </div>

        <div
          style={{
            fontSize: 66,
            fontWeight: 800,
            color: "#FFF9FE",
            lineHeight: 1.05,
            maxWidth: 1020,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              backgroundImage: "linear-gradient(92deg, #FFD37E, #FF8A3C, #FF3FB4)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Guides · Carte · Vehicules · Soluces
          </div>
          <div style={{ fontSize: 24, color: "#FFD37E", fontWeight: 700 }}>
            19.11.2026
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
