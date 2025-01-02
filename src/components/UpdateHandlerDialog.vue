<script setup>
import { ref, onMounted } from 'vue';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useUpdateHandler } from '@/composables/useUpdateHandler';

const { updateHandler } = useUpdateHandler();

const updateData = ref(null);
const isOpen = ref(false);

onMounted(async () => {
  updateData.value = await updateHandler();

  if (updateData.value) {
    isOpen.value = true;
  }
});
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent @openAutoFocus.prevent>
      <DialogHeader>
        <DialogTitle>Расширение было обновлено</DialogTitle>
        <p class="text-sm text-muted-foreground">{{ updateData.previousVersion }} -> {{ updateData.currentVersion }}</p>
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
