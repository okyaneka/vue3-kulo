/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EBEDF8",
          100: "#CED2ED",
          200: "#AEB5E2",
          300: "#8D97D6",
          400: "#7480CD",
          500: "#5C6AC4",
          600: "#5462BE",
          700: "#4A57B6",
          800: "#414DAF",
          900: "#303CA2",
        },
      },
    },
  },
  plugins: [],
};
