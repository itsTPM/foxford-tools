<script setup lang="ts">
import { IconCoins } from '@tabler/icons-vue';
import { Skeleton } from '@/entrypoints/popup/components/ui/skeleton';

defineProps<{
  loading: boolean;
  bonusAmount: number | null;
}>();
</script>

<template>
  <div v-if="loading || bonusAmount !== null" class="flex justify-between gap-4 border border-border p-3">
    <template v-if="loading">
      <div class="flex flex-col justify-center gap-2">
        <Skeleton class="h-4 w-28" />
        <Skeleton class="h-3 w-20" />
      </div>
      <Skeleton class="size-12 shrink-0" />
    </template>

    <template v-else>
      <div class="flex flex-col justify-center">
        <p>{{ bonusAmount }} фоксиков</p>
        <p class="text-sm text-muted-foreground">у вас на счету</p>
      </div>
      <IconCoins class="size-12 text-muted-foreground" stroke-width="1.5" aria-hidden="true" />
    </template>
  </div>
</template>
