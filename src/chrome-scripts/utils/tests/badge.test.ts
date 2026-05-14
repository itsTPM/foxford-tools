import { describe, it, expect, vi, beforeEach } from 'vitest';
import { badge } from '..';

describe('badge', () => {
  beforeEach(() => {
    global.chrome = {
      action: {
        setBadgeBackgroundColor: vi.fn(),
        setBadgeTextColor: vi.fn(),
        setBadgeText: vi.fn(),
      },
    };
  });

  it('should set the badge with default text', () => {
    badge.set();
    expect(chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: '#C63C51' });
    expect(chrome.action.setBadgeTextColor).toHaveBeenCalledWith({ color: '#FFFFFF' });
    expect(chrome.action.setBadgeText).toHaveBeenCalledWith({ text: '1' });
  });

  it('should set the badge with specified text', () => {
    badge.set('test');
    expect(chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: '#C63C51' });
    expect(chrome.action.setBadgeTextColor).toHaveBeenCalledWith({ color: '#FFFFFF' });
    expect(chrome.action.setBadgeText).toHaveBeenCalledWith({ text: 'test' });
  });

  it('should clear the badge text', () => {
    badge.clear();
    expect(chrome.action.setBadgeText).toHaveBeenCalledWith({ text: '' });
  });
});
