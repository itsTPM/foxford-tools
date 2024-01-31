<script setup>
import { ref } from 'vue';

const bookmarks = ref([{}, {}, {}, {}, {}]);
</script>

<template>
  <span v-if="!bookmarks.length" class="text-center text-gray-500 text-sm">Список пуст :(</span>
  <div v-for="bookmark in bookmarks" v-else class="flex flex-col gap-3">
    <div class="flex border-[1px] p-3">
      <div class="flex-grow flex flex-col justify-center">
        <span class="text-[16px]">Название</span>
        <span class="text-gray-500 text-[14px]">Название</span>
      </div>
      <div>
        <img
          class="w-[48px] h-[48px]"
          src="https://u.foxford.ngcdn.ru/uploads/discipline/svg_image/3/baad170604028da1.svg" />
      </div>
    </div>
  </div>
</template>
