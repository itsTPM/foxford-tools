<script setup>
import { IconBookmarks, IconFlask, IconSettings } from '@tabler/icons-vue';
import { Button } from '@/components/ui/button';

// Маршруты для отображения на панели навигации
const routes = [
  {
    name: 'settings',
    icon: IconSettings,
  },
  {
    name: 'bookmarks',
    icon: IconBookmarks,
  },
  {
    name: 'about',
    icon: IconFlask,
  },
];
</script>

<template>
  <nav class="flex gap-3 justify-center">
    <RouterLink v-for="route in routes" :key="route.name" :to="{ name: route.name }">
      <Button
        :class="[$route.name === route.name ? ['bg-gray-100', 'border-gray-300'] : '']"
        size="icon"
        variant="outline">
        <component :is="route.icon" color="#333" strokeWidth="1.5" />
      </Button>
    </RouterLink>
  </nav>
</template>
