import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useUpdateHandler } from '../useUpdateHandler';

const { mockGet, mockRemove, mockSendMessage } = vi.hoisted(() => ({
  mockGet: vi.fn(),
  mockRemove: vi.fn(),
  mockSendMessage: vi.fn(),
}));

vi.mock('wxt/browser', () => ({
  browser: {
    storage: {
      local: {
        get: mockGet,
        remove: mockRemove,
      },
    },
    runtime: {
      sendMessage: mockSendMessage,
    },
  },
}));

describe('useUpdateHandler', () => {
  const { getUpdateData, resetUpdateData } = useUpdateHandler();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUpdateData', () => {
    it('should return updateData if present', async () => {
      const mockData = { updateData: { previousVersion: '1.0', currentVersion: '1.1' } };
      mockGet.mockResolvedValue(mockData);

      const result = await getUpdateData();

      expect(result).toEqual(mockData.updateData);
    });

    it('should return null if updateData is not present', async () => {
      mockGet.mockResolvedValue({});

      const result = await getUpdateData();

      expect(result).toBeNull();
    });
  });

  describe('resetUpdateData', () => {
    it('should remove updateData from storage and clear badge', async () => {
      await resetUpdateData();

      expect(mockRemove).toHaveBeenCalledWith('updateData');
      expect(mockSendMessage).toHaveBeenCalledWith('clearBadge');
    });
  });
});
