/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import theme from 'daisyui/src/theming/themes';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
  ],
  theme: {
    extend: {
      keyframes: {
        translateYAndFadeIn: {
          '0%': { transform: 'translateY(-8px)', opacity: '0.6' },
          '25%': { transform: 'translateY(-6px)', opacity: '0.7' },
          '50%': { transform: 'translateY(-4px)', opacity: '0.8' },
          '75%': { transform: 'translateY(-2px)', opacity: '0.9' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        },
      },
      animation: {
        translateYAndFadeIn: 'translateYAndFadeIn 0.1s ease-in-out',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: theme['emerald'], //NOTE: custom light theme here
        dark: theme['dim'], //NOTE: custom dark theme here
      },
    ],
  },
};
