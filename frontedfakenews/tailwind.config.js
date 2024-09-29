/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // add purple color
        purple: {
          50: "#f3ebff",
          100: "#e3ccff",
          200: "#d3adff",
          300: "#c38eff",
          400: "#b36fff",
          500: "#a350ff",
          600: "#8a2ee6",
          700: "#6e24bf",
          800: "#511a99",
          900: "#350f73",
        },
      },
    },
  },
  plugins: [],
};
