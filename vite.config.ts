import { crx, type ManifestV3Export } from '@crxjs/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import svgLoader from 'vite-svg-loader';
import { defineConfig } from 'vitest/config';
import manifestJson from './manifest.json';

type Browser = 'chrome' | 'firefox';

const manifest = manifestJson as unknown as ManifestV3Export;

let browserForBuild: Browser = 'chrome';
const supportedBrowsers: Browser[] = ['chrome', 'firefox'];

if (supportedBrowsers.includes(process.argv[3] as Browser)) {
  browserForBuild = process.argv[3] as Browser;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), crx({ manifest, browser: browserForBuild }), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '',
  server: {
    port: 1984,
    strictPort: true,
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
  test: {
    environment: 'happy-dom',
  },
  legacy: {
    skipWebSocketTokenCheck: true,
  },
});
