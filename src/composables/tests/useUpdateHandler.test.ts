import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useUpdateHandler } from '../useUpdateHandler';
import mockChromeAPI from './mockChromeApi';

describe('useUpdateHandler', () => {
  let chromeMock: ReturnType<typeof mockChromeAPI>;
  const { getUpdateData, resetUpdateData } = useUpdateHandler();

  beforeEach(() => {
    chromeMock = mockChromeAPI();
    vi.stubGlobal('chrome', chromeMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('getUpdateData', () => {
    it('should return updateData if present', async () => {
      const mockData = { updateData: { previousVersion: '1.0', currentVersion: '1.1' } };
      chromeMock.storage.local.get.mockResolvedValue(mockData);

      const result = await getUpdateData();

      expect(result).toEqual(mockData.updateData);
    });

    it('should return null if updateData is not present', async () => {
      chromeMock.storage.local.get.mockResolvedValue({});

      const result = await getUpdateData();

      expect(result).toBeNull();
    });
  });

  describe('resetUpdateData', () => {
    it('should remove updateData from storage and clear badge', async () => {
      await resetUpdateData();

      expect(chromeMock.storage.local.remove).toHaveBeenCalledWith('updateData');
      expect(chromeMock.runtime.sendMessage).toHaveBeenCalledWith('clearBadge');
    });
  });
});
