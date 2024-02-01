<script setup>
import { ref } from 'vue';
import CustomizeSelector from '@/components/Customize/CustomizeSelector.vue';

const themeOptions = [
  {
    name: 'light',
    displayName: 'Светлая',
  },
  {
    name: 'dark',
    displayName: 'Темная',
  },
];
const radiusOptions = ['0', '0.25', '0.5', '0.75', '1'];
const colorOptions = [
  {
    name: 'zinc',
    displayName: 'Цинк',
  },
  {
    name: 'red',
    displayName: 'Красный',
  },
  {
    name: 'green',
    displayName: 'Зеленый',
  },
];

const radius = ref('0');
const color = ref('zinc');
const theme = ref('light');

const setRadius = (r) => {
  radius.value = r;
  document.documentElement.style.setProperty('--radius', `${r}rem`);
  localStorage.setItem('radius', radius.value);
};

const setColor = (c) => {
  color.value = c;
  document.documentElement.classList.remove(...colorOptions.map((color) => `theme-${color.name}`));
  document.documentElement.classList.add(`theme-${c}`);
  localStorage.setItem('color', color.value);
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
  <CustomizeSelector v-model="color" :options="colorOptions" title="Цветовая схема" @optionSelected="setColor" />
  <CustomizeSelector v-model="theme" :options="themeOptions" title="Тема" @optionSelected="setTheme" />
</template>
