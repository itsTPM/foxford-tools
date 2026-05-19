import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import { nextTick } from 'vue';

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
  let storageLocalSet: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    storageLocalSet = vi.fn();
    vi.doMock('wxt/browser', () => ({
      browser: {
        storage: {
          local: {
            set: storageLocalSet,
          },
        },
      },
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should set settings to true if localStorage is empty', async () => {
    const { useSettings } = await import('../useSettings');
    const { settings } = useSettings();
    await nextTick();

    expect(settings.value).toEqual(defaultSettings);

    for (const setting in defaultSettings) {
      expect(localStorage.getItem(setting)).toBe('true');
    }

    expect(storageLocalSet).toHaveBeenCalledWith(defaultSettings);
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
    expect(storageLocalSet).toHaveBeenLastCalledWith(expect.objectContaining({ readingTime: false }));
  });
});
