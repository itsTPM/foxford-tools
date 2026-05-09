<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const title = computed(() => route.meta.title);
</script>

<template>
  <h1 class="text-center font-medium" v-if="title">{{ title }}</h1>
</template>
