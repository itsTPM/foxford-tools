import { describe, it, expect } from 'vitest';
import { shouldNotifyUpdate } from '../updateNotifier';

describe('updateNotifier', () => {
  describe('shouldNotifyUpdate', () => {
    it('should return false when reason is "install"', () => {
      expect(shouldNotifyUpdate({ reason: 'install', previousVersion: '1.0.0', currentVersion: '1.1.0' })).toBe(false);
    });

    it('should return false when previousVersion is undefined', () => {
      expect(shouldNotifyUpdate({ reason: 'update', previousVersion: undefined, currentVersion: '1.1.0' })).toBe(false);
    });

    it('should return false when previousVersion equals currentVersion', () => {
      expect(shouldNotifyUpdate({ reason: 'update', previousVersion: '1.1.0', currentVersion: '1.1.0' })).toBe(false);
    });

    it('should return true when reason is "update" and versions differ', () => {
      expect(shouldNotifyUpdate({ reason: 'update', previousVersion: '1.0.0', currentVersion: '1.1.0' })).toBe(true);
    });

    it('should return true for a "chrome_update" reason with different versions', () => {
      expect(shouldNotifyUpdate({ reason: 'chrome_update', previousVersion: '1.0.0', currentVersion: '1.1.0' })).toBe(
        true
      );
    });
  });
});
