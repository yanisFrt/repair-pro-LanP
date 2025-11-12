import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/images/bg.jpg')",
        supernova: "url('/images/peakpx.jpg')",
        "custom-radial": "radial-gradient(at center, #010109 0%, #030D19 46%, #010109 100%)",
      },
      fontSize: {
        "48px": "48px", // Ajoute une taille de police de 48px
      },
      lineHeight: {
        "80px": "80px", // Ajoute une hauteur de ligne de 80px
      },
      letterSpacing: {
        "20p": "40%", // Ajoute un espacement des lettres de 20%
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-teal": "#6ABBB2",
      },
    },
  },
  plugins: [],
};
export default config;
