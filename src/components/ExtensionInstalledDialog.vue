<script setup lang="ts">
import { ref, watch } from 'vue';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const open = ref(false);

const props = defineProps({
  updateData: Object,
});

if (props.updateData !== null) {
  open.value = true;
  chrome.runtime.sendMessage('clearBadge');
}

watch(
  () => props.updateData,
  (value) => {
    if (value !== null) {
      open.value = true;
      chrome.runtime.sendMessage('clearBadge');
    }
  }
);
</script>

<template>
  <Dialog v-model:open="open" v-if="props.updateData">
    <DialogContent @openAutoFocus.prevent>
      <DialogHeader>
        <DialogTitle>Расширение было обновлено</DialogTitle>
        <p class="text-sm text-muted-foreground">
          {{ updateData?.previousVersion }} -> {{ updateData?.currentVersion }}
        </p>
        <DialogDescription>
          Список новых функций и исправлений можно найти
          <a
            href="https://github.com/itsTPM/foxford-tools/releases"
            class="text-primary transition-colors hover:text-primary/75"
            target="_blank">
            на GitHub
          </a>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
