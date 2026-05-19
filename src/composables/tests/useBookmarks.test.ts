import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick } from 'vue';

import { mockBookmarks } from '@/mocks';

describe('useBookmarks', () => {
  let storageSyncGet: ReturnType<typeof vi.fn>;
  let storageSyncSet: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    storageSyncGet = vi.fn();
    storageSyncSet = vi.fn();
    vi.stubGlobal('chrome', { runtime: { id: 'test-extension-id' } });
    vi.doMock('wxt/browser', () => ({
      browser: {
        storage: {
          sync: {
            get: storageSyncGet,
            set: storageSyncSet,
          },
        },
      },
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should load bookmarks from storage', async () => {
    const stored = [{ url: 'https://example.com', title: 'Test' }];
    storageSyncGet.mockResolvedValue({ readingList: stored });

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    expect(bookmarks.value).toEqual(stored);
  });

  it('should keep empty state if storage has no bookmarks', async () => {
    storageSyncGet.mockResolvedValue({});

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    expect(bookmarks.value).toEqual([]);
  });

  it('should keep empty state if storage has empty readingList', async () => {
    storageSyncGet.mockResolvedValue({ readingList: [] });

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    expect(bookmarks.value).toEqual([]);
  });

  it('should save bookmarks to storage when state changes', async () => {
    storageSyncGet.mockResolvedValue({});
    storageSyncSet.mockResolvedValue(undefined);

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    const newBookmark = { url: 'https://example.com', title: 'New' };
    bookmarks.value.push(newBookmark);

    await nextTick();

    expect(bookmarks.value).toEqual([newBookmark]);
    expect(storageSyncSet).toHaveBeenCalledWith({
      readingList: [newBookmark],
    });
  });

  it('should save bookmarks when a bookmark property changes', async () => {
    const bookmark = { url: 'https://example.com', title: 'Original' };
    storageSyncGet.mockResolvedValue({ readingList: [bookmark] });
    storageSyncSet.mockResolvedValue(undefined);

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    bookmarks.value[0].title = 'Updated';

    await nextTick();

    expect(storageSyncSet).toHaveBeenCalledWith({
      readingList: [{ url: 'https://example.com', title: 'Updated' }],
    });
  });

  it('should remove bookmark by url', async () => {
    const bookmark1 = { url: 'https://example.com/1', title: 'One' };
    const bookmark2 = { url: 'https://example.com/2', title: 'Two' };
    storageSyncGet.mockResolvedValue({ readingList: [bookmark1, bookmark2] });

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks, removeBookmark } = useBookmarks();

    removeBookmark({ url: 'https://example.com/1', title: 'One' });

    expect(bookmarks.value).toEqual([bookmark2]);
  });

  it('should not change state when removing non-existent bookmark', async () => {
    const bookmark = { url: 'https://example.com', title: 'Test' };
    storageSyncGet.mockResolvedValue({ readingList: [bookmark] });

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks, removeBookmark } = useBookmarks();

    removeBookmark({ url: 'https://nonexistent.com', title: '' });

    expect(bookmarks.value).toEqual([bookmark]);
  });

  it('should use mock bookmarks outside extension context without calling browser API', async () => {
    vi.stubGlobal('chrome', undefined);

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    expect(bookmarks.value).toEqual(mockBookmarks);
    expect(storageSyncGet).not.toHaveBeenCalled();
  });
});
