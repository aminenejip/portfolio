/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#adc6ff',
        secondary: '#5de6ff',
        tertiary: '#d0bcff',
        surface: '#0c1324',
        'surface-dim': '#0c1324',
        'surface-container': '#191f31',
        'surface-container-low': '#151b2d',
        'surface-container-high': '#23293c',
        'surface-container-highest': '#2e3447',
        'surface-container-lowest': '#070d1f',
        'surface-variant': '#2e3447',
        'surface-bright': '#33394c',
        'on-surface': '#dce1fb',
        'on-surface-variant': '#c2c6d6',
        outline: '#8c909f',
        'outline-variant': '#424754',
        background: '#0c1324',
        'primary-fixed': '#d8e2ff',
        'primary-fixed-dim': '#adc6ff',
      },
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
