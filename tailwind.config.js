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
      boxShadow: {
        card: '8px 8px 12px rgba(84, 131, 201, 0.5)',
        slugHeader: '0px 4px 12px rgba(141, 172, 222, 0.3)',
      },

      colors: {
        blue2: '#73A9FF',
        button: '#5483C9',
        hero: '#4571B1',
        textForm: '#475569',
        textFormState: '#9498AB',
        headerBg: "#73A9FF",
        bgHeader: "#BFDBFE",
        btnForm: "#73A9FF"
      },

      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '1.25rem',
          md: '2.125rem',
          xl: '1.25rem',
        },
      },

      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      },

      dropShadow: {
        card: '8px 8px 12px rgba(84, 131, 201, 0.5)',
      },

      screens: {
        sm: '480px',
        md: '768px',
        lg: '768px',
        xl: '1280px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
  ],
};
