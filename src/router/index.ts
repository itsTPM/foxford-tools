import { createRouter, createWebHashHistory } from 'vue-router';
import { IconBookmarks, IconSettings, IconUserCircle } from '@tabler/icons-vue';
import SettingsView from '../views/SettingsView.vue';
import BookmarksView from '../views/BookmarksView.vue';
import AccountView from '../views/AccountView.vue';

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
      path: '/bookmarks',
      name: 'bookmarks',
      component: BookmarksView,
      meta: {
        title: 'Закладки',
        icon: IconBookmarks,
      },
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      meta: {
        title: 'Аккаунт',
        icon: IconUserCircle,
      },
    },
  ],
});

export default router;
