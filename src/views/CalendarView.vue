<script setup>
import { ref } from 'vue';
import { IconCopy, IconCheck } from '@tabler/icons-vue';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCalendar } from '@/composables/useCalendar';

const { calendarLink, getCalendarLink, setCalendarLink, loadSavedCalendarLink } = useCalendar();

const isCopied = ref(false);

function copyToClipboard() {
  navigator.clipboard.writeText(calendarLink.value);
  isCopied.value = true;
}

async function getAndSetCalendarLink() {
  const newCalendarLink = await getCalendarLink();

  if (newCalendarLink) {
    setCalendarLink(newCalendarLink);
  }
}

loadSavedCalendarLink();
</script>

<template>
  <Button class="flex w-full flex-col p-6" variant="outline" @click="getAndSetCalendarLink" v-if="!calendarLink">
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
