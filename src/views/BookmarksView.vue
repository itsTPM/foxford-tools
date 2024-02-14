<script setup>
import { onMounted, ref } from 'vue';
import Bookmark from '@/components/Bookmarks/Bookmark.vue';

const bookmarks = ref([]);

onMounted(() => {
  const bookmarksList = new Promise((resolve) => {
    chrome.storage.sync.get(['readingList'], (result) => {
      resolve(result.readingList || []);
    });
  });

  bookmarksList.then((result) => {
    bookmarks.value = result;
  });
});

const onBookmarkRemoved = (bookmark) => {
  bookmarks.value = bookmarks.value.filter((item) => item.url !== bookmark.url);
};
</script>

<template>
  <span v-if="!bookmarks.length" class="text-center text-sm text-muted-foreground">Список пуст :(</span>

  <div v-for="bookmark in bookmarks" v-else class="flex flex-col gap-3">
    <Bookmark :bookmark @bookmarkRemoved="onBookmarkRemoved" />
  </div>
</template>
