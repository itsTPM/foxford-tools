<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAccount } from '@/composables/useAccount';
import AccountProfileCard from '@/components/account/AccountProfileCard.vue';
import AccountBonusCard from '@/components/account/AccountBonusCard.vue';
import AccountLevelCard from '@/components/account/AccountLevelCard.vue';

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
</script>

<template>
  <p v-if="isDataError" class="text-center">Не удалось загрузить данные</p>

  <template v-else>
    <AccountProfileCard :loading="isDataLoading" :data="profileData" />
    <AccountBonusCard :loading="isDataLoading" :bonus-amount="profileData?.bonus_amount ?? null" />
    <AccountLevelCard :loading="isDataLoading" :data="levelData" />
  </template>
</template>
