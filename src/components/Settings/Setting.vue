<script setup>
import { Switch } from '@/components/ui/switch/index.js';
import { Label } from '@/components/ui/label/index.js';

import { useNeedRefreshStore } from '@/stores/needRefresh';

const needRefreshState = useNeedRefreshStore();

const props = defineProps({
  setting: {
    type: Object,
    required: true,
  },
});

const toggleSetting = (setting) => {
  setting.enabled = !setting.enabled;
  console.log(`${setting.title} now ${setting.enabled ? 'enabled' : 'disabled'} `);
  localStorage.setItem(setting.id, setting.enabled);
  try {
    chrome.storage.local.set({ [setting.id]: setting.enabled });
  } catch (e) {
    console.error(e);
  }
  needRefreshState.setNeedRefresh(true);
};
</script>

<template>
  <div class="flex items-center gap-3">
    <Switch v-model:checked="setting.enabled" @click="toggleSetting(setting)" />
    <Label>
      {{ setting.title }}
    </Label>
  </div>
</template>
