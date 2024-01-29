<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header/Header.vue';
import Footer from './components/Footer/Footer.vue';
import RouterTitle from '@/components/RouterTitle.vue';
</script>

<template>
  <Header></Header>
  <main class="py-4 gap-4 flex flex-col">
    <RouterTitle />
    <RouterView />
  </main>
  <Footer></Footer>
</template>
