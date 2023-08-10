/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./app/globals.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ["Maghfirea", ...defaultTheme.fontFamily.sans],
        body: ["Source Serif Pro", ...defaultTheme.fontFamily.sans],
        menu: ["Source Sans 3", ...defaultTheme.fontFamily.sans],

        // Add your custom font family here
      },
      colors: {
        ...colors,
        background: "#DA232A",
        offWhite: "#E7E3DC",
        offBlack: "221F21",
        primary: {
          100: "#3C6F57",
          200: "#3d6f58",
        },
        secondary: {
          100: "#E5A942",
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
  plugins: [],
};
