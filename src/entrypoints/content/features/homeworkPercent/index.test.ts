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
  });

  describe('checkIsShouldUseLegendary', () => {
    it('should return true when percent is 100 and total === solved', () => {
      expect(checkIsShouldUseLegendary({ percent: 100, totalTasksCount: 5, solvedTasksCount: 5 })).toBe(true);
    });

    it('should return false when percent is 100 but some tasks remain unassessed', () => {
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
