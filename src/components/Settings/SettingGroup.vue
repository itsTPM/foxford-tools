<script setup>
import { computed } from 'vue';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button/index.js';
import { useSettings } from '@/composables/useSettings';

const { selectedSettingGroup, selectSettingGroup } = useSettings();

const props = defineProps({
  settingGroup: {
    type: Object,
    required: true,
  },
});

const isSettingGroupSelected = computed(() => selectedSettingGroup.value.id === props.settingGroup.id);
</script>

<template>
  <TooltipProvider :delayDuration="0" disableHoverableContent ignoreNonKeyboardFocus disableClosingTrigger>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          class="aspect-[0.8] h-auto border-none"
          @click="selectSettingGroup(settingGroup)"
          :key="settingGroup.id"
          :aria-current="isSettingGroupSelected ? 'page' : null">
          <component :is="settingGroup.icon" stroke-width="1.5" aria-hidden="true" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>
          {{ settingGroup.title }}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
