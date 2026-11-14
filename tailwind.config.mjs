/** @type {import('tailwindcss').Config} */
// Colours and fonts are defined once in src/styles/theme.css.
// This file just points Tailwind at those same values — no need to edit it.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        yellow: 'var(--yellow)',
        lime: 'var(--lime)',
        pink: 'var(--pink)',
        sky: 'var(--sky)',
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
};
