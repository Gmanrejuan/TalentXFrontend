/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       
    "./components/**/*.{js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {
      fontFamily: {
        drukwide: ['"Druk Wide"', 'sans-serif'],
      },
      colors: {
        primary: "#2563EB",
        secondary: "#9333EA",
        accent: "#F59E0B",
        danger: "#DC2626",
        'gradient-start': '#76FEE2',
        'gradient-end': '#B0FF6A',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #76FEE2, #B0FF6A)',
      },
    },
  },
  plugins: [],
};
