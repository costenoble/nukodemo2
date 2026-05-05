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
        headline: ["Barlow", "Barlow Condensed", "Helvetica Neue", "sans-serif"],
        body: ["Manrope", "Helvetica Neue", "sans-serif"],
        label: ["Barlow", "Helvetica Neue", "sans-serif"]
      },
      boxShadow: {
        atmospheric: "0 8px 40px rgba(0, 0, 0, 0.08)"
      }
    }
  },
  plugins: []
};
