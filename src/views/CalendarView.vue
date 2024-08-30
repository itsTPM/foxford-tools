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
    <p>Получить ссылку на свой календарь</p>
    <p class="text-xs font-normal">она откроется и у других</p>
  </Button>

  <div v-else class="flex flex-col gap-3">
    <Input disabled :modelValue="calendarLink" />

    <Button variant="outline" @click="copyToClipboard" :class="isCopied ? 'bg-active' : ''" class="gap-3 transition">
      <template v-if="!isCopied">
        <IconCopy stroke-width="1.5" class="w-6" aria-hidden="true" />
        Скопировать
      </template>
      <template v-else>
        <IconCheck stroke-width="1.5" class="w-6" aria-hidden="true" />
        Ссылка в буфере обмена
      </template>
    </Button>
  </div>
</template>
