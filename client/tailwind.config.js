/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#43cde8",
        accent: "#B809C3",
      },

      keyframes: {
        slide: {
          "0%,100%": {
            backgroundImage:
              "linear-gradient(to right, #08b6f088 50%, #ce0ce89d 50%)",
            backgroundSize: "200% 200%",
            backgroundPosition: "right ",
          },
          "100%": {
            backgroundPosition: "left",
          },
        },
      },
      animation: {
        slide: "slide 1s ease-in-out",
      },
    },
  },
  screens: {
    sm: "640px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  },
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
};
