import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mohammed-ks02.github.io/fruit-export-co', // Replace with actual domain
  integrations: [
    tailwind(),
    react(),
    sitemap()
  ],
  image: {
    domains: ['your-cms-domain.com'] // Add your CMS domain here
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});
