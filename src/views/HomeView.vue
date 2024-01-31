<script setup>
import { Switch } from '@/components/ui/switch/index.js';
import { Label } from '@/components/ui/label/index.js';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button/index.js';
import { ref } from 'vue';
import { IconBook2, IconPacman, IconPercentage } from '@tabler/icons-vue';

const settingGroups = ref([
  {
    title: 'Проценты',
    id: 'percentages',
    icon: IconPercentage,
    settings: [
      {
        title: 'Успешность задач из ДЗ',
        id: 'homeworkPercent',
        enabled: true,
      },
      {
        title: 'Успешность задач с вебинаров',
        id: 'webinarPercent',
        enabled: true,
      },
    ],
  },
  {
    title: 'Теория',
    id: 'theory',
    icon: IconBook2,
    settings: [
      {
        title: 'Время чтения статьи',
        id: 'readingTime',
        enabled: true,
      },
      {
        title: 'Возможность добавлять статьи в закладки',
        id: 'readingList',
        enabled: true,
      },
    ],
  },
  {
    title: 'Другое',
    id: 'other',
    icon: IconPacman,
    settings: [
      {
        title: 'Заголовок',
        id: 'dynamicTitle',
        enabled: true,
      },
    ],
  },
]);

const toggleSetting = (setting) => {
  setting.enabled = !setting.enabled;
  console.log(`${setting.title} now ${setting.enabled ? 'enabled' : 'disabled'} `);
};
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Popover v-for="settingGroup in settingGroups" :key="settingGroup.id">
      <PopoverTrigger class="flex-grow basis-[calc(50%-4px)]">
        <Button class="w-full gap-2" variant="outline">
          <component :is="settingGroup.icon" strokeWidth="1.5" />
          {{ settingGroup.title }}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div class="flex flex-col gap-5">
          <div v-for="setting in settingGroup.settings" class="flex gap-3 items-center">
            <Switch v-model:checked="setting.enabled" @click="toggleSetting(setting)" />
            <Label>
              {{ setting.title }}
            </Label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>
