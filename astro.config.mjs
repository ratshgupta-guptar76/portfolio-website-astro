import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import path from 'node:path';

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '');
        return path.resolve(process.cwd(), './src/assets', filename);
      }
    },
  };
}

export default defineConfig({
  site: 'https://ratishgupta.com',
  output: 'static',
  integrations: [
    react(),
    mdx({ remarkPlugins: [remarkMath, remarkGfm], rehypePlugins: [rehypeKatex] }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss(), figmaAssetResolver()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), './src'),
      },
    },
  },
  markdown: {
    remarkPlugins: [remarkMath, remarkGfm],
    shikiConfig: { theme: 'github-dark-dimmed', wrap: true },
  },
});
