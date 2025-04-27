/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url';
import process from 'node:process';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { crx } from '@crxjs/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import manifest from './manifest.json';

type Browser = 'chrome' | 'firefox';

function getBrowserForBuild(): Browser {
  const supportedBrowsers = ['chrome', 'firefox'];
  const userSpecifiedBrowser = process.argv[3];
  const defaultBrowser = 'chrome';

  if (supportedBrowsers.includes(userSpecifiedBrowser)) {
    return userSpecifiedBrowser as Browser;
  } else {
    console.warn(`Unsupported browser specified: ${userSpecifiedBrowser}. Defaulting to ${defaultBrowser}.`);
    return defaultBrowser as Browser;
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    crx({
      manifest,
      browser: getBrowserForBuild(),
    }),
    tailwindcss(),
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
