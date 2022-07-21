const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          default: colors.green[700],
          "accent-1": colors.green[600],
          "accent-2": colors.green[800],
          "accent-3": colors.green[500],
          "accent-4": colors.green[900],
        },
      },
    },
  },
  plugins: [],
};
