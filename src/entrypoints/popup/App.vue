<script setup lang="ts">
import { RouterView } from 'vue-router';

import LayoutTitle from '@popup/components/layout/LayoutTitle.vue';
import LayoutHeader from '@popup/components/layout/LayoutHeader.vue';
import LayoutFooter from '@popup/components/layout/LayoutFooter.vue';
import UpdateDialog from '@popup/components/layout/UpdateDialog.vue';
import '@popup/composables/useCustomization';
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
