import { dynamicTitle, updateNotifier } from './features/service-worker';
import { badge } from './utils';

chrome.storage.local.get(['dynamicTitle'], async function (result) {
  if (!result.dynamicTitle) {
    return;
  }

  dynamicTitle();
});

chrome.runtime.onMessage.addListener((message) => {
  if (message === 'clearBadge') {
    badge.clear();
  }
});

updateNotifier();
