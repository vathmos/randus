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
            background: "#0A0120", // Darker than indigo, moody & deep
            foreground: "#ffffff",
            primary: {
              50: "#1B0F40",
              100: "#281C5D",
              200: "#382A7D",
              300: "#4A3A9E",
              400: "#5D4DC2",
              500: "#715FE2", // True blurple magic ✨
              600: "#8A7EFF",
              700: "#A99AFF",
              800: "#C7BBFF",
              900: "#E3DAFF",
              DEFAULT: "#715FE2",
              foreground: "#ffffff",
            },
            focus: "#8A7EFF", // Soft glowing indigo accent
          },
        },

      },
    }),
  ],
}