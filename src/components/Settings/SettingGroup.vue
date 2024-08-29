<script setup>
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover/index.js';
import { Button } from '@/components/ui/button/index.js';
import Setting from '@/components/Settings/Setting.vue';

const props = defineProps({
  settingGroup: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <Popover>
    <Button class="w-full gap-2" variant="outline" as-child>
      <PopoverTrigger class="flex-grow basis-[calc(50%-0.25rem)]">
        <component :is="settingGroup.icon" stroke-width="1.5" class="w-6" />
        {{ settingGroup.title }}
      </PopoverTrigger>
    </Button>
    <PopoverContent>
      <div class="flex flex-col gap-5">
        <Setting v-for="setting in settingGroup.settings" :key="setting.id" :setting="setting" />
      </div>
    </PopoverContent>
  </Popover>
</template>
