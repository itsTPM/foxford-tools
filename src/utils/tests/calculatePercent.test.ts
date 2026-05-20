import { describe, it, expect } from 'vitest';
import { calculatePercent, isFullyAssessed } from '../calculatePercent';

describe('calculatePercent', () => {
  it('should return 100% when only solved tasks are present', () => {
    expect(calculatePercent(makeStats({ solved: 4, partially: 0, failed: 0, total: 4 }))).toEqual({
      percent: 100,
      totalTasksCount: 4,
      solvedTasksCount: 4,
    });
  });

  it('should return 0% when only failed tasks are present', () => {
    expect(calculatePercent(makeStats({ solved: 0, partially: 0, failed: 3, total: 3 }))).toEqual({
      percent: 0,
      totalTasksCount: 3,
      solvedTasksCount: 3,
    });
  });

  it('should weight partially as 0.5 in the rate', () => {
    expect(calculatePercent(makeStats({ solved: 1, partially: 2, failed: 1, total: 4 }))).toEqual({
      percent: 50,
      totalTasksCount: 4,
      solvedTasksCount: 4,
    });
  });

  it('should treat purely partially as 50%', () => {
    expect(calculatePercent(makeStats({ solved: 0, partially: 4, failed: 0, total: 4 }))).toEqual({
      percent: 50,
      totalTasksCount: 4,
      solvedTasksCount: 4,
    });
  });

  it('should round the percent to the nearest integer', () => {
    expect(calculatePercent(makeStats({ solved: 2, partially: 0, failed: 1, total: 3 })).percent).toBe(67);
  });

  it('should return null percent when there are no assessed tasks', () => {
    expect(calculatePercent(makeStats({ solved: 0, partially: 0, failed: 0, total: 0 }))).toEqual({
      percent: null,
      totalTasksCount: 0,
      solvedTasksCount: 0,
    });
  });

  it('should expose totalTasksCount distinct from solvedTasksCount when some tasks are unassessed', () => {
    expect(calculatePercent(makeStats({ solved: 2, partially: 0, failed: 0, total: 5 }))).toEqual({
      percent: 100,
      totalTasksCount: 5,
      solvedTasksCount: 2,
    });
  });
});

describe('isFullyAssessed', () => {
  it('should return true when every task has a terminal status', () => {
    expect(isFullyAssessed(makeStats({ solved: 2, partially: 1, failed: 1, total: 4 }))).toBe(true);
  });

  it('should return false when some tasks are still unassessed', () => {
    expect(isFullyAssessed(makeStats({ solved: 2, partially: 0, failed: 0, total: 5 }))).toBe(false);
  });

  it('should return true for a lesson with zero tasks (vacuously)', () => {
    expect(isFullyAssessed(makeStats({ solved: 0, partially: 0, failed: 0, total: 0 }))).toBe(true);
  });
});

function makeStats({
  solved,
  partially,
  failed,
  total,
}: {
  solved: number;
  partially: number;
  failed: number;
  total: number;
}): LessonTasksStats {
  return {
    solved_tasks_count: solved,
    partially_tasks_count: partially,
    failed_tasks_count: failed,
    tasks_count: total,
  };
}
