/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F172A',
          50: '#E2E8F0',
          100: '#CBD5E1',
          600: '#1E3A5F',
          700: '#152D4A',
          800: '#0D2137',
          900: '#0F172A',
        },
        sky: {
          DEFAULT: '#38BDF8',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
