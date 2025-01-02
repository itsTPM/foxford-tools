<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

// Import components that are visible on all pages of app
import RouterTitle from '@/components/RouterTitle.vue';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import UpdateHandlerDialog from '@/components/UpdateHandlerDialog.vue';

onMounted(() => {
  // Get customization settings from local storage
  const theme = localStorage.getItem('theme');
  const color = localStorage.getItem('color');
  const radius = localStorage.getItem('radius');

  // Apply customization settings to root element
  document.documentElement.classList.add(`${theme || 'light'}`);
  document.documentElement.classList.add(`theme-${color || 'red'}`);
  document.documentElement.style.setProperty('--radius', `${radius || 0}rem`);
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
