import { describe, it, expect, vi, beforeEach } from 'vitest';

import mockChromeAPI from './mockChromeAPI';

describe('useBookmarks', () => {
  let bookmarks;

  beforeEach(async () => {
    vi.resetModules();
    global.chrome = mockChromeAPI();

    const { useBookmarks } = await import('../useBookmarks');

    bookmarks = useBookmarks();
  });

  it('should load bookmarks from storage', async () => {
    chrome.storage.sync.get.mockResolvedValue({ readingList: ['bookmark1', 'bookmark2'] });

    await bookmarks.loadBookmarksFromStorage();

    expect(bookmarks.bookmarks.value).toEqual(['bookmark1', 'bookmark2']);
  });

  it('should use empty array if no bookmarks are stored', async () => {
    chrome.storage.sync.get.mockResolvedValue({});

    await bookmarks.loadBookmarksFromStorage();

    expect(bookmarks.bookmarks.value).toEqual([]);
  });

  it('should save bookmarks to storage', async () => {
    bookmarks.bookmarks.value = ['bookmark1', 'bookmark2'];

    await bookmarks.saveBookmarksToStorage();

    expect(chrome.storage.sync.set).toHaveBeenCalledWith({ readingList: ['bookmark1', 'bookmark2'] });
  });

  it('should remove bookmark', () => {
    bookmarks.bookmarks.value = ['bookmark1', 'bookmark2'];

    bookmarks.removeBookmark('bookmark1');

    expect(bookmarks.bookmarks.value).toEqual(['bookmark2']);
  });
});
