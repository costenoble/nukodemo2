/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        "surface-soft": "var(--surface-soft)",
        "surface-strong": "var(--surface-strong)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "on-surface": "var(--on-surface)",
        "on-surface-muted": "var(--on-surface-muted)",
        outline: "var(--outline)"
      },
      fontFamily: {
        headline: ["Space Grotesk", "Avenir Next", "sans-serif"],
        body: ["Manrope", "Avenir Next", "sans-serif"],
        label: ["Space Grotesk", "Avenir Next", "sans-serif"]
      },
      boxShadow: {
        atmospheric: "0 20px 70px rgba(18, 18, 16, 0.12)"
      }
    }
  },
  plugins: []
};
