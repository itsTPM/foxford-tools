import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick } from 'vue';
import { fakeBrowser } from 'wxt/testing/fake-browser';

import { mockBookmarks } from '@/mocks';

describe('useBookmarks', () => {
  beforeEach(() => {
    vi.resetModules();
    fakeBrowser.reset();
    vi.stubEnv('DEV', false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it('should load bookmarks from storage', async () => {
    const stored = [{ url: 'https://example.com', title: 'Test' }];
    await fakeBrowser.storage.sync.set({ readingList: stored });

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    expect(bookmarks.value).toEqual(stored);
  });

  it('should keep empty state if storage has no bookmarks', async () => {
    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    expect(bookmarks.value).toEqual([]);
  });

  it('should keep empty state if storage has empty readingList', async () => {
    await fakeBrowser.storage.sync.set({ readingList: [] });

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    expect(bookmarks.value).toEqual([]);
  });

  it('should save bookmarks to storage when state changes', async () => {
    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    const newBookmark = { url: 'https://example.com', title: 'New' };
    bookmarks.value.push(newBookmark);

    await nextTick();

    expect(bookmarks.value).toEqual([newBookmark]);
    expect(await fakeBrowser.storage.sync.get('readingList')).toEqual({ readingList: [newBookmark] });
  });

  it('should save bookmarks when a bookmark property changes', async () => {
    const bookmark = { url: 'https://example.com', title: 'Original' };
    await fakeBrowser.storage.sync.set({ readingList: [bookmark] });

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    bookmarks.value[0].title = 'Updated';

    await nextTick();

    expect(await fakeBrowser.storage.sync.get('readingList')).toEqual({
      readingList: [{ url: 'https://example.com', title: 'Updated' }],
    });
  });

  it('should remove bookmark by url', async () => {
    const bookmark1 = { url: 'https://example.com/1', title: 'One' };
    const bookmark2 = { url: 'https://example.com/2', title: 'Two' };
    await fakeBrowser.storage.sync.set({ readingList: [bookmark1, bookmark2] });

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks, removeBookmark } = useBookmarks();

    removeBookmark({ url: 'https://example.com/1', title: 'One' });

    expect(bookmarks.value).toEqual([bookmark2]);
  });

  it('should not change state when removing non-existent bookmark', async () => {
    const bookmark = { url: 'https://example.com', title: 'Test' };
    await fakeBrowser.storage.sync.set({ readingList: [bookmark] });

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks, removeBookmark } = useBookmarks();

    removeBookmark({ url: 'https://nonexistent.com', title: '' });

    expect(bookmarks.value).toEqual([bookmark]);
  });

  it('should use mock bookmarks in dev mode without touching storage', async () => {
    vi.stubEnv('DEV', true);
    const setSpy = vi.spyOn(fakeBrowser.storage.sync, 'set');

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    expect(bookmarks.value).toEqual(mockBookmarks);
    expect(setSpy).not.toHaveBeenCalled();
  });
});
