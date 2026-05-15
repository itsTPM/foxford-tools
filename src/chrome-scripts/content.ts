import './assets/css/content.css';
import * as features from './features/content';

async function initFeatures() {
  const settings = await chrome.storage.local.get(Object.keys(features));

  for (const [featureName, featureFunc] of Object.entries(features)) {
    if (!settings[featureName]) continue;
    featureFunc();
  }
}

void initFeatures();
