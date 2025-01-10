<script setup>
import { onBeforeMount } from 'vue';

import SettingGroup from '@/components/Settings/SettingGroup.vue';
import Setting from '@/components/Settings/Setting.vue';
import { useSettings } from '@/composables/useSettings';

const { selectedSettingGroup, settingGroups, loadSettings, selectSettingGroup } = useSettings();

onBeforeMount(async () => {
  await loadSettings();
});
</script>

<template>
  <div class="flex gap-2">
    <ul class="flex flex-col gap-2" aria-label="Вкладки настроек">
      <li v-for="settingGroup in settingGroups">
        <SettingGroup :key="settingGroup.id" :settingGroup @selectSettingGroup="selectSettingGroup" />
      </li>
    </ul>

    <ul class="flex flex-col justify-center gap-5 overflow-y-auto rounded-lg border bg-card px-2 py-4 transition-all">
      <li v-for="setting in selectedSettingGroup.settings">
        <Setting :key="setting.id" :setting="setting" />
      </li>
    </ul>
  </div>
</template>
