/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B1120', // Deepest Navy/Black
        surface: '#151e32',   // Slightly lighter navy for cards
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          50: '#fbf8f2',
          100: '#faeec8',
          200: '#f5e0a0',
          300: '#f0d075',
          400: '#dec45b',
          500: '#c5a059', // Gold
          600: '#a3813e',
          700: '#85642e',
          800: '#6b4f24',
          900: '#58411d',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}