<script setup>
import { Switch } from '@/components/ui/switch/';
import { Label } from '@/components/ui/label/';
import { useSettings } from '@/composables/useSettings';

const { toggleSetting } = useSettings();

defineProps({
  setting: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center gap-3">
    <!-- eslint-disable-next-line vue/no-mutating-props -->
    <Switch v-model:checked="setting.value" @update:checked="toggleSetting(setting.id)" :id="setting.id" />
    <Label :for="setting.id">
      {{ setting.title }}
    </Label>
  </div>
</template>
