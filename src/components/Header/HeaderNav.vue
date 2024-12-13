<script setup>
import { IconBookmarks, IconBrush, IconSettings, IconCalendarShare, IconUserCircle } from '@tabler/icons-vue';
import { Button } from '@/components/ui/button';

// Маршруты для отображения на панели навигации
const routes = [
  {
    name: 'settings',
    friendlyName: 'Настройки',
    icon: IconSettings,
  },
  {
    name: 'themes',
    friendlyName: 'Кастомизация',
    icon: IconBrush,
  },
  {
    name: 'bookmarks',
    friendlyName: 'Закладки',
    icon: IconBookmarks,
  },
  {
    name: 'calendar',
    friendlyName: 'Календарь',
    icon: IconCalendarShare,
  },
  {
    name: 'account',
    friendlyName: 'Аккаунт',
    icon: IconUserCircle,
  },
];
</script>

<template>
  <nav>
    <ul class="flex justify-center gap-3" aria-label="Вкладки">
      <li v-for="route in routes">
        <Button
          :aria-label="route.friendlyName"
          :class="$route.name === route.name ? 'bg-active' : ''"
          size="icon"
          variant="outline"
          :key="route.name"
          as-child>
          <RouterLink :to="{ name: route.name }">
            <component :is="route.icon" class="w-6 text-foreground" stroke-width="1.5" aria-hidden="true" />
          </RouterLink>
        </Button>
      </li>
    </ul>
  </nav>
</template>
