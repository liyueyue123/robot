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
  theme: {},
  plugins: [],
}
export default config
