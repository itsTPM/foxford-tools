<script setup>
import { IconVersions } from '@tabler/icons-vue';

import manifest from '@/../manifest.json';

const version = manifest.version;
</script>

<template>
  <div class="flex items-center justify-center gap-1 text-sm text-muted-foreground">
    <IconVersions stroke-width="1.5" class="w-6" aria-hidden="true"></IconVersions>
    <div class="flex flex-col leading-3">
      <p>версия {{ version }}</p>
      <a
        class="text-xs text-muted-foreground/50 transition hover:text-secondary-foreground/75"
        href="https://github.com/itsTPM/foxford-tools/releases"
        target="_blank">
        что нового?
      </a>
    </div>
  </div>
</template>
