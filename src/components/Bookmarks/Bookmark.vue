<script setup>
const props = defineProps({
  bookmark: {
    type: Object,
    required: true,
  },
});

const openBookmark = (bookmark) => {
  window.open(bookmark.url, '_blank');
};
</script>

<template>
  <div class="flex cursor-pointer rounded-md border-[1px] p-3 hover:bg-muted" @click="openBookmark(bookmark)">
    <div class="flex flex-col justify-center">
      <span class="text-base">{{ bookmark.title }}</span>
      <span class="text-sm text-muted-foreground">{{ bookmark.courseName }}</span>
    </div>
    <div class="flex flex-shrink-0 items-center justify-center">
      <img :alt="bookmark.courseName" :src="bookmark.courseImage" class="w-14" />
    </div>
  </div>
</template>
