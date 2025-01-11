import { describe, it, beforeEach, vi, expect } from 'vitest';

import mockChromeAPI from './mockChromeAPI';

const defaultSettings = {
  homeworkPercent: true,
  webinarPercent: true,
  readingTime: true,
  readingList: true,
  searchButton: true,
  dynamicTitle: true,
  fixYellowBlocks: true,
};

describe('useSettings', () => {
  let settings;

  beforeEach(async () => {
    vi.resetModules();
    global.chrome = mockChromeAPI();

    const { useSettings } = await import('../useSettings');

    settings = useSettings();
    localStorage.clear();
  });

  it('should set settings to true if localStorage is empty', async () => {
    await settings.loadSettings();

    expect(settings.settings.value).toEqual(defaultSettings);

    for (const setting in defaultSettings) {
      expect(localStorage.getItem(setting)).toBe('true');
    }

    expect(chrome.storage.local.set).toHaveBeenCalledTimes(Object.keys(defaultSettings).length);
  });

  it('should load settings from localStorage', async () => {
    localStorage.setItem('readingTime', 'false');
    localStorage.setItem('readingList', 'false');

    await settings.loadSettings();

    expect(settings.settings.value).toEqual({
      ...defaultSettings,
      readingTime: false,
      readingList: false,
    });
  });

  it('should toggle setting', async () => {
    await settings.loadSettings();

    await settings.toggleSetting('readingTime');

    expect(settings.settings.value.readingTime).toBe(false);
    expect(localStorage.getItem('readingTime')).toBe('false');
    expect(chrome.storage.local.set).toHaveBeenCalledWith({ readingTime: false });
  });
});
