<script setup lang="ts">
import SettingGroup from '@popup/components/settings/SettingGroup.vue';
import SettingItem from '@popup/components/settings/SettingItem.vue';
import { useSettings } from '@popup/composables/useSettings';

const { selectedSettingGroup, settingGroups } = useSettings();
</script>

<template>
  <div class="flex">
    <ul aria-label="Вкладки настроек" class="border border-r-0 border-border">
      <li v-for="settingGroup in settingGroups" :key="settingGroup.id">
        <SettingGroup :setting-group />
      </li>
    </ul>

    <ul class="flex grow flex-col justify-center gap-4 overflow-y-auto border border-border bg-card p-4">
      <li v-for="setting in selectedSettingGroup.settings" :key="setting.id">
        <SettingItem :setting />
      </li>
    </ul>
  </div>
</template>
