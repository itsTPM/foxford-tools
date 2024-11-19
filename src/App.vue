<script setup>
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';

// Import components that are visible on all pages of app
import RouterTitle from '@/components/RouterTitle.vue';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import ExtensionInstalledDialog from '@/components/ExtensionInstalledDialog.vue';

const updateData = ref(null);

// Check is extension was just updated
try {
  chrome.storage.local.get(['updateData'], (result) => {
    if (result) {
      const { updateData: data } = result;
      updateData.value = data;

      chrome.storage.local.remove(['updateData']);
    }
  });
} catch (e) {
  console.error(e);
}

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
    <ExtensionInstalledDialog :updateData />
  </main>
  <Footer />
</template>
