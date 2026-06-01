export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
        script: ["Allura", "cursive"],
      },
      colors: {
        night: "#050813",
        ink: "#dfe6ff",
        lilac: "#a989ff",
        rose: "#ff8db9",
        cyan: "#7ee7ff",
      },
      boxShadow: {
        glow: "0 0 45px rgba(169, 137, 255, 0.26)",
        glass: "0 22px 80px rgba(0, 0, 0, 0.38)",
      },
    },
  },
  plugins: [],
};
