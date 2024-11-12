const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    colors: {
      rosado: "#ff346f",
      secondary: "#fffff",
      accent: "#8291b1",
      success: "#00ff00",
      warning: "#ffcc00",
      error: "#ff0000",
      white: "#ffffff",
      black: "#000000",
      gray: {
        50: "#f9fafb",
        100: "#f4f5f7",
        200: "#e5e7eb",
        300: "#d2d6dc",
        400: "#9fa6b2",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#252f3f",
        900: "#161e2e",
      },
    },
    boxShadow: {
      'white-glow': '0 2px 45px 0px #ffff',  // sombra suave blanca
    },
  },
  darkMode: "class",
  plugins: [nextui(), require('flowbite/plugin'), require('tailwindcss-animated')],
}