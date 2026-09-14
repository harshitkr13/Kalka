/**
 * Kalka Co. Design System Tokens
 * Source of truth for styling constants, typography, and palette.
 */
export const TOKENS = {
  colors: {
    navy: {
      deep: '#050a15',
      primary: '#0a1628',
      surface: '#112240',
      border: '#1d3557',
    },
    gold: {
      DEFAULT: '#c9a84c',
      light: '#d4b86a',
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
  typography: {
    fontFamilies: {
      serif: 'Outfit, Georgia, serif',
      sans: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
    '3xl': '1920px',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
  }
} as const;
