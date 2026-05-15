import { badge } from '../../utils';

export function updateNotifier() {
  chrome.runtime.onInstalled.addListener((details) => {
    const { previousVersion, reason } = details;
    const currentVersion = chrome.runtime.getManifest().version;

    if (reason === 'install' || previousVersion === currentVersion || !previousVersion) {
      return;
    }

    void chrome.storage.local.set({ updateData: { previousVersion, currentVersion } });
    badge.set();
  });
}
