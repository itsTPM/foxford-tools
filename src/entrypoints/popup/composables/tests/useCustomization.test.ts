import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nextTick } from 'vue';

describe('useCustomization', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('should load saved customizations from localStorage', async () => {
    localStorage.setItem('theme', 'dark');

    const { useCustomization } = await import('../useCustomization');
    const customization = useCustomization();
    await nextTick();

    expect(customization.theme.value).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should default to light theme when localStorage is empty', async () => {
    const { useCustomization } = await import('../useCustomization');
    const customization = useCustomization();

    expect(customization.theme.value).toBe('light');
  });

  it('should not apply any theme class to DOM on initial load without localStorage', async () => {
    const { useCustomization } = await import('../useCustomization');
    useCustomization();
    await nextTick();

    expect(document.documentElement.classList.contains('light')).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should toggle theme between light and dark', async () => {
    const { useCustomization } = await import('../useCustomization');
    const customization = useCustomization();

    customization.toggleTheme();
    await nextTick();

    expect(customization.theme.value).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);

    customization.toggleTheme();
    await nextTick();

    expect(customization.theme.value).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
