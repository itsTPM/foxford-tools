import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'settings',
      component: HomeView,
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
