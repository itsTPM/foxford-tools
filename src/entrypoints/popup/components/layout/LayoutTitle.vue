<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const title = computed(() => route.meta.title);
</script>

<template>
  <h1 v-if="title" class="text-center text-lg font-medium">
    {{ title }}
  </h1>
</template>
