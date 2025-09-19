/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'base-black': '#0C0C0C',
        'deep-charcoal': '#141414',
        'primary-teal': '#00B3A6',
        'bright-aqua': '#4ADFD6',
        'soft-white': '#F5F7FA',
        'cloud-gray': '#C8CCD2',
        'warm-accent': '#C6972C',
        'deep-indigo': '#1E293B',
        'weird-purple': '#8B5CF6',
        'heritage-red': '#DC2626',
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
        'serif': ['Crimson Text', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'playfair': ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.4s ease-out',
        'fade-in-up-delay-1': 'fade-in-up 0.4s ease-out 0.05s both',
        'fade-in-up-delay-2': 'fade-in-up 0.4s ease-out 0.1s both',
        'fade-in-up-delay-3': 'fade-in-up 0.4s ease-out 0.15s both',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite alternate',
        'grain': 'grain 8s steps(10) infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(12px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'pulse-glow': {
          '0%': {
            'box-shadow': '0 0 20px rgba(0, 179, 166, 0.2)',
          },
          '100%': {
            'box-shadow': '0 0 30px rgba(0, 179, 166, 0.4)',
          },
        },
        'grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
    },
  },
  plugins: [],
}