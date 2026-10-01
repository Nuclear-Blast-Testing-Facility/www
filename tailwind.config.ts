import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        facility: {
          950: '#04070d',
          900: '#090e18',
          850: '#0f1725',
          800: '#152033',
          700: '#1d2c44',
          600: '#2a3e5f',
        },
        rebel: {
          900: '#1a0808',
          800: '#2d0f0f',
          700: '#481616',
          500: '#e63946',
          400: '#ff4d5a',
        },
        nuke: {
          cyan: '#00f0ff',
          amber: '#ffb703',
          red: '#ff2a5f',
          green: '#00ff88',
          plasma: '#9d4edd',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
} satisfies Config
