/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "neon-green": "#39ff14",
        "neon-purple": "#BC13FE",
        "neon-orange": "#FF5F1F",
        "neon-pink": "#ff00ff",
      },
      keyframes: {
        tickers: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50% - 20px))" },
        },
        "infinite-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50% - 20px))" },
        },
        "infinite-scroll-reverse": {
          "0%": { transform: "translateX(calc(-50% - 20px))" },
          "100%": { transform: "translateX(0)" },
        },
        "rotate-yt-logo": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        tickers: "tickers 40s linear infinite",
        "infinite-scroll": "infinite-scroll 40s linear infinite",
        "infinite-scroll-reverse":
          "infinite-scroll-reverse 20s linear infinite",

        "home-scroll": "infinite-scroll 40s linear infinite",
      },
    },
  },
  plugins: [],
};
