import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  outDir: 'docs',
  site: 'https://mohammed-ks02.github.io/fruit-export-co/',
  base: '/fruit-export-co/', // <--- ADD THIS LINE
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
