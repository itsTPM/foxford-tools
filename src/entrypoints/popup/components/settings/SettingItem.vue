<script setup lang="ts">
import { Switch } from '@/entrypoints/popup/components/ui/switch';
import { Label } from '@/entrypoints/popup/components/ui/label';
import { useSettings } from '@/entrypoints/popup/composables/useSettings';

const { settings, toggleSetting } = useSettings();

defineProps<{ setting: SettingConfig }>();
</script>

<template>
  <div class="flex items-center gap-3">
    <Switch :id="setting.id" :model-value="settings[setting.id]" @update:model-value="toggleSetting(setting.id)" />
    <Label :for="setting.id">{{ setting.title }}</Label>
  </div>
</template>
