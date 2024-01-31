<script setup>
import { ref } from 'vue';

const radiusOptions = ['0', '0.25', '0.5', '0.75', '1'];
const radius = ref('0');

const setRadius = (r) => {
  radius.value = r;
  document.documentElement.style.setProperty('--radius', `${r}rem`);
};
</script>

<template>
  <div class="flex">
    <div v-for="radiusOption in radiusOptions">
      <div class="flex items-center space-x-1">
        <input
          v-model="radius"
          :value="radiusOption"
          class="form-radio"
          type="radio"
          @change="setRadius(radiusOption)" />
        <span>{{ radiusOption }}rem</span>
      </div>
    </div>
  </div>
</template>
