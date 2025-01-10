<script setup>
import FooterLinks from './FooterLinks.vue';
import FooterMeta from './FooterMeta.vue';
import { Button } from '@/components/ui/button/index.js';
import { useSettings } from '@/composables/useSettings';

const { isRefreshNeeded, setIsRefreshNeeded } = useSettings();

function refreshPage() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.reload(tabs[0].id);
  });

  setIsRefreshNeeded(false);
};
</script>

<template>
  <footer class="relative min-h-[50px]">
    <div v-if="!isRefreshNeeded" class="flex h-[50px] items-center justify-between">
      <FooterMeta></FooterMeta>
      <FooterLinks></FooterLinks>
    </div>
    <div
      class="absolute left-0 top-0 h-[50px] w-full -translate-x-full opacity-0 transition-all duration-500"
      :class="{
        'translate-x-0': isRefreshNeeded,
        'opacity-100': isRefreshNeeded,
      }">
      <Button
        class="flex w-full flex-col p-6"
        variant="outline"
        @click="refreshPage"
        :tabindex="isRefreshNeeded ? 0 : -1"
        :aria-hidden="!isRefreshNeeded">
        <p>Обновить страницу</p>
        <p class="text-xs font-normal">чтобы применить изменения</p>
      </Button>
    </div>
  </footer>
</template>
