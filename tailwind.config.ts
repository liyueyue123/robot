/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss'

function withOpacity(variableName: string) {
  return `var(${variableName})`;
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'flicker':'flicker 0.5s infinite ease-in-out',
        'fadeIn':'fadeIn 3s forwards',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        flicker:{
          '0%':{ opacity: '0.3',transform: 'scale(1.2)'},
          '50%':{ opacity: '1',transform: 'scale(1.2)'},
          '100%':{ opacity: '0.3',transform: 'scale(1.4)'},
        },
        fadeIn:{
          '0%':{
            opacity: '0',
            // transform: 'translateX(0)'
          },
          '100%':{
            opacity: "1",
            // transform: "translateX(20px)"
          }
        }
      },
      transitionDelay:{
        '200':'200ms',
        '400':'400ms',
        '600':'600ms',
        '800':'800ms',
        '1000':'1000ms',
        '1200':'1200ms',
      }
    }
  },
  plugins: [],
}
export default config
