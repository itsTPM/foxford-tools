<script setup>
import { IconCoins, IconArrowBadgeUp } from '@tabler/icons-vue';
import { Progress } from '@/components/ui/progress';
import { onMounted, ref } from 'vue';

const profileData = ref({
  full_name: '',
  avatar_url: '',
  created_at: null,
  bonus_amount: null,
});

const levelData = ref({
  gained_xp: 0,
  available_xp: 0,
  total_xp: 0,
});

onMounted(async () => {
  if (localStorage.getItem('profileData')) {
    profileData.value = JSON.parse(localStorage.getItem('profileData'));
  }
  if (localStorage.getItem('levelData')) {
    levelData.value = JSON.parse(localStorage.getItem('levelData'));
  }

  await fetch('https://foxford.ru/api/user/me')
    .then((response) => response.json())
    .then((data) => {
      profileData.value.full_name = data.full_name;
      profileData.value.avatar_url = data.avatar_url;
      profileData.value.created_at = data.created_at;
      profileData.value.bonus_amount = data.bonus_amount;
    });
  localStorage.setItem('profileData', JSON.stringify(profileData.value));

  await fetch('https://foxford.ru/api/user/level')
    .then((response) => response.json())
    .then((data) => {
      levelData.value.gained_xp = data.gained_xp;
      levelData.value.available_xp = data.available_xp;
      levelData.value.total_xp = data.total_xp;
    });
  localStorage.setItem('levelData', JSON.stringify(levelData.value));
});
</script>

<template>
  <template v-if="profileData.full_name && profileData.bonus_amount >= 0 && levelData.total_xp">
    <div class="flex items-center gap-5 rounded-md border p-3">
      <img :src="profileData.avatar_url" alt="Аватар пользователя" class="h-16 w-16 rounded-lg object-contain" />
      <div class="flex flex-col">
        <h1 class="text-lg font-medium">{{ profileData.full_name }}</h1>
        <p class="text-muted-foreground">
          создан:
          {{ new Date(profileData.created_at).toLocaleDateString('ru-RU') }}
        </p>
      </div>
    </div>

    <div class="flex justify-between rounded-md border p-3">
      <div class="flex flex-col justify-center">
        <span class="text-base">{{ profileData.bonus_amount }} фоксиков</span>
        <span class="text-sm text-muted-foreground">у вас на счету</span>
      </div>
      <div class="flex items-center text-muted">
        <IconCoins :size="48" strokeWidth="1.75" />
      </div>
    </div>

    <div class="flex flex-col">
      <div class="flex justify-between rounded-md rounded-b-none border p-3">
        <div class="flex flex-col justify-center">
          <span class="text-base">{{ levelData.gained_xp }} из {{ levelData.available_xp }} XP</span>
          <span class="text-sm text-muted-foreground">до следующего уровня</span>
        </div>
        <div class="flex items-center text-muted">
          <IconArrowBadgeUp :size="48" strokeWidth="1.75" />
        </div>
      </div>
      <Progress :max="levelData.available_xp" v-model="levelData.gained_xp" class="h-1 rounded-t-none" />
    </div>
  </template>
  <template v-else>Данные не успели загрузиться, или возникла ошибка при их получении..</template>
</template>
