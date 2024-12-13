<script setup>
import { Button } from '@/components/ui/button/index.js';

const props = defineProps({
  settingGroup: {
    type: Object,
    required: true,
  },
  selectedSettingGroup: {
    type: Object,
    required: false,
  },
});

const emits = defineEmits(['selectSettingGroup']);
</script>

<template>
  <Button
    class="relative col-start-1 w-10 p-0 duration-300 after:pointer-events-none after:absolute after:left-[calc(100%+1rem)] after:z-10 after:block after:w-fit after:-translate-x-full after:rounded-md after:border after:border-border after:bg-background/90 after:p-1 after:opacity-0 after:shadow-2xl after:backdrop-blur-xl after:transition-all after:duration-500 after:content-[attr(data-title)] after:hover:translate-x-0 after:hover:opacity-100"
    variant="outline"
    :class="{
      'bg-active': selectedSettingGroup === settingGroup,
    }"
    @click="() => $emit('selectSettingGroup', settingGroup)"
    :key="settingGroup.id"
    :data-title="settingGroup.title"
    :aria-label="settingGroup.title"
    :aria-current="selectedSettingGroup === settingGroup ? 'page' : null">
    <component :is="settingGroup.icon" stroke-width="1.5" class="w-6" aria-hidden="true" />
  </Button>
</template>
