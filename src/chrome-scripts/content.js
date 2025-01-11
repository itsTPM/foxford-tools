import './assets/content.css';
import * as features from './features/content';

async function initFeatures() {
  const settings = await getSettings(Object.keys(features));

  for (const [featureName, featureFunc] of Object.entries(features)) {
    if (!settings[featureName]) {
      continue;
    }

    featureFunc();
  }
}

async function getSettings(featureNames) {
  return await chrome.storage.local.get(featureNames);
}
initFeatures();
