<script setup>
import { IconSunMoon } from '@tabler/icons-vue';

import { Button } from '@/components/ui/button/';
import { useCustomization } from '@/composables/useCustomization';

const { toggleTheme, theme } = useCustomization();
</script>

<template>
  <ul class="flex flex-col gap-6 [&_li]:flex [&_li]:flex-col [&_li]:gap-2">
    <li>
      <p>Тема</p>
      <Button @click="toggleTheme" variant="outline" class="w-full gap-2">
        <IconSunMoon class="size-5" />

        Переключить тему на {{ theme === 'light' ? 'тёмную' : 'светлую' }}
      </Button>
    </li>
  </ul>
</template>
