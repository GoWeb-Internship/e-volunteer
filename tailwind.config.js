/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit', // see https://tailwindcss.com/docs/just-in-time-mode
  content: ['./pages/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
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
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
  ],
};
