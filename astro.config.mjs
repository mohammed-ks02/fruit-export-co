import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  outDir: 'dist',
  site: 'https://mohammed-ks02.github.io/fruit-export-co/',
  base: process.env.NODE_ENV === 'production' ? '/fruit-export-co/' : '/',
  integrations: [
    tailwind(),
    react(),
    sitemap()
  ],
  image: {
    domains: ['mohammed-ks02.github.io'] // Updated for GitHub Pages
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});

export function withBase(path) {
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
}
