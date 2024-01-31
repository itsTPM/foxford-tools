<script setup>
import { defineAsyncComponent } from 'vue';
import { RouterView } from 'vue-router';
import RouterTitle from '@/components/RouterTitle.vue';

const Header = defineAsyncComponent(() => import('./components/Header/Header.vue'));
const Footer = defineAsyncComponent(() => import('./components/Footer/Footer.vue'));
</script>

<template>
  <Header></Header>
  <main class="pt-3 pb-6 gap-3 flex flex-col">
    <RouterTitle />
    <RouterView />
  </main>
  <Footer></Footer>
</template>
