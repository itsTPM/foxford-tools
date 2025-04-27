<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <h2 class="text-center text-base font-medium">{{ route.meta.title }}</h2>
</template>
