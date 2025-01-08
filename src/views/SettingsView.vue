<script setup>
import { ref } from 'vue';
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
      },
      {
        title: 'Успешность задач с вебинаров',
        id: 'webinarPercent',
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
      },
      {
        title: 'Возможность добавлять статьи в закладки',
        id: 'readingList',
      },
      {
        title: 'Быстрый поиск теории в Google',
        id: 'searchButton',
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
      },
    ],
  },
]);

const selectedSettingGroup = ref(settingGroups.value[0]);

function selectSettingGroup(settingGroup) {
  selectedSettingGroup.value = settingGroup;
}

function initSettingGroups() {
  for (const settingGroup of settingGroups.value) {
    for (const setting of settingGroup.settings) {
      const settingValue = localStorage.getItem(setting.id);

      if (settingValue) {
        setting.enabled = settingValue === 'true';
      } else {
        localStorage.setItem(setting.id, true);
        chrome.storage.local.set({ [setting.id]: true });
        setting.enabled = true;
      }
    }
  }
}

initSettingGroups();
</script>

<template>
  <div class="flex gap-2">
    <ul class="flex flex-col gap-2" aria-label="Вкладки настроек">
      <li v-for="settingGroup in settingGroups">
        <SettingGroup
          :key="settingGroup.id"
          :selectedSettingGroup
          :settingGroup
          @selectSettingGroup="selectSettingGroup" />
      </li>
    </ul>

    <ul class="flex flex-col justify-center gap-5 overflow-y-auto rounded-lg border bg-card px-2 py-4 transition-all">
      <li v-for="setting in selectedSettingGroup.settings">
        <Setting :key="setting.id" :setting="setting" />
      </li>
    </ul>
  </div>
</template>
