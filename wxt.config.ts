import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';
import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-vue'],
  imports: false,
  manifest: {
    name: 'Foxford Tools',
    description: 'Расширение для того самого сайта Фокса',
    homepage_url: 'https://fox.lyosha.dev/',
    permissions: ['storage', 'activeTab', 'scripting'],
    host_permissions: ['https://foxford.ru/*'],
    externally_connectable: { matches: ['https://foxford.ru/*'] },
    action: {
      default_icon: {
        '16': 'icons/icon16.png',
        '32': 'icons/icon32.png',
        '48': 'icons/icon48.png',
        '128': 'icons/icon128.png',
      },
    },
    icons: {
      '16': 'icons/icon16.png',
      '32': 'icons/icon32.png',
      '48': 'icons/icon48.png',
      '128': 'icons/icon128.png',
    },
  },
  vite: () => ({
    plugins: [svgLoader(), tailwindcss()],
  }),
});
