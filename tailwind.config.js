/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        blue: "#16ABF8",
        dark: "#111111",
        gray: "#f4f4f4",
        "gray-text": "#888888",
        red: "#ED4C5C",
        green: "#00A790",
        yellow: "#FFCE31",
        "light-blue": "#43C4E3",
        purple: "#B01AFF",
      },
      boxShadow: {
        custom: "0px 6px 10px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
