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
          :class="{
            'bg-active': isSettingGroupSelected,
          }"
          variant="outline"
          size="icon"
          @click="selectSettingGroup(settingGroup)"
          :key="settingGroup.id"
          :aria-label="settingGroup.title"
          :aria-current="isSettingGroupSelected ? 'page' : null">
          <component :is="settingGroup.icon" stroke-width="1.5" class="w-6" aria-hidden="true" />
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
