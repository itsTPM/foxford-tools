<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Button } from '@popup/components/ui/button';
import Logo from '@/assets/logo.svg';

const router = useRouter();
const routes = router.getRoutes();
</script>

<template>
  <header class="flex flex-col gap-4">
    <div class="flex items-center justify-center gap-4">
      <Logo class="h-9" aria-hidden="true" />
      <div class="flex flex-col text-center">
        <p class="text-2xl">Foxford Tools</p>
        <p class="text-xs">кастомизация сайта Фокса</p>
      </div>
    </div>

    <nav>
      <ul class="flex justify-center gap-2" aria-label="Вкладки">
        <li v-for="route in routes" :key="route.name">
          <Button :aria-label="route.meta.title" size="icon" variant="outline" as-child>
            <RouterLink :to="{ name: route.name }" draggable="false">
              <component :is="route.meta.icon" stroke-width="1.5" aria-hidden="true" />
            </RouterLink>
          </Button>
        </li>
      </ul>
    </nav>
  </header>
</template>
