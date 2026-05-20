<script setup lang="ts">
import { RouterView } from 'vue-router';

import LayoutTitle from '@/entrypoints/popup/components/layout/LayoutTitle.vue';
import LayoutHeader from '@/entrypoints/popup/components/layout/LayoutHeader.vue';
import LayoutFooter from '@/entrypoints/popup/components/layout/LayoutFooter.vue';
import UpdateDialog from '@/entrypoints/popup/components/layout/UpdateDialog.vue';
import '@/entrypoints/popup/composables/useCustomization';
</script>

<template>
  <LayoutHeader />
  <main class="flex flex-1 flex-col gap-3 py-3">
    <LayoutTitle />
    <RouterView />
    <UpdateDialog />
  </main>
  <LayoutFooter />
</template>
