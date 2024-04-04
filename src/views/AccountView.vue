<script setup>
import { IconCoins, IconArrowBadgeUp } from '@tabler/icons-vue';
import { Progress } from '@/components/ui/progress';

const profileData = {
  full_name: 'Firstname Lastname',
  avatar_url: 'https://a.foxford.ngcdn.ru/assets/fallback/avatars/faceholders/120x120/14.png',
  created_at: null,
  bonus_amount: 1000,
};

const levelData = {
  gained_xp: 3000,
  available_xp: 12000,
  total_xp: 130000,
  progress: 25,
};
</script>

<template>
  <div class="flex items-center gap-5 rounded-md border p-3">
    <img
      src="https://a.foxford.ngcdn.ru/assets/fallback/avatars/faceholders/120x120/14.png"
      alt="Аватар пользователя"
      class="h-16 w-16 object-contain" />
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

  <div class="flex justify-between rounded-md border p-3">
    <div class="flex flex-col justify-center">
      <span class="text-base">{{ levelData.gained_xp }} из {{ levelData.available_xp }} XP</span>
      <span class="text-sm text-muted-foreground">до следующего уровня</span>
    </div>
    <div class="flex items-center text-muted">
      <IconArrowBadgeUp :size="48" strokeWidth="1.75" />
    </div>
  </div>

  <Progress :max="levelData.available_xp" v-model="levelData.gained_xp" />
</template>
