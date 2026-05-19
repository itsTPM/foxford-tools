import { browser } from 'wxt/browser';
import { defineBackground } from 'wxt/utils/define-background';
import { dynamicTitle, updateNotifier } from '@/chrome-scripts/features/service-worker';
import { badge } from '@/chrome-scripts/utils';

export default defineBackground(() => {
  void (async () => {
    const { dynamicTitle: enabled } = await browser.storage.local.get(['dynamicTitle']);
    if (!enabled) return;
    dynamicTitle();
  })();

  browser.runtime.onMessage.addListener((message) => {
    if (message === 'clearBadge') {
      badge.clear();
    }
  });

  updateNotifier();
});
