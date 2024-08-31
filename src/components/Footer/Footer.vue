<script setup>
import FooterLinks from './FooterLinks.vue';
import FooterMeta from './FooterMeta.vue';
import { Button } from '@/components/ui/button/index.js';

import { useNeedRefreshStore } from '@/stores/needRefresh';

const needRefreshState = useNeedRefreshStore();

const refreshPage = () => {
  try {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.reload(tabs[0].id);
    });
  } catch (e) {
    console.error(e);
  }
  needRefreshState.setNeedRefresh(false);
};
</script>

<template>
  <footer class="relative min-h-[50px]">
    <div v-if="!needRefreshState.needRefresh" class="flex h-[50px] items-center justify-between">
      <FooterMeta></FooterMeta>
      <FooterLinks></FooterLinks>
    </div>
    <div
      class="absolute left-0 top-0 h-[50px] w-full -translate-x-full opacity-0 transition-all duration-500"
      :class="{
        'translate-x-0': needRefreshState.needRefresh,
        'opacity-100': needRefreshState.needRefresh,
      }">
      <Button class="flex w-full flex-col p-6" variant="outline" @click="refreshPage">
        <p>Обновить страницу</p>
        <p class="text-xs font-normal">чтобы применить изменения</p>
      </Button>
    </div>
  </footer>
</template>
