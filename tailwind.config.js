/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red1: "#A60D40",
        red2: "#890A34",
        red3: "#3E0000",

        orange1: "#FF6633",
        orange2: "#E95725",

        yellow1: "#FFFF00",
        yellow2: "#ffee00",

        negro: {
          900: "#000000",
          800: "#0a0a0a",
          700: "#121212",
          600: "#1E1E20",
          500: "#272727",
          400: "#232323",
          300: "#2C2C2C",
          200: "#2E2E2E",
          100: "#383838",
        },
        gris: {
          100: "#F5f5f1",
          200: "#EEF2DD",
          300: "#dedede",
          400: "#D5D5D5",
          500: "#C3C3C3",
          600: "9ca3af",
        },
      },
    },
  },
  plugins: [],
}
