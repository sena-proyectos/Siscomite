/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        blue: {
          50: '#e6f1fe',
          100: '#cce3fd',
          200: '#99c7fb',
          300: '#66aaf9',
          400: '#338ef7',
          500: '#006FEE',
          600: '#005bc4',
          700: '#004493',
          800: '#002e62',
          900: '#001731',
        },
      },
      gridTemplateColumns: {
        '2-50-50': ' 50% 50%',
      },
    },
  },
  variants: {
    borderWidth: ['responsive', 'hover', 'focus'],
  },
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        fontSize: {
          tiny: '0.75rem', // text-tiny
          small: '0.875rem', // text-small
          medium: '1rem', // text-medium
          large: '1.125rem', // text-large
        },
      },
    }),
  ],
}
