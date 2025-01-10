<script setup>
import { IconX } from '@tabler/icons-vue';

import { useBookmarks } from '@/composables/useBookmarks';
const { removeBookmark } = useBookmarks();

const props = defineProps({
  bookmark: {
    type: Object,
    required: true,
  },
});

function openBookmark() {
  window.open(props.bookmark.url, '_blank');
}
</script>

<template>
  <div
    class="relative flex cursor-pointer justify-between rounded-md border p-3 transition hover:bg-muted"
    @click="openBookmark">
    <div class="flex flex-col justify-center">
      <p class="text-base">{{ bookmark.title }}</p>
      <p class="text-sm text-muted-foreground">{{ bookmark.courseName }}</p>
    </div>
    <div class="flex shrink-0 items-center justify-center">
      <img :alt="bookmark.courseName" :src="bookmark.courseImage" class="w-14" />
    </div>
    <div class="absolute right-1 top-1">
      <button
        class="text-muted-foreground transition hover:text-secondary-foreground focus:outline-none"
        aria-label="Удалить закладку"
        @click.stop="removeBookmark(bookmark)">
        <IconX class="size-5" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
