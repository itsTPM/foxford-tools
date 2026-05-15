import { describe, it, expect } from 'vitest';
import { calculatePercent } from '../webinarPercent';

describe('webinarPercent', () => {
  describe('calculatePercent', () => {
    it('should return 100% when only solved tasks are present', () => {
      const stats = makeStats({ solved: 4, partially: 0, failed: 0 });

      expect(calculatePercent(stats)).toBe(100);
    });

    it('should return 0% when only failed tasks are present', () => {
      const stats = makeStats({ solved: 0, partially: 0, failed: 3 });

      expect(calculatePercent(stats)).toBe(0);
    });

    it('should weight partially as 0.5 in the rate', () => {
      const stats = makeStats({ solved: 1, partially: 2, failed: 1 });

      expect(calculatePercent(stats)).toBe(50);
    });

    it('should treat purely partially as 50%', () => {
      const stats = makeStats({ solved: 0, partially: 4, failed: 0 });

      expect(calculatePercent(stats)).toBe(50);
    });

    it('should round the percent to the nearest integer', () => {
      const stats = makeStats({ solved: 2, partially: 0, failed: 1 });

      expect(calculatePercent(stats)).toBe(67);
    });

    it('should return null when there are no tasks', () => {
      const stats = makeStats({ solved: 0, partially: 0, failed: 0 });

      expect(calculatePercent(stats)).toBeNull();
    });
  });
});

function makeStats({
  solved,
  partially,
  failed,
}: {
  solved: number;
  partially: number;
  failed: number;
}): ClassworkStats {
  return {
    solved_tasks_count: solved,
    partially_tasks_count: partially,
    failed_tasks_count: failed,
  };
}
