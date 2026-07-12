import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL || 'https://free-ai-audio-transcriber.pages.dev';

export default defineConfig({
  site,
  output: 'static',
  integrations: [react(), sitemap()],
  vite: {
    optimizeDeps: {
      exclude: ['@huggingface/transformers']
    },
    worker: {
      format: 'es'
    }
  }
});
