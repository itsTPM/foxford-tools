<script setup>
import { onMounted, ref } from 'vue';
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
</script>

<template>
  <template v-if="profileData && levelData && !isDataLoading && !isDataError">
    <div class="flex items-center gap-5 rounded-md border p-3">
      <img :src="profileData.avatar_url" alt="Аватар пользователя" class="size-16 rounded-lg object-contain" />
      <div class="flex flex-col">
        <p class="text-lg font-medium">{{ profileData.full_name }}</p>
        <p class="text-muted-foreground">
          создан:
          {{ new Date(profileData.created_at).toLocaleDateString('ru-RU') }}
        </p>
      </div>
    </div>

    <div class="flex justify-between rounded-md border p-3">
      <div class="flex flex-col justify-center">
        <p class="text-base">{{ profileData.bonus_amount }} фоксиков</p>
        <p class="text-sm text-muted-foreground">у вас на счету</p>
      </div>
      <div class="flex items-center text-muted">
        <IconCoins class="size-12" strokeWidth="1.75" aria-hidden="true" />
      </div>
    </div>

    <div class="flex flex-col">
      <div class="flex justify-between rounded-md rounded-b-none border p-3">
        <div class="flex flex-col justify-center">
          <p class="text-base">{{ levelData.gained_xp }} из {{ levelData.available_xp }} XP</p>
          <p class="text-sm text-muted-foreground">до следующего уровня</p>
        </div>
        <div class="flex items-center text-muted">
          <IconArrowBadgeUp class="size-12" strokeWidth="1.75" aria-hidden="true" />
        </div>
      </div>
      <Progress :max="levelData.available_xp" v-model="levelData.gained_xp" class="h-1 rounded-t-none" />
    </div>
  </template>

  <template v-else-if="isDataLoading && !isDataError">
    <div class="flex flex-col items-center justify-center gap-2">
      <img class="aspect-square h-auto w-12 dark:invert" :src="loadingSpinner" />
      <p>Загрузка данных..</p>
    </div>
  </template>

  <template v-else-if="isDataError"> Что-то пошло не так.. </template>
</template>
