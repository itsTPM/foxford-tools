import { describe, it, expect, beforeEach } from 'vitest';
import { useUpdateHandler } from '../useUpdateHandler';
import mockChromeAPI from './mockChromeAPI';

describe('useUpdateHandler', () => {
  beforeEach(() => {
    global.chrome = mockChromeAPI();
  });

  it('should return storageUpdateData if present', async () => {
    const mockData = { updateData: 'someData' };
    chrome.storage.local.get.mockResolvedValue(mockData);
    const { updateHandler } = useUpdateHandler();

    const result = await updateHandler();

    expect(result).toBe('someData');
    expect(chrome.storage.local.get).toHaveBeenCalledWith('updateData');
    expect(chrome.storage.local.remove).toHaveBeenCalledWith('updateData');
    expect(chrome.runtime.sendMessage).toHaveBeenCalledWith('clearBadge');
  });

  it('should return undefined if storageUpdateData is not present', async () => {
    chrome.storage.local.get.mockResolvedValue({});
    const { updateHandler } = useUpdateHandler();

    const result = await updateHandler();

    expect(result).toBeUndefined();
    expect(chrome.storage.local.get).toHaveBeenCalledWith('updateData');
    expect(chrome.storage.local.remove).not.toHaveBeenCalled();
    expect(chrome.runtime.sendMessage).not.toHaveBeenCalled();
  });
});
