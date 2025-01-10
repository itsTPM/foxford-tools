import { createRouter, createWebHashHistory } from 'vue-router';
import { IconBookmarks, IconBrush, IconSettings, IconCalendarShare, IconUserCircle } from '@tabler/icons-vue';

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
        icon: IconSettings,
      },
    },
    {
      path: '/themes',
      name: 'themes',
      component: () => import('../views/CustomizeView.vue'),
      meta: {
        title: 'Кастомизация',
        icon: IconBrush,
      },
    },
    {
      path: '/bookmarks',
      name: 'bookmarks',
      component: () => import('../views/BookmarksView.vue'),
      meta: {
        title: 'Закладки',
        icon: IconBookmarks,
      },
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/CalendarView.vue'),
      meta: {
        title: 'Календарь',
        icon: IconCalendarShare,
      },
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue'),
      meta: {
        title: 'Аккаунт',
        icon: IconUserCircle,
      },
    },
  ],
});

export default router;
