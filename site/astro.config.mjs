// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.example.co.uk', // TODO: real domain (keep in sync with src/data/business.ts)
  trailingSlash: 'always',
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/thanks/') })],
});
