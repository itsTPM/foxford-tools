import { badge, logger } from '../../utils';

export function updateNotifier() {
  chrome.runtime.onInstalled.addListener(({ previousVersion, reason }) => {
    const currentVersion = chrome.runtime.getManifest().version;

    if (!shouldNotifyUpdate({ reason, previousVersion, currentVersion })) {
      logger.info('Skipping update notifier');
      return;
    }

    void chrome.storage.local.set({ updateData: { previousVersion, currentVersion } });
    badge.set();
  });
}

export function shouldNotifyUpdate({
  reason,
  previousVersion,
  currentVersion,
}: {
  reason: chrome.runtime.InstalledDetails['reason'];
  previousVersion: string | undefined;
  currentVersion: string;
}) {
  if (reason === 'install') return false;
  if (!previousVersion) return false;
  if (previousVersion === currentVersion) return false;
  return true;
}
