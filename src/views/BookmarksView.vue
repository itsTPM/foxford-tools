<script setup>
import { onMounted, watch } from 'vue';
import { IconMoodPuzzled } from '@tabler/icons-vue';

import Bookmark from '@/components/Bookmarks/Bookmark.vue';
import { useBookmarks } from '@/composables/useBookmarks';

const { bookmarks, loadBookmarksFromStorage, saveBookmarksToStorage } = useBookmarks();

onMounted(async () => {
  await loadBookmarksFromStorage();
});

watch(bookmarks, () => {
  saveBookmarksToStorage();
});
</script>

<template>
  <ul v-if="bookmarks.length" class="flex flex-col gap-2">
    <li v-for="bookmark in bookmarks">
      <Bookmark :bookmark />
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
