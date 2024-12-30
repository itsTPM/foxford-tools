import { dynamicTitle } from './features/service-worker';

chrome.storage.local.get(['dynamicTitle'], async function (result) {
  if (!result.dynamicTitle) return;

  dynamicTitle();
});

chrome.runtime.onInstalled.addListener((details) => {
  const previousVersion = details.previousVersion;
  const currentVersion = chrome.runtime.getManifest().version;
  const reason = details.reason;

  if (reason === 'install' || previousVersion === currentVersion || !previousVersion) return;

  const updateData = {
    previousVersion,
    currentVersion,
  };

  chrome.storage.local.set({ updateData });

  chrome.action.setBadgeBackgroundColor({ color: '#C63C51' });
  chrome.action.setBadgeTextColor({ color: '#FFFFFF' });
  chrome.action.setBadgeText({ text: '1' });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message === 'clearBadge') {
    chrome.action.setBadgeText({ text: '' });
  }
});
