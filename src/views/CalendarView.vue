<script setup>
import { onMounted, ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IconCopy, IconCheck } from '@tabler/icons-vue';

let calendarLink = ref('');
let isCopied = ref(false);

onMounted(() => {
  if (localStorage.getItem('calendarLink')) {
    calendarLink.value = localStorage.getItem('calendarLink');
  }
});

function getCalendarLink() {
  fetch('https://foxford.ru/api/calendar?date_from=2077-01-01&date_to=2077-01-01')
    .then((response) => response.json())
    .then((data) => {
      calendarLink.value = data.share_url;
      localStorage.setItem('calendarLink', data.share_url);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function copyToClipboard() {
  navigator.clipboard.writeText(calendarLink.value);
  isCopied.value = true;
}
</script>

<template>
  <Button class="flex w-full flex-col p-6" variant="outline" @click="getCalendarLink" v-if="!calendarLink">
    <span>Получить ссылку на свой календарь</span>
    <span class="text-xs font-normal">она откроется и у других</span>
  </Button>
  <div v-else class="flex flex-col gap-3">
    <Input disabled :modelValue="calendarLink" />

    <Button variant="outline" @click="copyToClipboard" :class="isCopied ? 'bg-active' : ''" class="transition">
      <div v-if="!isCopied" class="flex items-center justify-center gap-3">
        <IconCopy stroke-width="1.5" class="w-6" />
        Скопировать
      </div>
      <div v-else class="flex items-center justify-center gap-3">
        <IconCheck stroke-width="1.5" class="w-6" />
        Ссылка в буфере обмена
      </div>
    </Button>
  </div>
</template>
