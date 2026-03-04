/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B91C1C",
        darkbg: "#111111",
      },
      scrollbar: {
        thumb: {
          DEFAULT: '#d1d5db',
        },
        track: {
          DEFAULT: '#f3f4f6',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}