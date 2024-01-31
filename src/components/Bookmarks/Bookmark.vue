<script setup>
const props = defineProps({
  bookmark: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex border-[1px] p-3 gap-0">
    <div class="flex-grow flex flex-col justify-center">
      <span class="text-base">{{ bookmark.title }}</span>
      <span class="text-gray-500 text-sm">{{ bookmark.courseName }}</span>
    </div>
    <div class="flex items-center justify-center">
      <img :src="bookmark.courseImage" class="w-14" />
    </div>
  </div>
</template>

<style scoped></style>
