<script setup>
const props = defineProps({
  bookmark: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex border-[1px] p-3 rounded-md">
    <div class="flex flex-col justify-center">
      <span class="text-base">{{ bookmark.title }}</span>
      <span class="text-muted-foreground text-sm">{{ bookmark.courseName }}</span>
    </div>
    <div class="flex items-center justify-center flex-shrink-0">
      <img :alt="bookmark.courseName" :src="bookmark.courseImage" class="w-14" />
    </div>
  </div>
</template>
