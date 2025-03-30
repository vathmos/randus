// tailwind.config.js
import { heroui } from "@heroui/react"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",


  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        "blurple-dark": {
          extend: "dark",
          colors: {
            background: "#0A0120",
            foreground: "#ffffff",
            primary: {
              50: "#1B0F40",
              100: "#281C5D",
              200: "#382A7D",
              300: "#4A3A9E",
              400: "#5D4DC2",
              500: "#715FE2",
              600: "#8A7EFF",
              700: "#A99AFF",
              800: "#C7BBFF",
              900: "#E3DAFF",
              DEFAULT: "#715FE2",
              foreground: "#ffffff",
            },
            focus: "#8A7EFF",
          },
        },
        "blurple-light": {
          extend: "light",
          colors: {
            background: "#F5F3FF",
            foreground: "#1A1A2E",
            primary: {
              50: "#EAE6FF",
              100: "#D4CFFF",
              200: "#B5A3FF",
              300: "#9477FF",
              400: "#7852FF",
              500: "#5E30FF",
              600: "#4B1ED9",
              700: "#3A0EB5",
              800: "#2A0091",
              900: "#1A006E",
              DEFAULT: "#5E30FF",
              foreground: "#ffffff",
            },
            focus: "#4B1ED9",
          },
        },

      },
    }),
  ],
}