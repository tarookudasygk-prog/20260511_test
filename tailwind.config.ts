import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Hiragino Sans"', '"Noto Sans JP"', "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          900: "#0b0d12",
          800: "#11141b",
          700: "#1a1f2b",
          600: "#262d3d",
          500: "#3a4257",
          400: "#6b7592",
          300: "#9aa3bf",
          200: "#c8cee0",
          100: "#e6e9f3",
        },
        gold: {
          400: "#f5c451",
          500: "#e6a93a",
          600: "#c98a1a",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(245,196,81,0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
