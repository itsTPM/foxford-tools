import { ref, toRefs, watch } from 'vue';
import type { Component } from 'vue';
import { IconBook2, IconPercentage, IconWand, IconNotebook } from '@tabler/icons-vue';

export interface SettingConfig {
  title: string;
  id: string;
}

export interface SettingGroup {
  title: string;
  id: string;
  icon: Component;
  settings: SettingConfig[];
}

type Settings = Record<string, boolean>;

interface State {
  settings: Settings;
  isRefreshNeeded: boolean;
  selectedSettingGroup: SettingGroup;
}

const settingGroups: SettingGroup[] = [
  {
    title: 'Проценты',
    id: 'percentages',
    icon: IconPercentage,
    settings: [
      { title: 'Успешность задач из ДЗ', id: 'homeworkPercent' },
      { title: 'Успешность задач с вебинаров', id: 'webinarPercent' },
    ],
  },
  {
    title: 'Теория',
    id: 'theory',
    icon: IconBook2,
    settings: [
      { title: 'Время чтения статьи', id: 'readingTime' },
      { title: 'Возможность добавлять статьи в закладки', id: 'readingList' },
      { title: 'Быстрый поиск теории в Google', id: 'searchButton' },
    ],
  },
  {
    title: 'Другое',
    id: 'other',
    icon: IconWand,
    settings: [{ title: 'Понятный заголовок страницы', id: 'dynamicTitle' }],
  },
  {
    title: 'Домашка',
    id: 'homework',
    icon: IconNotebook,
    settings: [{ title: 'Заменить цвет желтых блоков на светло-серый', id: 'fixYellowBlocks' }],
  },
];

const state = ref<State>({
  settings: {},
  isRefreshNeeded: false,
  selectedSettingGroup: settingGroups[0],
});

function loadSettings() {
  for (const settingGroup of settingGroups) {
    for (const setting of settingGroup.settings) {
      const storageValue = localStorage.getItem(setting.id);
      state.value.settings[setting.id] = storageValue !== null ? JSON.parse(storageValue) : true;
    }
  }
}

function saveSettings(settings: Settings) {
  for (const [id, value] of Object.entries(settings)) {
    localStorage.setItem(id, String(value));
  }
  chrome.storage.local.set(settings);
}

watch(() => state.value.settings, saveSettings, { deep: true });

loadSettings();

export function useSettings() {
  function toggleSetting(settingId: string) {
    state.value.settings[settingId] = !state.value.settings[settingId];
    state.value.isRefreshNeeded = true;
  }

  return {
    ...toRefs(state.value),
    settingGroups,
    toggleSetting,
  };
}
