<script setup>
import { onMounted, ref, computed } from 'vue';
import { IconCoins, IconArrowBadgeUp } from '@tabler/icons-vue';
import { Progress } from '@/components/ui/progress';
import loadingSpinner from '@/assets/loading-spinner.svg?url';
import { useAccount } from '@/composables/useAccount';
const { profileData, levelData, loadSavedData, getAllData, setAllData } = useAccount();

const isDataLoading = ref(true);
const isDataError = ref(false);

loadSavedData();

onMounted(async () => {
  const data = await getAllData();
  isDataLoading.value = false;

  if (data.profileData && data.levelData) {
    setAllData(data);
  } else {
    isDataError.value = true;
  }
});

const creationDate = computed(() => {
  if (!profileData.value) {
    return;
  }

  return new Date(profileData.value.created_at).toLocaleDateString('ru-RU');
});

const levelPercent = computed(() => {
  if (!levelData.value) {
    return;
  }

  return Math.floor((levelData.value.gained_xp / levelData.value.available_xp) * 100);
});
</script>

<template>
  <p v-if="isDataError" class="text-center">Не удалось загрузить данные</p>

  <div v-else-if="isDataLoading" class="flex flex-col items-center justify-center gap-2">
    <img class="aspect-square w-12 dark:invert" :src="loadingSpinner" />
    <p>Загрузка...</p>
  </div>

  <template v-else-if="profileData">
    <div class="border-border flex items-center gap-4 border p-3">
      <img :src="profileData.avatar_url" alt="Аватар пользователя" class="size-16 object-contain" />

      <div>
        <p class="font-medium">{{ profileData.full_name }}</p>
        <p class="text-muted-foreground text-sm">создан: {{ creationDate }}</p>
      </div>
    </div>

    <div class="border-border flex justify-between gap-4 border p-3">
      <div class="flex flex-col justify-center">
        <p>{{ profileData.bonus_amount }} фоксиков</p>
        <p class="text-muted-foreground text-sm">у вас на счету</p>
      </div>

      <IconCoins class="text-muted-foreground size-12" stroke-width="1.5" aria-hidden="true" />
    </div>

    <div v-if="levelData">
      <div class="border-border flex justify-between gap-4 border p-3">
        <div class="flex flex-col justify-center">
          <p>{{ levelData.gained_xp }} из {{ levelData.available_xp }} XP</p>
          <p class="text-muted-foreground text-sm">до следующего уровня</p>
        </div>

        <IconArrowBadgeUp class="text-muted-foreground size-12" stroke-width="1.5" aria-hidden="true" />
      </div>

      <Progress :max="100" v-model="levelPercent" class="h-0.5" />
    </div>
  </template>
</template>
