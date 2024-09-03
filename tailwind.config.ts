import type { Config } from 'tailwindcss';

const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        mob: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1536px',
      },
    },
    extend: {
      colors: {
        green: {
          500: '#EDFFCD',
          600: '#679436',
          700: '#0D2A1F',
        },
        blue: {
          400: '#E2EAFF',
          500: '#CAD6FF',
          600: '#809CFF',
          700: '#2260FF',
        },
        light: {
          200: '#EBF2FA',
        },
        dark: {
          200: '#020617',
          300: '#0f172a',
          400: '#1e293b',
          500: '#475569',
          600: '#64748b',
          700: '#94a3b8',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        yanone: ['"Yanone Kaffeesatz"', 'sans-serif'],
      },
      backgroundImage: {
        intro:
          "radial-gradient(rgba(250, 250, 250, 0.8), rgba(164, 217, 255, 0.9), rgba(250, 250, 250, 0.9), rgba(250, 250, 250, 0.9)), url('/assets/images/medical-img.jpg')",
        'dark-intro':
          "radial-gradient(rgba(71, 85, 105, 0.9), rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9), rgba(2, 6, 23, 1)), url('/assets/images/intro.jpg')",
        appointment:
          "radial-gradient(rgba(250, 250, 250, 0.5), rgba(164, 217, 255, 0.5), rgba(250, 250, 250, 0.5), rgba(250, 250, 250, 0.9)), url('/assets/images/appointment.png')",
        'dark-appointment':
          "radial-gradient(rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9), rgba(2, 6, 23, 1)), url('/assets/images/appointment.png')",
        events: "url('/assets/images/events-bg.png')",
        awaiting: "url('/assets/images/awaiting-bg.png')",
        abondened: "url('/assets/images/abondened-bg.png')",
        'gradient-custom':
          'linear-gradient(90deg, #FFFFFF 0%, #a4d9ff 50%, #FFFFFF 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
