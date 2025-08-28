import type { Config } from "tailwindcss";

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
      "primary": "#09381F",
      "secondary": "#E6D4E6",
      background: "#FAEBF4",
    },
    extend: {
      colors: {
        foreground: "var(--foreground)",
      },
      aspectRatio: {
        'recipe-card-large': '1.78'
      },
    },
  },
  plugins: [],
} satisfies Config;
