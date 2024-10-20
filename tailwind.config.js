module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        violet: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
      },
      fontFamily: {
        montserrat: ['"Montserrat"', "sans-serif"], // Adding Montserrat font family
      },
      darkMode: "class",

      screens: {
        sm: "640px", // Small devices (mobile)
        md: "768px", // Medium devices (tablet)
        lg: "1024px", // Large devices (laptop)
        xl: "1280px", // Extra large devices (desktop)
        "2xl": "1536px", // 2XL screens (larger desktops)
      },
    },
  },
  plugins: [],
};
