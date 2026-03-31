/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // -- Base palette --
        salmon: '#fd8a6b',
        green: '#8bbd6f',
        cream: '#fcf596',
        teal: '#2b4244',

        // -- Backgrounds: page-level --
        'hero-bg': '#fff4ea',           // Homepage hero section
        'banner-bg': '#2b4244',           // Services & Work page hero banners
        'sidebar-bg': '#fffaba',          // Decorative left & right sidebars (Layout)
        'footer-bg': '#fff4ea',         // Footer background

        // -- Backgrounds: section-level --
        'section-alt-bg': '#8bbd6f1a',    // Alternating sections: services preview (home), CTA (work page)
        'cta-bg': '#ffad841a',            // CTA sections on homepage & services page
        'blockquote-bg': '#ffad840d',     // Services page add-on blockquote

        // -- Backgrounds: components --
        'accordion-bg': '#8bbd6f1a',      // Services page accordion button
        'accordion-hover-bg': '#8bbd6f33', // Services page accordion button hover
        'filter-btn-bg': '#2b42441a',     // Work page inactive filter button
        'filter-btn-active-bg': '#ffad84', // Work page active filter button

        // -- Primary action buttons (Get In Touch, Send Message, Back to Home) --
        'btn-primary-bg': '#ffad84',      // Button background
        'btn-primary-hover': '#ffad84d9', // Button hover state
      },
      fontFamily: {
        sans: ['Albert Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
