import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('useCustomization', () => {
  let customization;

  beforeEach(async () => {
    vi.resetModules();

    const { useCustomization } = await import('../useCustomization');

    customization = useCustomization();
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('should load saved customizations from localStorage', () => {
    localStorage.setItem('theme', 'dark');

    customization.loadSavedCustomizations();

    expect(customization.theme.value).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should toggle theme between light and dark', () => {
    customization.toggleTheme();

    expect(customization.theme.value).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);

    customization.toggleTheme();

    expect(customization.theme.value).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
