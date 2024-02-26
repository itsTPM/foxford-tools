<script setup>
import { IconVersions } from '@tabler/icons-vue';
import manifest from '../../../manifest.json';

const versionName = manifest.version_name;
</script>

<template>
  <div class="flex items-center justify-center gap-1 text-sm text-muted-foreground">
    <IconVersions strokeWidth="1.5"></IconVersions>
    <span>версия {{ versionName }}</span>
  </div>
</template>
