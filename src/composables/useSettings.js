import { reactive, toRefs, ref } from 'vue';
import { IconBook2, IconPercentage, IconWand, IconNotebook } from '@tabler/icons-vue';

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

const state = reactive({
  settings: {},
  isRefreshNeeded: false,
  selectedSettingGroup: settingGroups.value[0],
});

export function useSettings() {
  async function loadSettings() {
    for (const settingGroup of settingGroups.value) {
      for (const setting of settingGroup.settings) {
        const storageValue = localStorage.getItem(setting.id);

        if (storageValue) {
          state.settings[setting.id] = JSON.parse(storageValue);
        } else {
          await setSetting(setting.id, true);
        }

        setting.value = state.settings[setting.id];
      }
    }
  }

  async function toggleSetting(settingId) {
    const newValue = !state.settings[settingId];
    await setSetting(settingId, newValue);
    setIsRefreshNeeded(true);
  }

  async function setSetting(settingId, newValue) {
    state.settings[settingId] = newValue;
    localStorage.setItem(settingId, newValue);
    await chrome.storage.local.set({ [settingId]: newValue });
  }

  function selectSettingGroup(settingGroup) {
    state.selectedSettingGroup = settingGroup;
  }

  function setIsRefreshNeeded(value) {
    state.isRefreshNeeded = value;
  }

  return {
    ...toRefs(state),
    settingGroups,
    loadSettings,
    toggleSetting,
    selectSettingGroup,
    setIsRefreshNeeded,
  };
}
