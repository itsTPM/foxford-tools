import { browser } from 'wxt/browser';
import { defineBackground } from 'wxt/utils/define-background';
import { badge } from '@/utils';
import { dynamicTitle } from './features/dynamicTitle';
import { updateNotifier } from './features/updateNotifier';

export default defineBackground(() => {
  dynamicTitle();

  browser.runtime.onMessage.addListener((message) => {
    if (message === 'clearBadge') {
      badge.clear();
    }
  });

  updateNotifier();
});
