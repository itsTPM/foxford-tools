<script setup>
import { IconVersions } from '@tabler/icons-vue';
import manifest from '../../../manifest.json';
</script>

<template>
  <div class="flex items-center justify-center gap-1 text-sm text-muted-foreground">
    <IconVersions strokeWidth="1.5"></IconVersions>
    <span>версия {{ manifest.version_name }}</span>
  </div>
</template>
