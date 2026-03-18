/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        brand: {
          indigo: "#6366f1",
          violet: "#fff",
          pink:   "#ffff",
        },
      },
      backgroundImage: {
        // Reusable gradient shorthand — use as bg-move
        "move": "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
      },
    },
  },
  plugins: [],
};