<script setup>
import { IconVersions } from '@tabler/icons-vue';

import manifest from '@/../manifest.json';

const version = manifest.version;
</script>

<template>
  <div class="text-muted-foreground flex items-center justify-center gap-1 text-sm">
    <IconVersions stroke-width="1.5" class="size-6" aria-hidden="true"></IconVersions>
    <div class="flex flex-col leading-3">
      <p>версия {{ version }}</p>
      <a
        class="text-muted-foreground/50 hover:text-secondary-foreground/75 text-xs transition"
        href="https://github.com/itsTPM/foxford-tools/releases"
        target="_blank">
        что нового?
      </a>
    </div>
  </div>
</template>
