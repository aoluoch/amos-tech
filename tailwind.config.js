/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#fafafa",
        ink: "#061826",
        brand: "#0b4778",
        teal: "#75d7cf",
        steel: "#5f7180",
        ash: "#d9e2e8"
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "JetBrains Mono", "ui-monospace", "monospace"]
      },
      boxShadow: {
        hard: "5px 5px 0 #061826"
      }
    }
  },
  plugins: []
};
