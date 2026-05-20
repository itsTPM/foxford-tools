export interface PercentResult {
  percent: number | null;
  totalTasksCount: number;
  assessedTasksCount: number;
}

export function calculatePercent(stats: LessonTasksStats): PercentResult {
  const { solved_tasks_count, partially_tasks_count, failed_tasks_count, tasks_count } = stats;
  const assessedTasksCount = solved_tasks_count + partially_tasks_count + failed_tasks_count;

  if (assessedTasksCount === 0) {
    return { percent: null, totalTasksCount: tasks_count, assessedTasksCount: 0 };
  }

  const rate = solved_tasks_count + partially_tasks_count * 0.5;
  const percent = Math.round((rate / assessedTasksCount) * 100);

  return { percent, totalTasksCount: tasks_count, assessedTasksCount };
}

export function isFullyAssessed(stats: LessonTasksStats) {
  return stats.solved_tasks_count + stats.partially_tasks_count + stats.failed_tasks_count === stats.tasks_count;
}
