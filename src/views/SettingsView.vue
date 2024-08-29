<script setup>
import { onMounted, ref } from 'vue';
import { IconBook2, IconPercentage, IconWand, IconNotebook } from '@tabler/icons-vue';
import SettingGroup from '@/components/Settings/SettingGroup.vue';
import Setting from '@/components/Settings/Setting.vue';

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

const selectedSettingGroup = ref(settingGroups.value[0]);

const selectSettingGroup = (settingGroup) => {
  selectedSettingGroup.value = settingGroup;
};

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
  <div class="grid grid-cols-[min-content,1fr] grid-rows-4 gap-2">
    <SettingGroup
      v-for="settingGroup in settingGroups"
      :key="settingGroup.id"
      :selectedSettingGroup
      :settingGroup
      @selectSettingGroup="selectSettingGroup" />
    <div
      class="col-start-2 row-span-4 row-start-1 flex h-full w-full flex-col justify-center gap-5 overflow-y-auto rounded-lg border bg-card px-2 py-4 transition-all">
      <Setting v-for="setting in selectedSettingGroup.settings" :key="setting.id" :setting="setting" />
    </div>
  </div>
</template>
