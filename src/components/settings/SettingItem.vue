<script setup lang="ts">
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSettings, type SettingConfig } from '@/composables/useSettings';

const { settings, toggleSetting } = useSettings();

defineProps<{ setting: SettingConfig }>();
</script>

<template>
  <div class="flex items-center gap-3">
    <Switch :model-value="settings[setting.id]" @update:modelValue="toggleSetting(setting.id)" :id="setting.id" />
    <Label :for="setting.id">{{ setting.title }}</Label>
  </div>
</template>
