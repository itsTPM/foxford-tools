import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAccount } from '../useAccount';
import { ofetch } from 'ofetch';

vi.mock('ofetch');

const mockData = {
  profileData: {
    full_name: 'John Doe',
    avatar_url: 'https://example.com/avatar.jpg',
    created_at: '2025-01-01T00:00:00Z',
    bonus_amount: 100,
  },
  levelData: {
    gained_xp: 1000,
    available_xp: 500,
    total_xp: 1500,
  },
};

describe('useAccount', () => {
  let account;

  beforeEach(() => {
    account = useAccount();
    localStorage.clear();
  });

  it('should fetch and set profile data correctly', async () => {
    const mockProfileData = mockData.profileData;

    ofetch.mockResolvedValueOnce(mockProfileData);

    const profileData = await account.getProfileData();
    expect(profileData).toEqual(mockProfileData);
  });

  it('should fetch and set level data correctly', async () => {
    const mockLevelData = mockData.levelData;

    ofetch.mockResolvedValueOnce(mockLevelData);

    const levelData = await account.getLevelData();
    expect(levelData).toEqual(mockLevelData);
  });

  it('should set and get all data correctly', async () => {
    account.setAllData(mockData);
    expect(account.profileData.value).toEqual(mockData.profileData);
    expect(account.levelData.value).toEqual(mockData.levelData);
  });

  it('should load saved data from localStorage', () => {
    const mockProfileData = mockData.profileData;
    const mockLevelData = mockData.levelData;

    localStorage.setItem('profileData', JSON.stringify(mockProfileData));
    localStorage.setItem('levelData', JSON.stringify(mockLevelData));

    account.loadSavedData();

    expect(account.profileData.value).toEqual(mockProfileData);
    expect(account.levelData.value).toEqual(mockLevelData);
  });

  it('should handle errors correctly when getting all data', async () => {
    ofetch.mockRejectedValueOnce(new Error('Failed to fetch profile data'));
    ofetch.mockResolvedValueOnce(mockData.levelData);

    const data = await account.getAllData();
    expect(data).toEqual({ profileData: null, levelData: mockData.levelData });
  });
});
