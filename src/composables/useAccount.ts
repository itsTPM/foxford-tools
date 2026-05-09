import { ref, toRefs } from 'vue';
import { ofetch } from 'ofetch';
import { mockProfileData, mockLevelData } from '@/mocks';
import { isDev } from '@/lib/isDev';

interface AccountState {
  profileData: ProfileData | null;
  levelData: LevelData | null;
}

const state = ref<AccountState>({
  profileData: null,
  levelData: null,
});

export function useAccount() {
  async function getAllData() {
    if (isDev) {
      return { profileData: mockProfileData, levelData: mockLevelData };
    }

    const [profileData, levelData] = await Promise.all([getProfileData(), getLevelData().catch(() => null)]);

    return { profileData, levelData };
  }

  function setAllData(data: AccountState) {
    setProfileData(data.profileData);
    setLevelData(data.levelData);
  }

  async function getProfileData(): Promise<ProfileData> {
    const data = await ofetch<GetProfileDataResponse>('https://foxford.ru/api/user/me');

    return {
      full_name: data.full_name,
      avatar_url: data.avatar_url,
      created_at: data.created_at,
      bonus_amount: data.bonus_amount,
    };
  }

  async function getLevelData(): Promise<LevelData> {
    const data = await ofetch<GetLevelDataResponse>('https://foxford.ru/api/user/level');

    return {
      gained_xp: data.gained_xp,
      available_xp: data.available_xp,
      level: data.level,
      total_xp: data.total_xp,
    };
  }

  function setProfileData(data: ProfileData | null) {
    state.value.profileData = data;
    localStorage.setItem('profileData', JSON.stringify(data));
  }

  function setLevelData(data: LevelData | null) {
    state.value.levelData = data;
    localStorage.setItem('levelData', JSON.stringify(data));
  }

  function loadSavedData() {
    const savedProfileData = localStorage.getItem('profileData');
    const savedLevelData = localStorage.getItem('levelData');

    if (savedProfileData) {
      state.value.profileData = JSON.parse(savedProfileData) as ProfileData;
    }

    if (savedLevelData) {
      state.value.levelData = JSON.parse(savedLevelData) as LevelData;
    }
  }

  return {
    ...toRefs(state.value),
    getAllData,
    setAllData,
    getProfileData,
    getLevelData,
    setProfileData,
    setLevelData,
    loadSavedData,
  };
}
