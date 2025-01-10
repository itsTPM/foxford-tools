import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    crx({
      manifest,
      ...{
        browser: 'chrome',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '',
  server: {
    port: 1984,
    strictPort: true,
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  test: {
    environment: 'happy-dom',
  },
});
