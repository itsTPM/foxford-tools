export const badge = {
  set(text = '1') {
    const BG_COLOR = '#C63C51';
    const TEXT_COLOR = '#FFFFFF';

    void chrome.action.setBadgeBackgroundColor({ color: BG_COLOR });
    void chrome.action.setBadgeTextColor({ color: TEXT_COLOR });
    void chrome.action.setBadgeText({ text });
  },

  clear() {
    void chrome.action.setBadgeText({ text: '' });
  },
};
