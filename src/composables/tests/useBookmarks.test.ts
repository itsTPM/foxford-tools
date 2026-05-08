import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick } from 'vue';

import { mockBookmarks } from '@/mocks';
import mockChromeAPI from './mockChromeApi';

describe('useBookmarks', () => {
  let chromeMock: ReturnType<typeof mockChromeAPI>;

  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    chromeMock = mockChromeAPI();
    global.chrome = chromeMock as unknown as typeof chrome;
  });

  it('should load bookmarks from storage', async () => {
    const stored = [{ url: 'https://example.com', title: 'Test' }];
    chromeMock.storage.sync.get.mockResolvedValue({ readingList: stored });

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    expect(bookmarks.value).toEqual(stored);
  });

  it('should keep empty state if storage has no bookmarks', async () => {
    chromeMock.storage.sync.get.mockResolvedValue({});

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    expect(bookmarks.value).toEqual([]);
  });

  it('should keep empty state if storage has empty readingList', async () => {
    chromeMock.storage.sync.get.mockResolvedValue({ readingList: [] });

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    expect(bookmarks.value).toEqual([]);
  });

  it('should save bookmarks to storage when state changes', async () => {
    chromeMock.storage.sync.get.mockResolvedValue({});
    chromeMock.storage.sync.set.mockResolvedValue(undefined);

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    const newBookmark = { url: 'https://example.com', title: 'New' };
    bookmarks.value.push(newBookmark);

    await nextTick();

    expect(bookmarks.value).toEqual([newBookmark]);
    expect(chromeMock.storage.sync.set).toHaveBeenCalledWith({
      readingList: [newBookmark],
    });
  });

  it('should save bookmarks when a bookmark property changes', async () => {
    const bookmark = { url: 'https://example.com', title: 'Original' };
    chromeMock.storage.sync.get.mockResolvedValue({ readingList: [bookmark] });
    chromeMock.storage.sync.set.mockResolvedValue(undefined);

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    bookmarks.value[0].title = 'Updated';

    await nextTick();

    expect(chromeMock.storage.sync.set).toHaveBeenCalledWith({
      readingList: [{ url: 'https://example.com', title: 'Updated' }],
    });
  });

  it('should remove bookmark by url', async () => {
    const bookmark1 = { url: 'https://example.com/1', title: 'One' };
    const bookmark2 = { url: 'https://example.com/2', title: 'Two' };
    chromeMock.storage.sync.get.mockResolvedValue({ readingList: [bookmark1, bookmark2] });

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks, removeBookmark } = useBookmarks();

    removeBookmark({ url: 'https://example.com/1', title: 'One' });

    expect(bookmarks.value).toEqual([bookmark2]);
  });

  it('should not change state when removing non-existent bookmark', async () => {
    const bookmark = { url: 'https://example.com', title: 'Test' };
    chromeMock.storage.sync.get.mockResolvedValue({ readingList: [bookmark] });

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks, removeBookmark } = useBookmarks();

    removeBookmark({ url: 'https://nonexistent.com', title: '' });

    expect(bookmarks.value).toEqual([bookmark]);
  });

  it('should use mock bookmarks in dev mode without calling chrome API', async () => {
    vi.stubEnv('VITE_USE_MOCKS', 'true');

    const { useBookmarks } = await import('../useBookmarks');
    const { bookmarks } = useBookmarks();

    expect(bookmarks.value).toEqual(mockBookmarks);
    expect(chromeMock.storage.sync.get).not.toHaveBeenCalled();
  });
});
