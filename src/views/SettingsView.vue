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
  <div class="flex gap-2">
    <ul class="flex flex-col gap-2">
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
