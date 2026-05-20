import { browser } from 'wxt/browser';
import { defineContentScript } from 'wxt/utils/define-content-script';
import './style.css';
import * as features from './features';

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
