<script setup>
import { IconBrandGithub, IconWorld } from '@tabler/icons-vue';
import { Button } from '@/components/ui/button';

// Ссылки для отображения в подвале
const links = [
  {
    name: 'GitHub',
    url: 'https://github.com/itsTPM/foxford-tools',
    icon: IconBrandGithub,
  },
  {
    name: 'Сайт',
    url: 'https://fox.itstpm.tech',
    icon: IconWorld,
  },
];
</script>

<template>
  <div class="flex gap-3">
    <a v-for="link in links" :key="link.name" :href="link.url" :title="link.name" target="_blank">
      <Button size="icon" variant="outline">
        <component :is="link.icon" class="w-6 text-foreground" stroke-width="1.5" />
      </Button>
    </a>
  </div>
</template>
