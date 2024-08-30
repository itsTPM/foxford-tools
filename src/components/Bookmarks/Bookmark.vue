<script setup>
import { IconX } from '@tabler/icons-vue';

const props = defineProps({
  bookmark: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['bookmarkRemoved']);

const openBookmark = (bookmark) => {
  window.open(bookmark.url, '_blank');
};

const removeBookmark = (bookmark) => {
  chrome.storage.sync.get(['readingList'], (result) => {
    const readingList = result.readingList || [];
    const newReadingList = readingList.filter((item) => item.url !== bookmark.url);
    chrome.storage.sync.set({ readingList: newReadingList });
  });
};
</script>

<template>
  <div
    class="relative flex cursor-pointer justify-between rounded-md border p-3 transition hover:bg-muted"
    @click="openBookmark(bookmark)">
    <div class="flex flex-col justify-center">
      <p class="text-base">{{ bookmark.title }}</p>
      <p class="text-sm text-muted-foreground">{{ bookmark.courseName }}</p>
    </div>
    <div class="flex flex-shrink-0 items-center justify-center">
      <img :alt="bookmark.courseName" :src="bookmark.courseImage" class="w-14" />
    </div>
    <div class="absolute right-1 top-1">
      <button
        class="text-muted-foreground transition hover:text-secondary-foreground focus:outline-none"
        aria-label="Удалить закладку"
        @click.stop="
          removeBookmark(bookmark);
          $emit('bookmarkRemoved', bookmark);
        ">
        <IconX class="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
