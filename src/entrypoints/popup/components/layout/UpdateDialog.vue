<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IconSparkles, IconExternalLink, IconArrowNarrowRight } from '@tabler/icons-vue';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@popup/components/ui/dialog';
import { Button } from '@popup/components/ui/button';
import { useUpdateHandler, type UpdateData } from '@popup/composables/useUpdateHandler';

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
      <DialogHeader class="items-center text-center">
        <div class="mb-1 flex size-10 items-center justify-center bg-primary/10 text-primary">
          <IconSparkles class="size-6" stroke-width="1.5" />
        </div>
        <DialogTitle>Расширение обновлено</DialogTitle>
        <p class="flex items-center justify-center gap-1 leading-none text-muted-foreground">
          <span>{{ updateData.previousVersion }}</span>
          <IconArrowNarrowRight class="-mt-0.5 h-6 w-auto" stroke-width="1.5" />
          <span>{{ updateData.currentVersion }}</span>
        </p>
        <DialogDescription class="text-balance">Новые функции и исправления — на GitHub</DialogDescription>
      </DialogHeader>

      <DialogFooter class="flex-col gap-2">
        <Button
          as="a"
          :href="`https://github.com/itsTPM/foxford-tools/releases/tag/release-${updateData.currentVersion}`"
          target="_blank">
          <IconExternalLink stroke-width="1.5" />
          Список изменений
        </Button>
        <DialogClose as-child>
          <Button variant="outline">Закрыть</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
