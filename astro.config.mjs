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
  integrations: [tailwind(), react(), keystatic()],
  // Keystatic's API imports astro:env, which Vite's dev pre-bundler can't resolve.
  vite: { optimizeDeps: { exclude: ['@keystatic/astro'] } },
});
