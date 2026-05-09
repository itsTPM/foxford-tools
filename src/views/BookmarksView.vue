<script setup lang="ts">
import BookmarkItem from '@/components/bookmarks/BookmarkItem.vue';
import { useBookmarks } from '@/composables/useBookmarks';

const { bookmarks } = useBookmarks();
</script>

<template>
  <ul v-if="bookmarks.length" class="flex flex-col gap-2">
    <li v-for="bookmark in bookmarks" :key="bookmark.url">
      <BookmarkItem :bookmark />
    </li>
  </ul>

  <div v-else class="py-3 text-center">
    <p class="font-medium">Закладок пока нет</p>
    <p class="text-sm text-muted-foreground">Попробуйте добавить что-нибудь на странице теории</p>
  </div>
</template>
