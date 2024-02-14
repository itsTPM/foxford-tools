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
  <footer>
    <div v-if="!needRefreshState.needRefresh" class="flex h-[50px] items-center justify-between">
      <FooterMeta></FooterMeta>
      <FooterLinks></FooterLinks>
    </div>
    <div v-else>
      <Button class="flex w-full flex-col p-6" variant="outline" @click="refreshPage">
        <span>Обновить страницу</span>
        <span class="text-xs font-normal">чтобы применить изменения</span>
      </Button>
    </div>
  </footer>
</template>
