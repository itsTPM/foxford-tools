import { reactive, toRefs } from 'vue';
import { proxyToObject } from '@/utils/proxyToObject';
import { mockBookmarks } from '@/mocks';

const isDev = import.meta.env.VITE_USE_MOCKS === 'true';

const state = reactive({
  bookmarks: [],
});

export function useBookmarks() {
  async function loadBookmarksFromStorage() {
    if (isDev) {
      state.bookmarks = mockBookmarks;
      return;
    }

    const storageState = (await chrome.storage.sync.get('readingList')).readingList;

    if (storageState) {
      state.bookmarks = storageState;
    }
  }

  async function saveBookmarksToStorage() {
    if (isDev) return;

    await chrome.storage.sync.set({ readingList: proxyToObject(state.bookmarks) });
  }

  function removeBookmark(bookmarkToRemove) {
    state.bookmarks = state.bookmarks.filter((bookmark) => bookmark !== bookmarkToRemove);
  }

  return {
    ...toRefs(state),
    loadBookmarksFromStorage,
    saveBookmarksToStorage,
    removeBookmark,
  };
}
