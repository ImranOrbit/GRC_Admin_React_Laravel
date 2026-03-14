/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "custom-blue": "#f16f22",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")], // <-- here, at root level
  darkMode: "class", // Enable dark mode via class
};
