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
  <ul v-if="bookmarks.length">
    <li v-for="bookmark in bookmarks">
      <Bookmark :bookmark @bookmarkRemoved="onBookmarkRemoved" />
    </li>
  </ul>

  <div v-else>
    <div class="flex justify-between rounded-md border p-3">
      <div class="flex flex-col justify-center">
        <p class="text-base">А где?</p>
        <p class="text-sm text-muted-foreground">закладок пока нет</p>
      </div>
      <div class="relative flex items-center text-muted">
        <IconMoodPuzzled size="48" stroke-width="1.75" aria-hidden="true" />
      </div>
    </div>
  </div>
</template>
