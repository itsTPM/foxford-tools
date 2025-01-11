import { badge } from '../../utils';

export default function useUpdateNotifier() {
  listenForExtensionUpdate();
}

function listenForExtensionUpdate() {
  chrome.runtime.onInstalled.addListener((details) => {
    const { previousVersion } = details;
    const currentVersion = getExtensionVersion();
    const { reason } = details;

    if (checkIsShouldReturn({ reason, previousVersion, currentVersion })) {
      return;
    }

    const updateData = {
      previousVersion,
      currentVersion,
    };

    chrome.storage.local.set({ updateData });

    badge.set();
  });
}

function getExtensionVersion() {
  return chrome.runtime.getManifest().version;
}

function checkIsShouldReturn({ reason, previousVersion, currentVersion }) {
  const falsyCases = [reason === 'install' || previousVersion === currentVersion || !previousVersion];

  return falsyCases.some((falsyCase) => falsyCase);
}
