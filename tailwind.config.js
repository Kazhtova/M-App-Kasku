/** @type {import('tailwindcss').Config} */
module.exports = {
  // Pastikan mencakup semua file JS/JSX di root dan di dalam folder src
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./global.css"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}