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

  <!--  <div class="flex flex-col gap-2">-->
  <!--    <span class="text-base">Уровень закругления</span>-->
  <!--    <div class="flex flex-wrap gap-1">-->
  <!--      <div v-for="radiusOption in radiusOptions" class="flex items-center">-->
  <!--        <Button v-model="radius" :value="radiusOption" variant="outline" @click="setRadius(radiusOption)">-->
  <!--          {{ radiusOption }}-->
  <!--        </Button>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <!--  <div class="flex flex-col gap-2">-->
  <!--    <span class="text-base">Цвет</span>-->
  <!--    <div class="flex flex-wrap gap-1">-->
  <!--      <div v-for="colorOption in colorOptions" class="flex items-center">-->
  <!--        <Button v-model="color" :value="colorOption" variant="outline" @click="setColor(colorOption)">-->
  <!--          {{ colorOption }}-->
  <!--        </Button>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <!--  <div class="flex flex-col gap-2">-->
  <!--    <span class="text-base">Тема</span>-->
  <!--    <div class="flex flex-wrap gap-1">-->
  <!--      <div v-for="themeOption in themeOptions" class="flex items-center">-->
  <!--        <Button v-model="theme" :value="themeOption" variant="outline" @click="setTheme(themeOption)">-->
  <!--          {{ themeOption }}-->
  <!--        </Button>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>
