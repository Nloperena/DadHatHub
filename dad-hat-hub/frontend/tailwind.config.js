/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: '#DB5461',       // Indian red
        pink: '#FFD9CE',      // Pale Dogwood
        purple: {
          DEFAULT: '#593C8F', // Base color for purple
          '700': '#4b327a',   // Darker shade for purple hover state
        },
        cyan: '#8EF9F3',      // Ice blue
        navy: '#171738',      // Space cadet
      },
    },
  },
  plugins: [],
}
