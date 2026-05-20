import { browser } from 'wxt/browser';

export interface UpdateData {
  previousVersion: string;
  currentVersion: string;
}

export function useUpdateHandler() {
  async function getUpdateData() {
    const updateData = await browser.storage.local.get<{ updateData?: UpdateData }>('updateData');
    return updateData.updateData ?? null;
  }

  async function resetUpdateData() {
    await browser.storage.local.remove('updateData');
    await browser.runtime.sendMessage('clearBadge');
  }

  return { getUpdateData, resetUpdateData };
}
