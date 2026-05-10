<script setup lang="ts">
import { computed } from 'vue';
import { IconBook2, IconPercentage, IconWand, IconNotebook, type Icon } from '@tabler/icons-vue';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/composables/useSettings';

const icons: Record<string, Icon> = {
  percentages: IconPercentage,
  theory: IconBook2,
  other: IconWand,
  homework: IconNotebook,
};

const { selectedSettingGroup } = useSettings();

const props = defineProps<{ settingGroup: SettingGroup }>();

const isSettingGroupSelected = computed(() => selectedSettingGroup.value.id === props.settingGroup.id);
</script>

<template>
  <TooltipProvider :delay-duration="0" disable-hoverable-content ignore-non-keyboard-focus disable-closing-trigger>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          :key="settingGroup.id"
          variant="outline"
          size="icon"
          class="relative aspect-[0.8] h-auto border-none focus-visible:z-1"
          :aria-current="isSettingGroupSelected ? 'page' : null"
          @click="selectedSettingGroup = settingGroup">
          <component :is="icons[settingGroup.id]" stroke-width="1.5" aria-hidden="true" />
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
