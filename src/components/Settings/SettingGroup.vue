<script setup>
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover/index.js';
import { Button } from '@/components/ui/button/index.js';
import Setting from '@/components/Settings/Setting.vue';

const props = defineProps({
  settingGroup: {
    type: Object,
    required: true,
  },
  setNeedRefresh: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <Popover>
    <PopoverTrigger class="flex-grow basis-[calc(50%-4px)]">
      <Button class="w-full gap-2" variant="outline">
        <component :is="settingGroup.icon" strokeWidth="1.5" />
        {{ settingGroup.title }}
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <div class="flex flex-col gap-5">
        <Setting
          v-for="setting in settingGroup.settings"
          :key="setting.id"
          :setNeedRefresh="setNeedRefresh"
          :setting="setting" />
      </div>
    </PopoverContent>
  </Popover>
</template>
