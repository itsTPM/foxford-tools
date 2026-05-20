<script setup lang="ts">
import { computed } from 'vue';
import { Skeleton } from '@popup/components/ui/skeleton';

const props = defineProps<{
  loading: boolean;
  data: ProfileData | null;
}>();

const creationDate = computed(() => {
  if (!props.data) {
    return;
  }

  return new Date(props.data.created_at).toLocaleDateString('ru-RU');
});
</script>

<template>
  <div v-if="loading || data" class="flex items-center gap-4 border border-border p-3">
    <template v-if="loading">
      <Skeleton class="size-16 shrink-0" />
      <div class="flex flex-col gap-2">
        <Skeleton class="h-4 w-32" />
        <Skeleton class="h-3 w-24" />
      </div>
    </template>

    <template v-else-if="data">
      <img :src="data.avatar_url" alt="Аватар пользователя" class="size-16 object-contain" />
      <div>
        <p class="font-medium">{{ data.full_name }}</p>
        <p class="text-sm text-muted-foreground">создан: {{ creationDate }}</p>
      </div>
    </template>
  </div>
</template>
