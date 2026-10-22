/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wedding-wine': '#7c242f',
        'wedding-gold': '#c89f53',
        'wedding-cream': '#faf8f5',
        'wedding-light-gold': '#e8c877',
      },
      fontFamily: {
        'serif': ['"Cormorant Garamond"', 'serif'],
        'script': ['"Alex Brush"', 'cursive'],
        'sans': ['Jost', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
