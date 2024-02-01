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
  <div class="flex border-[1px] p-3 rounded-md cursor-pointer hover:bg-muted" @click="openBookmark(bookmark)">
    <div class="flex flex-col justify-center">
      <span class="text-base">{{ bookmark.title }}</span>
      <span class="text-muted-foreground text-sm">{{ bookmark.courseName }}</span>
    </div>
    <div class="flex items-center justify-center flex-shrink-0">
      <img :alt="bookmark.courseName" :src="bookmark.courseImage" class="w-14" />
    </div>
  </div>
</template>
