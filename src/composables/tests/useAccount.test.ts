import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAccount } from '../useAccount';
import { mockProfileData, mockLevelData } from '@/mocks';
import { ofetch } from 'ofetch';

vi.mock('ofetch');

describe('useAccount', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should fetch and set profile data correctly', async () => {
    const account = useAccount();
    vi.mocked(ofetch).mockResolvedValueOnce(mockProfileData);

    const profileData = await account.getProfileData();
    expect(profileData).toEqual(mockProfileData);
  });

  it('should fetch and set level data correctly', async () => {
    const account = useAccount();
    vi.mocked(ofetch).mockResolvedValueOnce(mockLevelData);

    const levelData = await account.getLevelData();
    expect(levelData).toEqual(mockLevelData);
  });

  it('should set and get all data correctly', () => {
    const account = useAccount();
    account.setAllData({ profileData: mockProfileData, levelData: mockLevelData });
    expect(account.profileData.value).toEqual(mockProfileData);
    expect(account.levelData.value).toEqual(mockLevelData);
  });

  it('should load saved data from localStorage', () => {
    localStorage.setItem('profileData', JSON.stringify(mockProfileData));
    localStorage.setItem('levelData', JSON.stringify(mockLevelData));

    const account = useAccount();
    account.loadSavedData();

    expect(account.profileData.value).toEqual(mockProfileData);
    expect(account.levelData.value).toEqual(mockLevelData);
  });

  it('should handle level data error correctly', async () => {
    const account = useAccount();
    vi.mocked(ofetch).mockResolvedValueOnce(mockProfileData);
    vi.mocked(ofetch).mockRejectedValueOnce(new Error('Failed to fetch profile data'));

    const data = await account.getAllData();

    expect(data).toEqual({
      profileData: mockProfileData,
      levelData: null,
    });
  });
});
