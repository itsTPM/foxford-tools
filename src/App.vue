<script setup>
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';

// Import components that are visible on all pages of app
import RouterTitle from '@/components/RouterTitle.vue';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import ExtensionInstalledDialog from '@/components/ExtensionInstalledDialog.vue';

const updateData = ref(null);

async function updateHandler() {
  const storageUpdateData = await chrome.storage.local.get('updateData');

  if (!storageUpdateData.updateData) return;

  await chrome.storage.local.remove('updateData');

  return storageUpdateData.updateData;
}

onMounted(async () => {
  // Get customization settings from local storage
  const theme = localStorage.getItem('theme');
  const color = localStorage.getItem('color');
  const radius = localStorage.getItem('radius');

  // Apply customization settings to root element
  document.documentElement.classList.add(`${theme || 'light'}`);
  document.documentElement.classList.add(`theme-${color || 'red'}`);
  document.documentElement.style.setProperty('--radius', `${radius || 0}rem`);

  updateData.value = await updateHandler();
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
