import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

// Colors are edited in the admin (/keystatic → Theme colors), which saves
// src/data/theme.yaml. Every save triggers a rebuild, so they apply site-wide.
const theme = parse(readFileSync(new URL('./src/data/theme.yaml', import.meta.url), 'utf-8'));

// "#rrggbb" + 0–100 opacity → "#rrggbbaa"
const withOpacity = (hex, percent) =>
  hex + Math.round((Math.min(Math.max(percent, 0), 100) / 100) * 255).toString(16).padStart(2, '0');
const tint = ({ color, opacity }) => withOpacity(color, opacity);

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // -- Base palette --
        salmon: theme.brand.salmon,
        green: theme.brand.green,
        cream: theme.brand.cream,
        teal: theme.brand.teal,

        // -- Backgrounds: page-level --
        'hero-bg': theme.backgrounds.hero,                 // Homepage hero section
        'banner-bg': theme.backgrounds.banner,             // Services & Work page hero banners
        'sidebar-left-bg': theme.backgrounds.sidebarLeft,  // Decorative left sidebar (Layout)
        'sidebar-right-bg': theme.backgrounds.sidebarRight, // Decorative right sidebar (Layout)
        'footer-bg': theme.backgrounds.footer,             // Footer background

        // -- Backgrounds: section-level --
        'section-alt-bg': tint(theme.tints.sectionAlt),    // Services preview (home), CTA (work page)
        'cta-bg': tint(theme.tints.cta),                   // CTA sections on homepage & services page
        'blockquote-bg': tint(theme.tints.blockquote),     // Services page add-on blockquote

        // -- Backgrounds: components --
        'accordion-bg': tint(theme.tints.accordion),
        'accordion-hover-bg': tint(theme.tints.accordionHover),
        'filter-btn-bg': tint(theme.tints.filterButton),
        'filter-btn-active-bg': theme.buttons.filterActive,

        // -- Primary action buttons (Get In Touch, Send Message, Back to Home) --
        'btn-primary-bg': theme.buttons.primary,
        'btn-primary-hover': withOpacity(theme.buttons.primary, 85),
      },
      fontFamily: {
        sans: ['Albert Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
