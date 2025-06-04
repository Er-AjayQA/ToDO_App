/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          primary: "#7E22CE",
          hover: "#9333EA",
          dark: "#6B21A8",
          accent: "#A855F7",
          light: "#D8B4FE",
        },
        blue: {
          primary: "#517BE6",
          hover: "#0066cc",
          dark: "#4168CF",
          accent: "#00cccc",
          light: "#00ffcc",
        },
      },
    },
  },
  plugins: [],
};
