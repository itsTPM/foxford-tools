<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { IconCoins, IconArrowBadgeUp } from '@tabler/icons-vue';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useAccount } from '@/composables/useAccount';
const { profileData, levelData, fetchData } = useAccount();

const isDataLoading = ref(true);
const isDataError = ref(false);

onMounted(async () => {
  try {
    await fetchData();
  } catch {
    isDataError.value = true;
  } finally {
    isDataLoading.value = false;
  }
});

const creationDate = computed(() => {
  if (!profileData.value) {
    return;
  }

  return new Date(profileData.value.created_at).toLocaleDateString('ru-RU');
});
</script>

<template>
  <p v-if="isDataError" class="text-center">Не удалось загрузить данные</p>

  <template v-else-if="isDataLoading">
    <div class="flex items-center gap-4 border border-border p-3">
      <Skeleton class="size-16 shrink-0" />
      <div class="flex flex-col gap-2">
        <Skeleton class="h-4 w-32" />
        <Skeleton class="h-3 w-24" />
      </div>
    </div>

    <div class="flex justify-between gap-4 border border-border p-3">
      <div class="flex flex-col justify-center gap-2">
        <Skeleton class="h-4 w-28" />
        <Skeleton class="h-3 w-20" />
      </div>
      <Skeleton class="size-12 shrink-0" />
    </div>

    <div>
      <div class="flex justify-between gap-4 border border-border p-3">
        <div class="flex flex-col justify-center gap-2">
          <Skeleton class="h-4 w-36" />
          <Skeleton class="h-3 w-32" />
        </div>
        <Skeleton class="size-12 shrink-0" />
      </div>
      <Skeleton class="h-0.5 w-full" />
    </div>
  </template>

  <template v-else-if="profileData">
    <div class="flex items-center gap-4 border border-border p-3">
      <img :src="profileData.avatar_url" alt="Аватар пользователя" class="size-16 object-contain" />

      <div>
        <p class="font-medium">
          {{ profileData.full_name }}
        </p>
        <p class="text-sm text-muted-foreground">создан: {{ creationDate }}</p>
      </div>
    </div>

    <div class="flex justify-between gap-4 border border-border p-3">
      <div class="flex flex-col justify-center">
        <p>{{ profileData.bonus_amount }} фоксиков</p>
        <p class="text-sm text-muted-foreground">у вас на счету</p>
      </div>

      <IconCoins class="size-12 text-muted-foreground" stroke-width="1.5" aria-hidden="true" />
    </div>

    <div v-if="levelData">
      <div class="flex justify-between gap-4 border border-border p-3">
        <div class="flex flex-col justify-center">
          <p>{{ levelData.gained_xp }} из {{ levelData.available_xp }} XP</p>
          <p class="text-sm text-muted-foreground">до следующего уровня</p>
        </div>

        <IconArrowBadgeUp class="size-12 text-muted-foreground" stroke-width="1.5" aria-hidden="true" />
      </div>

      <Progress :max="levelData.available_xp" :model-value="levelData.gained_xp" class="h-0.5" />
    </div>
  </template>
</template>
