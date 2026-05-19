import { browser } from 'wxt/browser';
import { defineContentScript } from 'wxt/utils/define-content-script';
import '@/chrome-scripts/assets/css/content.css';
import * as features from '@/chrome-scripts/features/content';

export default defineContentScript({
  matches: ['https://foxford.ru/*'],
  async main() {
    const settings = await browser.storage.local.get(Object.keys(features));
    for (const [featureName, featureFunc] of Object.entries(features)) {
      if (!settings[featureName]) continue;
      featureFunc();
    }
  },
});
