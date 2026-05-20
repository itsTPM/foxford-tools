import { describe, it, expect } from 'vitest';
import { cacheCallback } from '.';

describe('webinarPercent', () => {
  describe('cacheCallback', () => {
    it('should return true when both classwork and homework are fully assessed', () => {
      const response = makeResponse({
        classwork: { solved: 2, partially: 1, failed: 0, total: 3 },
        homework: { solved: 1, partially: 0, failed: 0, total: 1 },
      });

      expect(cacheCallback(response)).toBe(true);
    });

    it('should return false when classwork still has unassessed tasks', () => {
      const response = makeResponse({
        classwork: { solved: 0, partially: 0, failed: 0, total: 3 },
        homework: { solved: 1, partially: 0, failed: 0, total: 1 },
      });

      expect(cacheCallback(response)).toBe(false);
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
