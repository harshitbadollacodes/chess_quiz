// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "white": "#fff",
        "black": "#000",
        "O-white": "#FAF9F6",
        "navy": "#20232A",
        "l-navy": "#282C34"
      },
      boxShadow: {
        card: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
      }
    },
  },
  
  variants: {
    extend: {},
  },
  plugins: [],
}

 