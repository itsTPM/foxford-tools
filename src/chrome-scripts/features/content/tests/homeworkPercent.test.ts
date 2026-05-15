import { describe, it, expect } from 'vitest';
import { calculatePercent, cacheCallback, checkIsShouldUseLegendary } from '../homeworkPercent';

describe('homeworkPercent', () => {
  describe('calculatePercent', () => {
    it('should return 100% when all tasks are solved', () => {
      const tasks = makeTasks(['solved', 'solved', 'solved']);

      const result = calculatePercent(tasks);

      expect(result).toEqual({ percent: 100, totalTasksCount: 3, solvedTasksCount: 3 });
    });

    it('should return 0% when all tasks are failed', () => {
      const tasks = makeTasks(['failed', 'failed']);

      const result = calculatePercent(tasks);

      expect(result).toEqual({ percent: 0, totalTasksCount: 2, solvedTasksCount: 2 });
    });

    it('should weight partially as 0.5 in the rate', () => {
      const tasks = makeTasks(['solved', 'partially', 'failed', 'partially']);

      const result = calculatePercent(tasks);

      expect(result).toEqual({ percent: 50, totalTasksCount: 4, solvedTasksCount: 4 });
    });

    it('should exclude IGNORED statuses from the denominator', () => {
      const tasks = makeTasks(['solved', 'solved', 'not_started', 'in_queue', 'unavailable', 'hinted', 'started']);

      const result = calculatePercent(tasks);

      expect(result).toEqual({ percent: 100, totalTasksCount: 7, solvedTasksCount: 2 });
    });

    it('should round percent to the nearest integer', () => {
      const tasks = makeTasks(['solved', 'solved', 'failed']);

      const result = calculatePercent(tasks);

      expect(result.percent).toBe(67);
    });

    it('should return null percent for an empty array', () => {
      const result = calculatePercent([]);

      expect(result).toEqual({ percent: null, totalTasksCount: 0, solvedTasksCount: 0 });
    });

    it('should return null percent when all tasks are ignored', () => {
      const tasks = makeTasks(['not_started', 'started']);

      const result = calculatePercent(tasks);

      expect(result).toEqual({ percent: null, totalTasksCount: 2, solvedTasksCount: 0 });
    });
  });

  describe('cacheCallback', () => {
    it('should return true when every status is SOLVED-like', () => {
      expect(cacheCallback(makeTasks(['solved', 'partially', 'failed']))).toBe(true);
    });

    it('should return false when at least one status is IGNORED', () => {
      expect(cacheCallback(makeTasks(['solved', 'partially', 'in_queue']))).toBe(false);
    });

    it('should return true for an empty array (vacuously)', () => {
      expect(cacheCallback([])).toBe(true);
    });
  });

  describe('checkIsShouldUseLegendary', () => {
    it('should return true when percent is 100 and total === solved', () => {
      expect(checkIsShouldUseLegendary({ percent: 100, totalTasksCount: 5, solvedTasksCount: 5 })).toBe(true);
    });

    it('should return false when percent is 100 but some tasks were IGNORED (total !== solved)', () => {
      expect(checkIsShouldUseLegendary({ percent: 100, totalTasksCount: 7, solvedTasksCount: 5 })).toBe(false);
    });

    it('should return false when percent is below 100', () => {
      expect(checkIsShouldUseLegendary({ percent: 99, totalTasksCount: 5, solvedTasksCount: 5 })).toBe(false);
    });

    it('should return false when percent is null (no work to assess)', () => {
      expect(checkIsShouldUseLegendary({ percent: null, totalTasksCount: 3, solvedTasksCount: 0 })).toBe(false);
    });
  });
});

function makeTasks(statuses: TaskStatus[]): Task[] {
  return statuses.map((status) => ({ status }));
}
