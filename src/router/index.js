import { createRouter, createWebHashHistory } from 'vue-router';
import SettingsView from '../views/SettingsView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'settings',
      component: SettingsView,
      meta: {
        title: 'Настройки',
      },
    },
    {
      path: '/themes',
      name: 'themes',
      component: () => import('../views/ThemesView.vue'),
      meta: {
        title: 'Темы',
      },
    },
    {
      path: '/bookmarks',
      name: 'bookmarks',
      component: () => import('../views/BookmarksView.vue'),
      meta: {
        title: 'Закладки',
      },
    },
  ],
});

export default router;
