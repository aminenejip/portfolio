/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#adc6ff',
          dark: '#adc6ff',
          light: '#2563eb',
        },
        secondary: {
          DEFAULT: '#5de6ff',
          dark: '#5de6ff',
          light: '#0891b2',
        },
        tertiary: {
          DEFAULT: '#d0bcff',
          dark: '#d0bcff',
          light: '#7c3aed',
        },
        surface: '#0c1324',
        'surface-dim': '#0c1324',
        'surface-container': '#191f31',
        'surface-container-low': '#151b2d',
        'surface-container-high': '#23293c',
        'surface-container-highest': '#2e3447',
        'surface-container-lowest': '#070d1f',
        'surface-variant': '#2e3447',
        'surface-bright': '#33394c',
        'on-surface': {
          DEFAULT: '#dce1fb',
          dark: '#dce1fb',
          light: '#1a1d28',
        },
        'on-surface-variant': {
          DEFAULT: '#c2c6d6',
          dark: '#c2c6d6',
          light: '#4a4f5e',
        },
        outline: {
          DEFAULT: '#8c909f',
          dark: '#8c909f',
          light: '#9ca3af',
        },
        'outline-variant': {
          DEFAULT: '#424754',
          dark: '#424754',
          light: '#d1d5db',
        },
        background: '#0c1324',
        'primary-fixed': '#d8e2ff',
        'primary-fixed-dim': '#adc6ff',
      },
      darkMode: 'class',
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
}
