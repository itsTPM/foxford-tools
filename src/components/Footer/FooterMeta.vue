<script setup>
import { IconVersions } from '@tabler/icons-vue';
import manifest from '../../../manifest.json';

const versionName = manifest.version_name;
</script>

<template>
  <div class="flex items-center justify-center gap-1 text-sm text-muted-foreground">
    <IconVersions strokeWidth="1.5"></IconVersions>
    <div class="flex flex-col leading-[0.8]">
      <span>версия {{ versionName }}</span>
      <a
        class="text-xs text-muted-foreground/50 transition hover:text-secondary-foreground/75"
        href="https://fox.itstpm.tech/changelog"
        target="_blank">
        что нового?
      </a>
    </div>
  </div>
</template>
