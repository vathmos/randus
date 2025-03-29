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
  plugins: [heroui()],
};