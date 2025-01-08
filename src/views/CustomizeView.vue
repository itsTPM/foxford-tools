<script setup>
import { ref } from 'vue';
import CustomizeSelector from '@/components/Customize/CustomizeSelector.vue';
import { IconMoon, IconSun } from '@tabler/icons-vue';

const themeOptions = [
  {
    name: 'light',
    displayName: 'Светлая',
    icon: IconSun,
  },
  {
    name: 'dark',
    displayName: 'Темная',
    icon: IconMoon,
  },
];
const radiusOptions = ['0', '0.25', '0.5', '0.75', '1'];

const radius = ref('0');
const theme = ref('light');

const setRadius = (r) => {
  radius.value = r;
  document.documentElement.style.setProperty('--radius', `${r}rem`);
  localStorage.setItem('radius', radius.value);
};

const setTheme = (t) => {
  theme.value = t;
  document.documentElement.classList.remove(...themeOptions.map((theme) => `${theme.name}`));
  document.documentElement.classList.add(`${t}`);
  localStorage.setItem('theme', theme.value);
};
</script>

<template>
  <CustomizeSelector
    v-model="radius"
    :options="radiusOptions"
    title="Уровень закругления"
    @optionSelected="setRadius" />
  <CustomizeSelector v-model="theme" :options="themeOptions" title="Тема" @optionSelected="setTheme" />
</template>
