/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        salmon: '#ffad84',
        green: '#8bbd6f',
        cream: '#fffaba',
        teal: '#2b4244',
      },
      fontFamily: {
        sans: ['Albert Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
