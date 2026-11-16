import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// Pages stay static. Only the admin (/keystatic) and its API run on demand,
// which is why the Vercel adapter is needed.
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  site: 'https://stcyrevent.vercel.app',
  // Let Astro trust Vercel's forwarded host header for these domains. Without
  // this the admin sees its own URL as https://localhost, and GitHub sign-in
  // fails with "redirect_uri is not associated with this application".
  // Add any custom domain here too (and as a redirect URI in the GitHub App).
  security: {
    allowedDomains: [{ hostname: 'stcyrevent.vercel.app', protocol: 'https' }],
  },
  integrations: [tailwind(), react(), keystatic()],
  // Keystatic's API imports astro:env, which Vite's dev pre-bundler can't resolve.
  vite: { optimizeDeps: { exclude: ['@keystatic/astro'] } },
});
