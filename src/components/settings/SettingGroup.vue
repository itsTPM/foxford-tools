<script setup lang="ts">
import { computed } from 'vue';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useSettings, type SettingGroup } from '@/composables/useSettings';

const { selectedSettingGroup } = useSettings();

const props = defineProps<{ settingGroup: SettingGroup }>();

const isSettingGroupSelected = computed(() => selectedSettingGroup.value.id === props.settingGroup.id);
</script>

<template>
  <TooltipProvider :delayDuration="0" disableHoverableContent ignoreNonKeyboardFocus disableClosingTrigger>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          class="relative aspect-[0.8] h-auto border-none focus-visible:z-1"
          @click="selectedSettingGroup = settingGroup"
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
