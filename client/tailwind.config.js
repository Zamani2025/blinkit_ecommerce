/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bounceOnce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20%)" },
        },
      },
      animation: {
        bounceOnce: "bounceOnce 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
