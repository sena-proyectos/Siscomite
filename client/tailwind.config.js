/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react"

module.exports = {
  content: ["./src/**/*.{html,js}", './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}