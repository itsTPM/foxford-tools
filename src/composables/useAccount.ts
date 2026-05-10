import { ref, toRefs } from 'vue';
import { ofetch } from 'ofetch';
import { mockProfileData, mockLevelData } from '@/mocks';
import { isExtension } from '@/lib/isExtension';

interface AccountState {
  profileData: ProfileData | null;
  levelData: LevelData | null;
}

const state = ref<AccountState>({
  profileData: null,
  levelData: null,
});

export function useAccount() {
  async function fetchData() {
    if (!isExtension) {
      state.value.profileData = mockProfileData;
      state.value.levelData = mockLevelData;
      return;
    }

    const [profileData, levelData] = await Promise.all([fetchProfileData(), fetchLevelData().catch(() => null)]);

    state.value.profileData = profileData;
    state.value.levelData = levelData;
  }

  async function fetchProfileData(): Promise<ProfileData> {
    const data = await ofetch<GetProfileDataResponse>('https://foxford.ru/api/user/me');

    return {
      full_name: data.full_name,
      avatar_url: data.avatar_url,
      created_at: data.created_at,
      bonus_amount: data.bonus_amount,
    };
  }

  async function fetchLevelData(): Promise<LevelData> {
    const data = await ofetch<GetLevelDataResponse>('https://foxford.ru/api/user/level');

    return {
      gained_xp: data.gained_xp,
      available_xp: data.available_xp,
      level: data.level,
      total_xp: data.total_xp,
    };
  }

  return {
    ...toRefs(state.value),
    fetchData,
    fetchProfileData,
    fetchLevelData,
  };
}
