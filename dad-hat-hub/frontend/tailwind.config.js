/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2F2504',      // Dark drab brown
        secondary: '#594E36',    // Light drab brown
        accent: '#7E846B',       // Accent color
        background: '#A5AE9E',   // Ash gray
        textcolor: '#D0DDD7',    // Platinum
      },
      boxShadow: {
        'inset-sm': 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
        'inset-md': 'inset 0 4px 6px rgba(0, 0, 0, 0.1)',
        'inset-lg': 'inset 0 10px 15px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
