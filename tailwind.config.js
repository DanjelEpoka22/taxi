/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        asphalt: {
          DEFAULT: '#0B1120',
          light: '#121A2C',
          lighter: '#172038',
        },
        amber: {
          DEFAULT: '#2DD4BF',
          dim: '#0D9488',
        },
        taxi: {
          DEFAULT: '#22D3EE',
        },
        cream: '#EAF0F6',
        available: '#3FAE7A',
        busy: '#E5484D',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        drive: {
          '0%': { offsetDistance: '0%' },
          '100%': { offsetDistance: '100%' },
        },
        dash: {
          to: { strokeDashoffset: '0' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.4 },
        }
      },
      animation: {
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
