import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          deep: '#050a15',
          DEFAULT: '#0a1628',
          surface: '#112240',
          border: '#1d3557',
        },
        gold: {
          light: '#d4b86a',
          DEFAULT: '#c9a84c',
          dark: '#a88a3a',
          muted: 'rgba(201, 168, 76, 0.12)',
        },
        cream: {
          DEFAULT: '#f5f0e8',
          pure: '#ffffff',
          muted: '#ece6dc',
        },
        slate: {
          100: '#e8e6e1',
          200: '#d1cfc9',
          300: '#b0ada5',
          400: '#8a8780',
          500: '#6b6862',
          600: '#4a4842',
          700: '#2d2b27',
          800: '#1a1916',
          900: '#0f0e0d',
        },
        status: {
          success: '#1b7a4b',
          warning: '#b37400',
          error: '#b83232',
          info: '#1a5d8f',
        }
      },
      fontFamily: {
        serif: ['var(--font-outfit)', 'Outfit', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
        wide: '1440px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0,0,0,0.06)',
        'elevated': '0 4px 16px rgba(0,0,0,0.08)',
        'premium': '0 12px 36px rgba(10,22,40,0.12)',
        'gold-glow': '0 0 24px rgba(201,168,76,0.25)',
      },
      borderRadius: {
        'card': '8px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};

export default config;
