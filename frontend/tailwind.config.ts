import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'vera': {
          100: '#e8edf7',
          500: '#2a4470',
          600: '#21375e',
          700: '#1a2d4f',
          900: '#0f1a2e',
        },
        'vera-yellow': {
          400: '#faf30e',
          500: '#f5ee0d',
          600: '#e6d60c',
        }
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

export default config 