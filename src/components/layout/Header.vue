<script setup>
import { useRouter } from 'vue-router';
import { Button } from '@/components/ui/button';

const router = useRouter();
const routes = router.getRoutes();
</script>

<template>
  <header class="flex flex-col gap-3">
    <div class="flex items-center justify-center gap-4">
      <img alt="" class="h-16" src="@/assets/logo/round.png" />
      <div class="flex flex-col text-center">
        <h1 class="text-2xl">Foxford Tools</h1>
        <p class="text-xs">кастомизация сайта Фокса</p>
      </div>
    </div>

    <nav>
      <ul class="flex justify-center gap-3" aria-label="Вкладки">
        <li v-for="route in routes" :key="route.name">
          <Button
            :aria-label="route.meta.title"
            :class="$route.name === route.name && 'bg-muted'"
            size="icon"
            variant="outline"
            as-child>
            <RouterLink :to="{ name: route.name }">
              <component :is="route.meta.icon" stroke-width="1.5" aria-hidden="true" />
            </RouterLink>
          </Button>
        </li>
      </ul>
    </nav>
  </header>
</template>
