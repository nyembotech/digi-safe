/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
      },
      colors: {
        // European Union Official Colors
        'eu-blue': '#003399',
        'eu-blue-dark': '#002868',
        'eu-blue-light': '#0066cc',
        'eu-gold': '#FFD700',
        'eu-gold-dark': '#FFB700',
        'eu-gold-light': '#FFEB3B',

        // Original color system
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fc',
          400: '#36aaf8',
          500: '#0c8ee9',
          600: '#003399', // EU Blue
          700: '#002868', // EU Blue Dark
          800: '#074b85',
          900: '#0c406e',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Dark mode variants
        dark: {
          primary: {
            50: '#0f172a',
            100: '#1e293b',
            200: '#334155',
            300: '#475569',
            400: '#64748b',
            500: '#94a3b8',
            600: '#cbd5e1',
            700: '#e2e8f0',
            800: '#f1f5f9',
            900: '#f8fafc',
          },
          neutral: {
            50: '#0f172a',
            100: '#1e293b',
            200: '#334155',
            300: '#475569',
            400: '#64748b',
            500: '#94a3b8',
            600: '#cbd5e1',
            700: '#e2e8f0',
            800: '#f1f5f9',
            900: '#f8fafc',
          }
        }
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'strong': '0 8px 24px rgba(0, 0, 0, 0.12)',
        // European-themed shadows
        'eu-card': '0 4px 12px rgba(0, 51, 153, 0.08)',
        'eu-hover': '0 8px 24px rgba(0, 51, 153, 0.15)',
        'eu-floating': '0 12px 32px rgba(0, 51, 153, 0.2)',
        'glass': '0 8px 32px rgba(255, 255, 255, 0.1)',
        // Dark mode shadows
        'dark-soft': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'dark-medium': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'dark-strong': '0 8px 24px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'eu-float': 'eu-float 6s ease-in-out infinite',
        'eu-glow': 'eu-glow 2s ease-in-out infinite alternate',
        'eu-spin': 'eu-spin 20s linear infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'eu-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'eu-glow': {
          '0%': { boxShadow: '0 0 20px rgba(0, 51, 153, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(255, 215, 0, 0.4)' },
        },
        'eu-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
});
