<script setup>
import { useRouter } from 'vue-router';

import { Button } from '@/components/ui/button';

const router = useRouter();
const routes = router.getRoutes();
</script>

<template>
  <nav>
    <ul class="flex justify-center gap-3" aria-label="Вкладки">
      <li v-for="route in routes">
        <Button
          :aria-label="route.meta.title"
          :class="$route.name === route.name ? 'bg-active' : ''"
          size="icon"
          variant="outline"
          :key="route.name"
          as-child>
          <RouterLink :to="{ name: route.name }">
            <component :is="route.meta.icon" class="w-6 text-foreground" stroke-width="1.5" aria-hidden="true" />
          </RouterLink>
        </Button>
      </li>
    </ul>
  </nav>
</template>
