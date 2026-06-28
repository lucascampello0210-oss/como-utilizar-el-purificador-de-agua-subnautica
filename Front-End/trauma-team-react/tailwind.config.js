/** @type {import('tailwindcss').Config} */
export default {
  // Use class-based dark mode (controlled via JS, like the original theme.js)
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
