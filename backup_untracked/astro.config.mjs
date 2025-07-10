import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mohammed-ks02.github.io/fruit-export-co/', // <-- include the repo name!
  base: '/fruit-export-co/', // <-- include the repo name!
  integrations: [tailwind()],
  // Remove outDir or set it to 'dist' (default)
});
