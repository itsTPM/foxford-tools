<script setup>
import Bookmark from '@/components/Bookmarks/Bookmark.vue';
import { useBookmarks } from '@/composables/useBookmarks';

const { bookmarks } = useBookmarks();
</script>

<template>
  <ul v-if="bookmarks.length" class="flex flex-col gap-2">
    <li v-for="bookmark in bookmarks" :key="bookmark.url">
      <Bookmark :bookmark />
    </li>
  </ul>

  <div v-else class="py-3 text-center">
    <p class="font-medium">Закладок пока нет</p>
    <p class="text-muted-foreground text-sm">Попробуйте добавить что-нибудь на странице теории</p>
  </div>
</template>
