<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/entrypoints/popup/components/ui/dialog';
import { useUpdateHandler, type UpdateData } from '@/entrypoints/popup/composables/useUpdateHandler';

const { getUpdateData, resetUpdateData } = useUpdateHandler();

const updateData = ref<UpdateData | null>(null);
const isOpen = ref(false);

onMounted(async () => {
  updateData.value = await getUpdateData();

  if (updateData.value) {
    await resetUpdateData();
    isOpen.value = true;
  }
});
</script>

<template>
  <Dialog v-if="updateData" v-model:open="isOpen">
    <DialogContent @open-auto-focus.prevent>
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
