<script setup>
import { ref } from 'vue';
import Bookmark from '@/components/Bookmarks/Bookmark.vue';

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
  <span v-if="!bookmarks.length" class="text-center text-muted-foreground text-sm">Список пуст :(</span>

  <div v-for="bookmark in bookmarks" v-else class="flex flex-col gap-3">
    <Bookmark :bookmark />
  </div>
</template>
