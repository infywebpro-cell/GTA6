import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette "Vice City sunset" (clin d'oeil au key art officiel GTA VI :
        // violet profond -> rose flamant -> orange couchant -> lueur sable)
        bg: "#0D0517",
        surface: "#170A28",
        "surface-2": "#21103A",
        border: "#35205A",
        ink: "#FFF9FE",
        muted: "#C3AEE0",
        // Corps de texte long : plus clair que muted pour un contraste AA confortable.
        body: "#DCD2F0",
        vice: {
          DEFAULT: "#FF3FB4",
          300: "#FF7ED2",
          600: "#E0209A",
        },
        sunset: {
          DEFAULT: "#FF8A3C",
          300: "#FFB37E",
          600: "#F26D14",
        },
        haze: {
          DEFAULT: "#8A5CFF",
          300: "#B394FF",
        },
        sand: "#FFD37E",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "sans-serif"],
      },
      boxShadow: {
        "glow-pink": "0 0 40px -8px rgba(255,63,180,0.55)",
        "glow-orange": "0 0 40px -8px rgba(255,138,60,0.5)",
      },
      letterSpacing: {
        mega: "0.35em",
      },
      maxWidth: {
        prose: "72ch",
      },
    },
  },
  plugins: [],
};

export default config;
