import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mockProfileData, mockLevelData } from '@/mocks';

vi.mock('ofetch');

describe('useAccount', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal('chrome', { runtime: { id: 'test-extension-id' } });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should fetch profile data correctly', async () => {
    const { useAccount } = await import('../useAccount');
    const { ofetch } = await import('ofetch');
    vi.mocked(ofetch).mockResolvedValueOnce(mockProfileData);

    const account = useAccount();
    const profileData = await account.fetchProfileData();
    expect(profileData).toEqual(mockProfileData);
  });

  it('should fetch level data correctly', async () => {
    const { useAccount } = await import('../useAccount');
    const { ofetch } = await import('ofetch');
    vi.mocked(ofetch).mockResolvedValueOnce(mockLevelData);

    const account = useAccount();
    const levelData = await account.fetchLevelData();
    expect(levelData).toEqual(mockLevelData);
  });

  it('should populate state after fetchData', async () => {
    const { useAccount } = await import('../useAccount');
    const { ofetch } = await import('ofetch');
    vi.mocked(ofetch).mockResolvedValueOnce(mockProfileData);
    vi.mocked(ofetch).mockResolvedValueOnce(mockLevelData);

    const account = useAccount();
    await account.fetchData();
    expect(account.profileData.value).toEqual(mockProfileData);
    expect(account.levelData.value).toEqual(mockLevelData);
  });

  it('should set levelData to null when level fetch fails', async () => {
    const { useAccount } = await import('../useAccount');
    const { ofetch } = await import('ofetch');
    vi.mocked(ofetch).mockResolvedValueOnce(mockProfileData);
    vi.mocked(ofetch).mockRejectedValueOnce(new Error('Failed to fetch level data'));

    const account = useAccount();
    await account.fetchData();

    expect(account.profileData.value).toEqual(mockProfileData);
    expect(account.levelData.value).toBeNull();
  });
});
