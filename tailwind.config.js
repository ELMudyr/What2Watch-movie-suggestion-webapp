/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./Frontend/*.{html,js}"],

  theme: {
    extend: {
      colors: {
        Primary: {
          Text: "#F4E1E3",
          Background: "#1a090a",
          Primary: "#DF8C94",
          Secondary: "#7e1e28",
          Accent: "#d73343",
        },
      },
      fontFamily: {
        Rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
