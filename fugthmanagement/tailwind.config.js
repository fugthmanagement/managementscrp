/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        luxe: "0 30px 80px rgba(0, 0, 0, 0.45)",
      },
      colors: {
        ink: "#050505",
        panel: "#111113",
        line: "#26262b",
        accent: "#f4f4f5",
        muted: "#a1a1aa",
      },
      backgroundImage: {
        grid: "radial-gradient(circle at top, rgba(255,255,255,0.12), transparent 35%), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "100% 100%, 36px 36px, 36px 36px",
      },
    },
  },
  plugins: [],
};
