import { describe, it, expect, vi, beforeEach } from 'vitest';
import { browser } from 'wxt/browser';
import { badge } from '..';

vi.mock('wxt/browser', () => ({
  browser: {
    action: {
      setBadgeBackgroundColor: vi.fn(),
      setBadgeTextColor: vi.fn(),
      setBadgeText: vi.fn(),
    },
  },
}));

describe('badge', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set the badge with default text', () => {
    badge.set();
    expect(browser.action.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: '#C63C51' });
    expect(browser.action.setBadgeTextColor).toHaveBeenCalledWith({ color: '#FFFFFF' });
    expect(browser.action.setBadgeText).toHaveBeenCalledWith({ text: '1' });
  });

  it('should set the badge with specified text', () => {
    badge.set('test');
    expect(browser.action.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: '#C63C51' });
    expect(browser.action.setBadgeTextColor).toHaveBeenCalledWith({ color: '#FFFFFF' });
    expect(browser.action.setBadgeText).toHaveBeenCalledWith({ text: 'test' });
  });

  it('should clear the badge text', () => {
    badge.clear();
    expect(browser.action.setBadgeText).toHaveBeenCalledWith({ text: '' });
  });
});
