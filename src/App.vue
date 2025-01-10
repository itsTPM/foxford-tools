<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import RouterTitle from '@/components/layout/RouterTitle.vue';
import Header from '@/components/layout/Header/Header.vue';
import Footer from '@/components/layout/Footer/Footer.vue';
import UpdateHandlerDialog from '@/components/layout/UpdateHandlerDialog.vue';
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
