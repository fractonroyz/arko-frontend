import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Near-black background
        bg: {
          primary: "#0d0d0d",
          secondary: "#151515",
          tertiary: "#1a1a1a",
          elevated: "#202020",
        },
        // Muted grays for text
        text: {
          primary: "#d4d4d4",
          secondary: "#8a8a8a",
          tertiary: "#5a5a5a",
          ghost: "#3a3a3a",
        },
        // Minimal accent - only for states
        accent: {
          dim: "#2a4a2a",
          base: "#3a5a3a",
          bright: "#4a6a4a",
        },
        // Borders
        border: {
          subtle: "#1f1f1f",
          visible: "#2a2a2a",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["IBM Plex Mono", "Courier New", "monospace"],
      },
      fontSize: {
        xs: ["13px", { lineHeight: "1.5" }],
        sm: ["14px", { lineHeight: "1.6" }],
        base: ["15px", { lineHeight: "1.6" }],
        lg: ["17px", { lineHeight: "1.6" }],
        xl: ["20px", { lineHeight: "1.5" }],
      },
      spacing: {
        section: "clamp(2rem, 5vw, 4rem)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
