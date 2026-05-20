import { browser } from 'wxt/browser';

export const badge = {
  set(text = '1') {
    const BG_COLOR = '#C63C51';
    const TEXT_COLOR = '#FFFFFF';

    void browser.action.setBadgeBackgroundColor({ color: BG_COLOR });
    void browser.action.setBadgeTextColor({ color: TEXT_COLOR });
    void browser.action.setBadgeText({ text });
  },

  clear() {
    void browser.action.setBadgeText({ text: '' });
  },
};
