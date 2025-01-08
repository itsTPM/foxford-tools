<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

// Import components that are visible on all pages of app
import RouterTitle from '@/components/RouterTitle.vue';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import UpdateHandlerDialog from '@/components/UpdateHandlerDialog.vue';

import { useCustomization } from '@/composables/useCustomization';
const { loadSavedCustomizations } = useCustomization();

onMounted(() => {
  loadSavedCustomizations();
});
</script>

<template>
  <Header />
  <main class="flex flex-col gap-3 pb-6 pt-3">
    <RouterTitle />
    <RouterView />
    <UpdateHandlerDialog />
  </main>
  <Footer />
</template>
