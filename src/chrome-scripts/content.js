import './assets/content.css';
import * as features from './features';

async function initFeatures() {
  const settings = await getSettings(Object.keys(features));

  for (const [featureName, featureFunc] of Object.entries(features)) {
    if (!settings[featureName]) continue;

    featureFunc();
  }
}

async function getSettings(featureNames) {
  const result = await chrome.storage.local.get(featureNames);

  return result;
}

initFeatures();
