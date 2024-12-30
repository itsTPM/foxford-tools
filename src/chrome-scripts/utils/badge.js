const badge = {
  set(text = '1') {
    const BG_COLOR = '#C63C51';
    const TEXT_COLOR = '#FFFFFF';

    chrome.action.setBadgeBackgroundColor({ color: BG_COLOR });
    chrome.action.setBadgeTextColor({ color: TEXT_COLOR });
    chrome.action.setBadgeText({ text });
  },

  clear() {
    chrome.action.setBadgeText({ text: '' });
  },
};

export default badge;
