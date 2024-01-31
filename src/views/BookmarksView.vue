<script setup>
import { ref } from 'vue';

const bookmarks = ref([
  {
    title: 'Пушкин А. С. «Пиковая дама»',
    courseName: 'Литература',
    courseImage: 'https://u.foxford.ngcdn.ru/uploads/discipline/svg_image/27/1a8bf269c80f38a1.svg',
    courseColor: '#6fbb5c',
  },
]);
</script>

<template>
  <span v-if="!bookmarks.length" class="text-center text-gray-500 text-sm">Список пуст :(</span>

  <div v-for="bookmark in bookmarks" v-else class="flex flex-col gap-3">
    <div class="flex border-[1px] p-3 gap-0">
      <div class="flex-grow flex flex-col justify-center">
        <span class="text-base">{{ bookmark.title }}</span>
        <span class="text-gray-500 text-sm">{{ bookmark.courseName }}</span>
      </div>
      <div class="flex items-center justify-center">
        <img :src="bookmark.courseImage" class="w-14" />
      </div>
    </div>
  </div>
</template>
