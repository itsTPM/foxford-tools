<script setup>
import { defineAsyncComponent, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import RouterTitle from '@/components/RouterTitle.vue';

const Header = defineAsyncComponent(() => import('./components/Header/Header.vue'));
const Footer = defineAsyncComponent(() => import('./components/Footer/Footer.vue'));

onMounted(() => {
  const theme = localStorage.getItem('theme');
  const color = localStorage.getItem('color');
  const radius = localStorage.getItem('radius');
  document.documentElement.classList.add(`${theme || 'light'}`);
  document.documentElement.classList.add(`theme-${color || 'zinc'}`);
  document.documentElement.style.setProperty('--radius', `${radius || 0.5}rem`);
});
</script>

<template>
  <Header />
  <main class="flex flex-col gap-3 pb-6 pt-3">
    <RouterTitle />
    <RouterView />
  </main>
  <Footer />
</template>
