import { defineBackground } from 'wxt/utils/define-background';
import { dynamicTitle, updateNotifier } from '@/chrome-scripts/features/service-worker';
import { badge } from '@/chrome-scripts/utils';

export default defineBackground(() => {
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
});
