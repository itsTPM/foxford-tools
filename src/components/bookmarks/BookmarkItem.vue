<script setup lang="ts">
import { IconTrash } from '@tabler/icons-vue';
import { Button } from '../ui/button/';
import { useBookmarks } from '@/composables/useBookmarks';

const { removeBookmark } = useBookmarks();

const props = defineProps<{ bookmark: Bookmark }>();

function handleRemoveBookmark() {
  removeBookmark(props.bookmark);
}
</script>

<template>
  <div class="flex">
    <Button
      class="relative h-auto w-auto border-r-0 p-2 focus-visible:z-1"
      variant="outline"
      @click="handleRemoveBookmark"
      aria-label="Удалить">
      <IconTrash stroke-width="1.5" class="size-5" aria-hidden="true" />
    </Button>

    <Button
      variant="outline"
      class="relative h-auto flex-1 justify-between gap-2 px-2 py-1 whitespace-normal focus-visible:z-1"
      as-child>
      <a :href="bookmark.url" target="_blank">
        <div>
          <p class="text-sm">{{ bookmark.title }}</p>
          <p class="font-normal text-muted-foreground">{{ bookmark.courseName }}</p>
        </div>

        <img alt="" :src="bookmark.courseImage" class="aspect-square w-16 object-contain" />
      </a>
    </Button>
  </div>
</template>
