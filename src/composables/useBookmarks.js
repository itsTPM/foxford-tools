import { reactive, toRefs } from 'vue';

const state = reactive({
  bookmarks: [],
});

function proxyToObject(proxy) {
  return JSON.parse(JSON.stringify(proxy));
}

export function useBookmarks() {
  async function loadBookmarksFromStorage() {
    const storageState = (await chrome.storage.sync.get('readingList')).readingList;

    if (storageState) {
      state.bookmarks = storageState;
    }
  }

  async function saveBookmarksToStorage() {
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
