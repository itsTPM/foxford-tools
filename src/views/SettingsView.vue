<script setup>
import { onBeforeMount } from 'vue';

import SettingGroup from '@/components/Settings/SettingGroup.vue';
import Setting from '@/components/Settings/Setting.vue';
import { useSettings } from '@/composables/useSettings';

const { selectedSettingGroup, settingGroups, loadSettings } = useSettings();

onBeforeMount(async () => {
  await loadSettings();
});
</script>

<template>
  <div class="flex">
    <ul aria-label="Вкладки настроек" class="border-border border border-r-0">
      <li v-for="settingGroup in settingGroups" :key="settingGroup.id">
        <SettingGroup :settingGroup />
      </li>
    </ul>

    <ul class="bg-card border-border flex flex-col justify-center gap-4 overflow-y-auto border p-4">
      <li v-for="setting in selectedSettingGroup.settings" :key="setting.id">
        <Setting :setting />
      </li>
    </ul>
  </div>
</template>
