interface UpdateData {
  previousVersion: string;
  currentVersion: string;
}

export function useUpdateHandler() {
  async function getUpdateData() {
    const updateData = await chrome.storage.local.get<{ updateData?: UpdateData }>('updateData');
    return updateData.updateData ?? null;
  }

  async function resetUpdateData() {
    await chrome.storage.local.remove('updateData');
    await chrome.runtime.sendMessage('clearBadge');
  }

  return { getUpdateData, resetUpdateData };
}
