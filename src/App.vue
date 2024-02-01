<script setup>
import { defineAsyncComponent } from 'vue';
import { RouterView } from 'vue-router';
import RouterTitle from '@/components/RouterTitle.vue';

const Header = defineAsyncComponent(() => import('./components/Header/Header.vue'));
const Footer = defineAsyncComponent(() => import('./components/Footer/Footer.vue'));
</script>

<template>
  <Header />
  <main class="flex flex-col gap-3 pb-6 pt-3">
    <RouterTitle />
    <RouterView />
  </main>
  <Footer />
</template>
