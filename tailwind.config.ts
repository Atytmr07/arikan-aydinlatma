import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand A — Arıkan Aydınlatma (Mağaza) — RED / WHITE editorial
        magaza: {
          bg: "#FFFFFF",
          "bg-alt": "#F6F3EF",
          surface: "#FBF9F6",
          text: "#16130F",
          muted: "#8A8178",
          accent: "#E11B22",
          "accent-dark": "#BE0F16",
          border: "rgba(0,0,0,0.10)",
        },
        // Brand B — Arıkan Exclusive — BLACK / GOLD luxury
        exclusive: {
          bg: "#0A0908",
          surface: "#141210",
          text: "#F0EADF",
          muted: "#978E82",
          accent: "#D4AF6E",
          "accent-soft": "#E3C892",
        },
      },
      fontFamily: {
        marcellus: ["'Marcellus'", "serif"],
        jost: ["'Jost'", "sans-serif"],
        cormorant: ["'Cormorant'", "serif"],
        montserrat: ["'Montserrat'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
