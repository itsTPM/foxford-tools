<script setup>
import { IconX } from '@tabler/icons-vue';

import { Button } from '../ui/button/';
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
  <Button variant="outline" class="relative grid h-fit grid-cols-6 text-balance px-3 font-normal" @click="openBookmark">
    <div class="col-span-4 flex flex-col gap-1 whitespace-normal text-left">
      <p class="text-base leading-5">{{ bookmark.title }}</p>
      <p class="text-xs text-muted-foreground">{{ bookmark.courseName }}</p>
    </div>
    <div class="col-span-2 flex items-center justify-end">
      <img alt="" :src="bookmark.courseImage" class="max-h-14" />
    </div>
    <div class="absolute right-1 top-1">
      <button
        class="text-muted-foreground transition focus-within:ring-2 focus-within:ring-ring hover:text-secondary-foreground focus:outline-hidden"
        aria-label="Удалить закладку"
        @click.stop="removeBookmark(bookmark)">
        <IconX class="size-5" aria-hidden="true" />
      </button>
    </div>
  </Button>
</template>
