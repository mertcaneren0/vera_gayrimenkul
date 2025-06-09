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
        }
      }
    },
  },
  plugins: [],
}

export default config 