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
    class="relative flex cursor-pointer justify-between rounded-md border-[1px] p-3 hover:bg-muted"
    @click="openBookmark(bookmark)">
    <div class="flex flex-col justify-center">
      <span class="text-base">{{ bookmark.title }}</span>
      <span class="text-sm text-muted-foreground">{{ bookmark.courseName }}</span>
    </div>
    <div class="flex flex-shrink-0 items-center justify-center">
      <img :alt="bookmark.courseName" :src="bookmark.courseImage" class="w-14" />
    </div>
    <div class="absolute right-1 top-1">
      <div
        class="text-muted-foreground transition hover:text-primary focus:outline-none"
        @click.stop="
          removeBookmark(bookmark);
          $emit('bookmarkRemoved', bookmark);
        ">
        <IconX class="h-5 w-5" />
      </div>
    </div>
  </div>
</template>
