<script setup>
import { onMounted, ref } from 'vue';
import { IconBook2, IconPercentage, IconWand } from '@tabler/icons-vue';
import SettingGroup from '@/components/Settings/SettingGroup.vue';
import { Button } from '@/components/ui/button/index.js';

const needRefresh = ref(false);

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

const setNeedRefresh = () => {
  needRefresh.value = true;
};

const refreshPage = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.reload(tabs[0].id);
  });
  needRefresh.value = false;
};
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <SettingGroup
      v-for="settingGroup in settingGroups"
      :key="settingGroup.id"
      :setNeedRefresh="setNeedRefresh"
      :settingGroup="settingGroup" />
  </div>
  <div v-if="needRefresh">
    <Button class="flex w-full flex-col p-6" variant="outline" @click="refreshPage">
      <span>Обновить страницу</span>
      <span class="text-xs font-normal">чтобы применить изменения</span>
    </Button>
  </div>
</template>
