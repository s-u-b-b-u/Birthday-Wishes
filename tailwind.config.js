/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#fffcf5',
          100: '#fff9e6',
          200: '#ffefc2',
          300: '#ffe18f',
          400: '#ffca52',
          500: '#ffaa1a',
          600: '#e68a00',
          700: '#bf6a00',
          800: '#995100',
          900: '#7d4300',
        },
        cream: '#fdfbf7',
        accent: '#f59e0b', // Amber 500
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
