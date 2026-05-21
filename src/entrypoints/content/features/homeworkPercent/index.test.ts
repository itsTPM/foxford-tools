import { describe, it, expect } from 'vitest';
import { cacheCallback, checkIsShouldUseLegendary } from '.';

describe('homeworkPercent', () => {
  describe('cacheCallback', () => {
    it('should return true when both classwork and homework are fully assessed', () => {
      const response = makeResponse({
        classwork: { solved: 2, partially: 1, failed: 0, total: 3 },
        homework: { solved: 1, partially: 2, failed: 1, total: 4 },
      });

      expect(cacheCallback(response)).toBe(true);
    });

    it('should return false when classwork still has unassessed tasks', () => {
      const response = makeResponse({
        classwork: { solved: 2, partially: 0, failed: 0, total: 5 },
        homework: { solved: 1, partially: 0, failed: 0, total: 1 },
      });

      expect(cacheCallback(response)).toBe(false);
    });

    it('should return false when homework still has unassessed tasks', () => {
      const response = makeResponse({
        classwork: { solved: 2, partially: 0, failed: 0, total: 2 },
        homework: { solved: 0, partially: 0, failed: 0, total: 3 },
      });

      expect(cacheCallback(response)).toBe(false);
    });

    it('should return true when lesson has no homework (classwork-only)', () => {
      const response = makeResponse({
        classwork: { solved: 3, partially: 0, failed: 1, total: 4 },
        homework: { solved: 0, partially: 0, failed: 0, total: 0 },
      });

      expect(cacheCallback(response)).toBe(true);
    });

    it('should return false when lesson has no classwork but homework is not assessed', () => {
      const response = makeResponse({
        classwork: { solved: 0, partially: 0, failed: 0, total: 0 },
        homework: { solved: 0, partially: 0, failed: 0, total: 5 },
      });

      expect(cacheCallback(response)).toBe(false);
    });

    it('should return true when lesson has no classwork and homework is fully assessed', () => {
      const response = makeResponse({
        classwork: { solved: 0, partially: 0, failed: 0, total: 0 },
        homework: { solved: 5, partially: 0, failed: 0, total: 5 },
      });

      expect(cacheCallback(response)).toBe(true);
    });
  });

  describe('checkIsShouldUseLegendary', () => {
    it('should return true when percent is 100 and total === solved', () => {
      expect(checkIsShouldUseLegendary({ percent: 100, totalTasksCount: 5, assessedTasksCount: 5 })).toBe(true);
    });

    it('should return false when percent is 100 but some tasks remain unassessed', () => {
      expect(checkIsShouldUseLegendary({ percent: 100, totalTasksCount: 7, assessedTasksCount: 5 })).toBe(false);
    });

    it('should return false when percent is below 100', () => {
      expect(checkIsShouldUseLegendary({ percent: 99, totalTasksCount: 5, assessedTasksCount: 5 })).toBe(false);
    });

    it('should return false when percent is null (no work to assess)', () => {
      expect(checkIsShouldUseLegendary({ percent: null, totalTasksCount: 3, assessedTasksCount: 0 })).toBe(false);
    });
  });
});

interface Counts {
  solved: number;
  partially: number;
  failed: number;
  total: number;
}

function makeResponse({ classwork, homework }: { classwork: Counts; homework: Counts }): LessonStatsResponse {
  return {
    visiting_state: 'visited',
    classwork: toStats(classwork),
    homework: toStats(homework),
  };
}

function toStats({ solved, partially, failed, total }: Counts): LessonTasksStats {
  return {
    solved_tasks_count: solved,
    partially_tasks_count: partially,
    failed_tasks_count: failed,
    tasks_count: total,
  };
}
