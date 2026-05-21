import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';
import { defineConfig } from 'wxt';

export default defineConfig({
  manifestVersion: 3,
  srcDir: 'src',
  modules: ['@wxt-dev/module-vue'],
  imports: false,
  alias: {
    '@popup': 'src/entrypoints/popup',
    '@content': 'src/entrypoints/content',
    '@background': 'src/entrypoints/background',
  },
  manifest: {
    name: 'Foxford Tools',
    description: 'Добавляет полезные фичи для учеников Фоксфорда',
    homepage_url: 'https://fox.lyosha.dev/',
    permissions: ['storage', 'scripting'],
    host_permissions: ['https://foxford.ru/*'],
  },
  vite: () => ({
    plugins: [svgLoader(), tailwindcss()],
  }),
});
