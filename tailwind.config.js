/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./app/globals.css",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ["Maghfirea", ...defaultTheme.fontFamily.sans],
        menu: ["Source Serif Pro", ...defaultTheme.fontFamily.sans],
        body: ["Source Sans 3", ...defaultTheme.fontFamily.sans],

        // Add your custom font family here
      },
      colors: {
        ...colors,

        //green shade
        primary: {
          100: "#E1F7E3",
          200: "#C4F0CE",
          300: "#99D3AC",
          400: "#6EA887",
          500: "#3C6F57",
          600: "#2B5F4C",
          700: "#1E4F42",
          800: "#134038",
          900: "#0B3532",
        },

        // yellow shade
        secondary: {
          100: "#FDF5D9",
          200: "#FCEAB4",
          300: "#F7D88D",
          400: "#EFC56F",
          500: "#E5A942",
          600: "#C48830",
          700: "#A46A21",
          800: "#844F15",
          900: "#6D3B0C",
        },

        offWhite: {
          100: "#FDFDFB",
          200: "#FCFBF7",
          300: "#F7F5F0",
          400: "#F0EDE8",
          500: "#E7E3DC",
          600: "#C6B7A0",
          700: "#A68E6E",
          800: "#856746",
          900: "#6E4B2A",
        },
        pink: {
          100: "#FDE0D2",
          200: "#FBBAA6",
          300: "#F38A79",
          400: "#E85D56",
          500: "#DA232A",
          600: "#BB192E",
          700: "#9C112F",
          800: "#7E0B2E",
          900: "#68062D",
        },
        offBlack: {
          100: "#F3EFF0",
          200: "#E8E0E3",
          300: "#BCB2B7",
          400: "#2c2728",
          500: "#221F21",
          600: "#1D161B",
          700: "#180F17",
          800: "#130913",
          900: "#0F0510",
        },
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        tiny: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
    },
  },
  css: ["index.css", "./app/globals.css"],
  plugins: [require("flowbite/plugin")],
};
