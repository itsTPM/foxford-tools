<script setup>
import { IconSunMoon } from '@tabler/icons-vue';

import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button/';
import { useCustomization } from '@/composables/useCustomization';
const { toggleTheme, setRadius, theme, radius } = useCustomization();
</script>

<template>
  <ul class="flex flex-col gap-6 [&_li]:flex [&_li]:flex-col [&_li]:gap-2">
    <li>
      <p>Уровень закругления</p>
      <Slider :max="1" :step="0.25" v-model="radius" @update:modelValue="setRadius" />
    </li>
    <li>
      <p>Тема</p>
      <Button @click="toggleTheme" variant="outline" class="w-full gap-2">
        <IconSunMoon class="w-5" />

        Переключить тему на {{ theme === 'light' ? 'тёмную' : 'светлую' }}
      </Button>
    </li>
  </ul>
</template>
