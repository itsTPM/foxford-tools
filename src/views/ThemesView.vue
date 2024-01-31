<script setup>
import { Button } from '@/components/ui/button';

import { ref } from 'vue';

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
  <div class="flex gap-5">
    <div>
      Radius
      <div v-for="radiusOption in radiusOptions">
        <div class="flex items-center space-x-1">
          <Button v-model="radius" :value="radiusOption" variant="outline" @click="setRadius(radiusOption)">
            {{ radiusOption }}rem
          </Button>
        </div>
      </div>
    </div>

    <div>
      Color
      <div v-for="colorOption in colorOptions">
        <div class="flex items-center space-x-1">
          <Button v-model="color" :value="colorOption" variant="outline" @click="setColor(colorOption)">
            {{ colorOption }}
          </Button>
        </div>
      </div>
    </div>

    <div>
      Theme
      <div v-for="themeOption in themeOptions">
        <div class="flex items-center space-x-1">
          <Button v-model="theme" :value="themeOption" variant="outline" @click="setTheme(themeOption)">
            {{ themeOption }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
