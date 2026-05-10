import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockProfileData, mockLevelData } from '@/mocks';

vi.mock('ofetch');

describe('useAccount', () => {
  beforeEach(() => {
    vi.resetModules();
    global.chrome = { runtime: { id: 'test-extension-id' } } as unknown as typeof chrome;
  });

  it('should fetch and set profile data correctly', async () => {
    const { useAccount } = await import('../useAccount');
    const { ofetch } = await import('ofetch');
    vi.mocked(ofetch).mockResolvedValueOnce(mockProfileData);

    const account = useAccount();
    const profileData = await account.getProfileData();
    expect(profileData).toEqual(mockProfileData);
  });

  it('should fetch and set level data correctly', async () => {
    const { useAccount } = await import('../useAccount');
    const { ofetch } = await import('ofetch');
    vi.mocked(ofetch).mockResolvedValueOnce(mockLevelData);

    const account = useAccount();
    const levelData = await account.getLevelData();
    expect(levelData).toEqual(mockLevelData);
  });

  it('should set and get all data correctly', async () => {
    const { useAccount } = await import('../useAccount');
    const account = useAccount();
    account.setAllData({ profileData: mockProfileData, levelData: mockLevelData });
    expect(account.profileData.value).toEqual(mockProfileData);
    expect(account.levelData.value).toEqual(mockLevelData);
  });

  it('should handle level data error correctly', async () => {
    const { useAccount } = await import('../useAccount');
    const { ofetch } = await import('ofetch');
    vi.mocked(ofetch).mockResolvedValueOnce(mockProfileData);
    vi.mocked(ofetch).mockRejectedValueOnce(new Error('Failed to fetch profile data'));

    const account = useAccount();
    const data = await account.getAllData();

    expect(data).toEqual({
      profileData: mockProfileData,
      levelData: null,
    });
  });
});
