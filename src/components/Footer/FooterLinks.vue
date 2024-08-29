<script setup>
import { IconBrandGithub, IconWorld, IconBrandTelegram } from '@tabler/icons-vue';
import { Button } from '@/components/ui/button';

// Ссылки для отображения в подвале
const links = [
  {
    name: 'GitHub',
    url: 'https://github.com/itsTPM/foxford-tools',
    icon: IconBrandGithub,
  },
  {
    name: 'Telegram',
    url: 'https://t.me/foxfordclips',
    icon: IconBrandTelegram,
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
    <Button size="icon" variant="outline" as-child v-for="link in links" :key="link.name">
      <a :href="link.url" :title="link.name" target="_blank">
        <component :is="link.icon" class="w-6 text-foreground" stroke-width="1.5" />
      </a>
    </Button>
  </div>
</template>
