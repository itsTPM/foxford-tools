import { ref, toRaw, watch } from 'vue';
import { browser } from 'wxt/browser';
import { mockBookmarks } from '@/mocks';
import { isExtension } from '@/lib/isExtension';

const state = ref<Bookmark[]>([]);

async function loadBookmarks() {
  const storageState = await browser.storage.sync.get<{ readingList?: Bookmark[] }>('readingList');

  if (storageState.readingList?.length) {
    state.value = storageState.readingList;
  }
}

async function saveBookmarks() {
  await browser.storage.sync.set({ readingList: toRaw(state.value) });
}

if (isExtension) {
  void loadBookmarks().then(() => {
    watch(state, saveBookmarks, { deep: true });
  });
} else {
  state.value = mockBookmarks;
}

export function useBookmarks() {
  function removeBookmark(bookmark: Bookmark) {
    state.value = state.value.filter((b) => b.url !== bookmark.url);
  }

  return {
    bookmarks: state,
    removeBookmark,
  };
}
