import { browser } from 'wxt/browser';
import { defineContentScript } from 'wxt/utils/define-content-script';
import './style.css';
import * as features from './features';
import { runContentMigrations } from './migrations';

export default defineContentScript({
  matches: ['https://foxford.ru/*'],
  async main() {
    await runContentMigrations();

    const settings = await browser.storage.local.get(Object.keys(features));
    for (const [featureName, featureFunc] of Object.entries(features)) {
      if (!settings[featureName]) continue;
      featureFunc();
    }
  },
});
