<script setup>
import { onMounted, ref } from 'vue';
import Bookmark from '@/components/Bookmarks/Bookmark.vue';
import { IconMoodPuzzled } from '@tabler/icons-vue';

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
  <div v-for="bookmark in bookmarks" v-if="bookmarks.length" class="flex flex-col gap-3">
    <Bookmark :bookmark @bookmarkRemoved="onBookmarkRemoved" />
  </div>

  <div v-else>
    <div class="flex justify-between rounded-md border p-3">
      <div class="flex flex-col justify-center">
        <span class="text-base">А где?</span>
        <span class="text-sm text-muted-foreground">закладок пока нет</span>
      </div>
      <div class="relative flex items-center text-muted">
        <IconMoodPuzzled size="48" strokeWidth="1.75" />
      </div>
    </div>
  </div>
</template>
