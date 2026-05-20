<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAccount } from '@popup/composables/useAccount';
import AccountProfileCard from '@popup/components/account/AccountProfileCard.vue';
import AccountBonusCard from '@popup/components/account/AccountBonusCard.vue';
import AccountLevelCard from '@popup/components/account/AccountLevelCard.vue';

const { profileData, levelData, fetchData } = useAccount();

const isDataLoading = ref(true);
const isDataError = ref(false);

onMounted(async () => {
  try {
    await fetchData();
    isDataLoading.value = false;
  } catch {
    isDataError.value = true;
  }
});
</script>

<template>
  <div class="relative flex flex-col gap-3">
    <AccountProfileCard :loading="isDataLoading" :data="profileData" />
    <AccountBonusCard :loading="isDataLoading" :bonus-amount="profileData?.bonus_amount ?? null" />
    <AccountLevelCard :loading="isDataLoading" :data="levelData" />
    <p
      v-if="isDataError"
      class="absolute inset-0 flex items-center justify-center bg-background text-center font-medium">
      Не удалось загрузить данные :(
    </p>
  </div>
</template>
