import { dynamicTitle, updateNotifier } from './features/service-worker';
import { badge } from './utils';

void (async () => {
  const { dynamicTitle: enabled } = await chrome.storage.local.get(['dynamicTitle']);
  if (!enabled) return;

  dynamicTitle();
})();

chrome.runtime.onMessage.addListener((message) => {
  if (message === 'clearBadge') {
    badge.clear();
  }
});

updateNotifier();
