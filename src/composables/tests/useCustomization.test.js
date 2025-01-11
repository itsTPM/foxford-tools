import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('useCustomization', () => {
  let customization;

  beforeEach(async () => {
    vi.resetModules();

    const { useCustomization } = await import('../useCustomization');

    customization = useCustomization();
    localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.style.setProperty('--radius', '');
  });

  it('should load saved customizations from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    localStorage.setItem('radius', '0.5');

    customization.loadSavedCustomizations();

    expect(customization.theme.value).toBe('dark');
    expect(customization.radius.value).toEqual([0.5]);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.style.getPropertyValue('--radius')).toBe('0.5rem');
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

  it('should set a new radius', () => {
    customization.setRadius(0.5);

    expect(customization.radius.value).toEqual([0.5]);
    expect(localStorage.getItem('radius')).toBe('0.5');
    expect(document.documentElement.style.getPropertyValue('--radius')).toBe('0.5rem');
  });
});
