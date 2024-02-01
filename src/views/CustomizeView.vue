<script setup>
import { ref } from 'vue';
import CustomizeSelector from '@/components/Customize/CustomizeSelector.vue';

const themeOptions = ['light', 'dark'];
const radiusOptions = ['0', '0.25', '0.5', '0.75', '1'];
const colorOptions = [
  'zinc',
  'rose',
  'blue',
  'green',
  'orange',
  'red',
  'slate',
  'stone',
  'gray',
  'neutral',
  'yellow',
  'violet',
];

const radius = ref('0');
const color = ref('zinc');
const theme = ref('light');

const setRadius = (r) => {
  radius.value = r;
  document.documentElement.style.setProperty('--radius', `${r}rem`);
};

const setColor = (c) => {
  color.value = c;
  document.documentElement.classList.remove(...colorOptions.map((color) => `theme-${color}`));
  document.documentElement.classList.add(`theme-${c}`);
};

const setTheme = (t) => {
  theme.value = t;
  document.documentElement.classList.remove(...themeOptions.map((theme) => `${theme}`));
  document.documentElement.classList.add(`${t}`);
};
</script>

<template>
  <CustomizeSelector
    v-model="radius"
    :options="radiusOptions"
    title="Уровень закругления"
    @optionSelected="setRadius" />
  <CustomizeSelector v-model="color" :options="colorOptions" title="Цвет" @optionSelected="setColor" />
  <CustomizeSelector v-model="theme" :options="themeOptions" title="Тема" @optionSelected="setTheme" />
</template>
