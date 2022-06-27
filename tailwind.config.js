/** @type {import('tailwindcss').Config} */ // eslint-disable-next-line no-undef
module.exports = {
  content: ["index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: "400px",
      "tablet-sm": "650px",
      tablet: "860px",
      laptop: "1040px",
      "desktop-sm": "1280px",
      desktop: "1460px",
    },
    fontFamily: {
      sans: ["Euclid Square", "sans-serif"],
      serif: ["Inter", "sans-serif"],
    },
    colors: {
      white: "#FFFFFF",
      "gray-100": "#F3F4F6",
      "gray-300": "#D1D5DB",
      "gray-400": "#9CA3AF",
      "gray-500": "#6B7280",
      "gray-700": "#374151",
      "gray-900": "#111827",
      "indigo-600": "#471F7A",
      "yellow-300": "#FCD34D",
    },
    extend: {
      //
    },
  },
  plugins: [],
};
