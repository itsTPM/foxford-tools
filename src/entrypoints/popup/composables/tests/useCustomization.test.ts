import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nextTick } from 'vue';

function mockMatchMedia(prefersDark: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)' && prefersDark,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  );
}

describe('useCustomization', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('should load saved customizations from localStorage', async () => {
    mockMatchMedia(false);
    localStorage.setItem('theme', 'dark');

    const { useCustomization } = await import('../useCustomization');
    const customization = useCustomization();
    await nextTick();

    expect(customization.theme.value).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should default to light theme when system prefers light', async () => {
    mockMatchMedia(false);

    const { useCustomization } = await import('../useCustomization');
    const customization = useCustomization();
    await nextTick();

    expect(customization.theme.value).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should default to dark theme when system prefers dark', async () => {
    mockMatchMedia(true);

    const { useCustomization } = await import('../useCustomization');
    const customization = useCustomization();
    await nextTick();

    expect(customization.theme.value).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should toggle theme between light and dark', async () => {
    mockMatchMedia(false);

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
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
