import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "blackboard": {
        500: "#1e1e1e",
        400: "#343a40",
        300: "#868e96",
      },
      white: colors.white,
      blue: colors.blue,
      red: colors.red

    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      aspectRatio: {
        'recipe-card-large': '1.78'
      },
    },
  },
  plugins: [],
} satisfies Config;
