/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#adc6ff',
          light: '#2563eb',
        },
        secondary: {
          DEFAULT: '#0891b2',
          dark: '#5de6ff',
          light: '#0891b2',
        },
        tertiary: {
          DEFAULT: '#7c3aed',
          dark: '#d0bcff',
          light: '#7c3aed',
        },
        surface: '#f9f9ff',
        'surface-dim': '#f2f3fd',
        'surface-container': '#ecedf7',
        'surface-container-low': '#f2f3fd',
        'surface-container-high': '#e6e7f2',
        'surface-container-highest': '#e1e2ec',
        'surface-container-lowest': '#ffffff',
        'surface-variant': '#e1e2ec',
        'surface-bright': '#f9f9ff',
        'on-surface': {
          DEFAULT: '#0f172a',
          dark: '#e2e8f0',
          light: '#0f172a',
        },
        'on-surface-variant': {
          DEFAULT: '#475569',
          dark: '#c2c6d6',
          light: '#475569',
        },
        outline: {
          DEFAULT: '#cbd5e1',
          dark: '#94a3b8',
          light: '#cbd5e1',
        },
        'outline-variant': {
          DEFAULT: '#e2e8f0',
          dark: '#424754',
          light: '#e2e8f0',
        },
        background: '#f9f9ff',
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
