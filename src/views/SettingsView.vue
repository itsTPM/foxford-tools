<script setup>
import { onMounted, ref } from 'vue';
import { IconBook2, IconPercentage, IconWand } from '@tabler/icons-vue';
import SettingGroup from '@/components/Settings/SettingGroup.vue';
import { IconBook } from '@tabler/icons-vue';
import { IconNotebook } from '@tabler/icons-vue';

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
      {
        title: 'Быстрый поиск теории в Google',
        id: 'searchButton',
        enabled: true,
      },
    ],
  },
  {
    title: 'Другое',
    id: 'other',
    icon: IconWand,
    settings: [
      {
        title: 'Понятный заголовок страницы',
        id: 'dynamicTitle',
        enabled: true,
      },
    ],
  },
  {
    title: 'Домашка',
    id: 'homework',
    icon: IconNotebook,
    settings: [
      {
        title: 'Заменить цвет желтых блоков на светло-серый',
        id: 'fixYellowBlocks',
        enabled: true,
      },
    ],
  },
]);

onMounted(() => {
  settingGroups.value.forEach((settingGroup) => {
    settingGroup.settings.forEach((setting) => {
      const settingValue = localStorage.getItem(setting.id);
      if (settingValue) {
        setting.enabled = settingValue === 'true';
      } else {
        localStorage.setItem(setting.id, true);
        try {
          chrome.storage.local.set({ [setting.id]: true });
        } catch (e) {
          console.error(e);
        }
      }
    });
  });
});
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <SettingGroup v-for="settingGroup in settingGroups" :key="settingGroup.id" :settingGroup="settingGroup" />
  </div>
</template>
