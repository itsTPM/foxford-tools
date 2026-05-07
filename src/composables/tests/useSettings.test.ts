import { describe, it, beforeEach, vi, expect } from 'vitest';
import { nextTick } from 'vue';
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
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    global.chrome = mockChromeAPI() as unknown as typeof chrome;
  });

  it('should set settings to true if localStorage is empty', async () => {
    const { useSettings } = await import('../useSettings');
    const { settings } = useSettings();
    await nextTick();

    expect(settings.value).toEqual(defaultSettings);

    for (const setting in defaultSettings) {
      expect(localStorage.getItem(setting)).toBe('true');
    }

    expect(chrome.storage.local.set).toHaveBeenCalledWith(defaultSettings);
  });

  it('should load settings from localStorage', async () => {
    localStorage.setItem('readingTime', 'false');
    localStorage.setItem('readingList', 'false');

    const { useSettings } = await import('../useSettings');
    const { settings } = useSettings();

    expect(settings.value).toEqual({
      ...defaultSettings,
      readingTime: false,
      readingList: false,
    });
  });

  it('should toggle setting', async () => {
    const { useSettings } = await import('../useSettings');
    const { settings, toggleSetting } = useSettings();
    await nextTick();

    toggleSetting('readingTime');
    await nextTick();

    expect(settings.value.readingTime).toBe(false);
    expect(localStorage.getItem('readingTime')).toBe('false');
    expect(chrome.storage.local.set).toHaveBeenLastCalledWith(
      expect.objectContaining({ readingTime: false })
    );
  });
});
