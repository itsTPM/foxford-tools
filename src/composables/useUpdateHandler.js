export function useUpdateHandler() {
  async function updateHandler() {
    const storageUpdateData = await getUpdateDataFromStorage();

    if (!storageUpdateData) {
      return;
    }

    await resetUpdateDataInStorage();
    await chrome.runtime.sendMessage('clearBadge');

    return storageUpdateData;
  }

  return { updateHandler };
}

async function getUpdateDataFromStorage() {
  const updateData = await chrome.storage.local.get('updateData');
  return updateData.updateData;
}

async function resetUpdateDataInStorage() {
  await chrome.storage.local.remove('updateData');
}
