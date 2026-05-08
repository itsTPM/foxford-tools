<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import LayoutTitle from '@/components/layout/LayoutTitle.vue';
import LayoutHeader from '@/components/layout/LayoutHeader.vue';
import LayoutFooter from '@/components/layout/LayoutFooter.vue';
import UpdateDialog from '@/components/layout/UpdateDialog.vue';
import { useCustomization } from '@/composables/useCustomization';

const { loadSavedCustomizations } = useCustomization();

onMounted(() => {
  loadSavedCustomizations();
});
</script>

<template>
  <LayoutHeader />
  <main class="flex flex-col gap-3 py-3">
    <LayoutTitle />
    <RouterView />
    <UpdateDialog />
  </main>
  <LayoutFooter />
</template>
