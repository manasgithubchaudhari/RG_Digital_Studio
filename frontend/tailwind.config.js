/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#7c3bed",
        "background-light": "#FDFCFE",
        "background-dark": "#0F071B",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"]
      },
      borderRadius: {
        "full": "9999px",
        "lg": "0.5rem",
        "xl": "0.75rem",
      },
    },
  },
  plugins: [],
}
