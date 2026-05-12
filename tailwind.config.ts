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
        serif: ['"Hiragino Mincho ProN"', '"Noto Serif JP"', "serif"],
      },
      colors: {
        paper: {
          50: "#fbfaf6",
          100: "#f5f2e9",
          200: "#ece7d4",
          300: "#ddd3b8",
        },
        ink: {
          900: "#1a1612",
          800: "#2a2520",
          700: "#3d362e",
          600: "#5a4f43",
          500: "#7a6d5e",
          400: "#9d8f7e",
          300: "#bfb29f",
          200: "#d6cab5",
          100: "#e8dfca",
        },
        brand: {
          50: "#fff8e8",
          100: "#ffeec3",
          200: "#f7d97a",
          400: "#d99a2a",
          500: "#b87815",
          600: "#955e10",
          700: "#704608",
        },
        accent: {
          green: "#3f8a4e",
          red: "#c64545",
          amber: "#d4933a",
          blue: "#3a6bb8",
        },
      },
      boxShadow: {
        card: "0 2px 6px rgba(60,40,20,0.06), 0 1px 2px rgba(60,40,20,0.04)",
        cardHover: "0 12px 28px rgba(60,40,20,0.10), 0 4px 8px rgba(60,40,20,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
