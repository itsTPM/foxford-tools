<script setup>
import { IconBookmarks, IconBrush, IconSettings, IconCalendarShare } from '@tabler/icons-vue';
import { Button } from '@/components/ui/button';

// Маршруты для отображения на панели навигации
const routes = [
  {
    name: 'settings',
    icon: IconSettings,
  },
  {
    name: 'themes',
    icon: IconBrush,
  },
  {
    name: 'bookmarks',
    icon: IconBookmarks,
  },
  {
    name: 'calendar',
    icon: IconCalendarShare,
  },
];
</script>

<template>
  <nav class="flex justify-center gap-3">
    <RouterLink v-for="route in routes" :key="route.name" :to="{ name: route.name }">
      <Button :class="$route.name === route.name ? 'bg-active' : ''" size="icon" variant="outline">
        <component :is="route.icon" class="text-foreground" strokeWidth="1.5" />
      </Button>
    </RouterLink>
  </nav>
</template>
