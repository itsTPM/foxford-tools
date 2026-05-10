<script setup lang="ts">
import { IconArrowBadgeUp } from '@tabler/icons-vue';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

defineProps<{
  loading: boolean;
  data: LevelData | null;
}>();
</script>

<template>
  <div v-if="loading || data">
    <div class="flex justify-between gap-4 border border-border p-3">
      <template v-if="loading">
        <div class="flex flex-col justify-center gap-2">
          <Skeleton class="h-4 w-36" />
          <Skeleton class="h-3 w-32" />
        </div>
        <Skeleton class="size-12 shrink-0" />
      </template>

      <template v-else-if="data">
        <div class="flex flex-col justify-center">
          <p>{{ data.gained_xp }} из {{ data.available_xp }} XP</p>
          <p class="text-sm text-muted-foreground">до следующего уровня</p>
        </div>
        <IconArrowBadgeUp class="size-12 text-muted-foreground" stroke-width="1.5" aria-hidden="true" />
      </template>
    </div>

    <Progress v-if="!loading && data" :max="data.available_xp" :model-value="data.gained_xp" class="h-0.5" />
    <Skeleton v-else-if="loading" class="h-0.5 w-full" />
  </div>
</template>
