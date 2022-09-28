/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit', // see https://tailwindcss.com/docs/just-in-time-mode
  content: [
    './pages/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './views/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          md: '2rem',
          lg: '2rem',
          xl: '1.4rem',
        },
      },
      colors: {
        blue2: '#73A9FF',
        button: '#5483C9',
        hero: '#4571B1',
      },
      boxShadow: {
        card: '8px 8px 12px rgba(84, 131, 201, 0.5)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
  ],
};
