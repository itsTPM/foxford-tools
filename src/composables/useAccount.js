import { reactive, toRefs } from 'vue';
import { ofetch } from 'ofetch';

const state = reactive({
  profileData: { full_name: '', avatar_url: '', created_at: null, bonus_amount: null },
  levelData: { gained_xp: 0, available_xp: 0, total_xp: 0 },
});

export function useAccount() {
  async function getAllData() {
    const [profileData, levelData] = await Promise.all([
      getProfileData().catch(() => null),
      getLevelData().catch(() => null),
    ]);

    return { profileData, levelData };
  }

  function setAllData(data) {
    setProfileData(data.profileData);
    setLevelData(data.levelData);
  }

  async function getProfileData() {
    const data = await ofetch('https://foxford.ru/api/user/me');

    return {
      full_name: data.full_name,
      avatar_url: data.avatar_url,
      created_at: data.created_at,
      bonus_amount: data.bonus_amount,
    };
  }

  async function getLevelData() {
    const data = await ofetch('https://foxford.ru/api/user/level');

    return {
      gained_xp: data.gained_xp,
      available_xp: data.available_xp,
      total_xp: data.total_xp,
    };
  }

  function setProfileData(data) {
    state.profileData = data;
    localStorage.setItem('profileData', JSON.stringify(data));
  }

  function setLevelData(data) {
    state.levelData = data;
    localStorage.setItem('levelData', JSON.stringify(data));
  }

  function loadSavedData() {
    const savedProfileData = localStorage.getItem('profileData');
    const savedLevelData = localStorage.getItem('levelData');

    if (savedProfileData) {
      state.profileData = JSON.parse(savedProfileData);
    }

    if (savedLevelData) {
      state.levelData = JSON.parse(savedLevelData);
    }
  }

  return {
    ...toRefs(state),
    getAllData,
    setAllData,
    getProfileData,
    getLevelData,
    setProfileData,
    setLevelData,
    loadSavedData,
  };
}
