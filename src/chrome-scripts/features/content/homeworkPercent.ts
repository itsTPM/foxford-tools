import { createObserver, createPercentElement } from '../../dom';
import { logger, makeRequest } from '../../utils';

type SolvedStatus = 'solved' | 'partially' | 'failed';

const IGNORED_STATUSES: readonly TaskStatus[] = ['started', 'not_started', 'hinted', 'in_queue', 'unavailable'];
const SOLVED_STATUSES: readonly TaskStatus[] = ['solved', 'partially', 'failed'];
const SOLVED_STATUSES_RATE: Record<SolvedStatus, number> = {
  solved: 1,
  partially: 0.5,
  failed: 0,
};

export function homeworkPercent() {
  const observer = createObserver({
    targetElementSelector: '#joyrideHomeworkBtn',
    createdElementSelector: '#homeworkPercent',
    urlPart: 'courses',
    callback: observerCallback,
  });

  observer.observe();
}

async function observerCallback(element: Element) {
  const homeworkLink = getHomeworkLink(element);
  if (!homeworkLink || homeworkLink.includes('trainings')) return;

  const homeworkId = homeworkLink.match(/lessons\/(\d+)/)?.[1];
  if (!homeworkId) {
    logger.error('Homework ID is undefined');
    return;
  }

  const tasks = await getTasks(homeworkId);
  if (!tasks) {
    logger.error('Tasks are undefined');
    return;
  }

  const { percent, totalTasksCount, solvedTasksCount } = calculatePercent(tasks);
  const percentElement = setupHomeworkPercentElement(percent, element);

  if (checkIsShouldUseLegendary({ percent, totalTasksCount, solvedTasksCount })) {
    useLegendary(percentElement);
  }
}

function getHomeworkLink(element: Element) {
  return element.closest<HTMLAnchorElement>('a[href]')?.href;
}

async function getTasks(homeworkId: string) {
  return makeRequest<Task[]>({ url: `lessons/${homeworkId}/tasks`, cacheCallback });
}

export function cacheCallback(data: Task[]) {
  return data.every(({ status }) => SOLVED_STATUSES.includes(status));
}

export function calculatePercent(tasks: Task[]) {
  const solvedTasks = tasks.filter(({ status }) => !IGNORED_STATUSES.includes(status));
  const solvedTasksRate = solvedTasks.reduce(
    (sum, { status }) => sum + SOLVED_STATUSES_RATE[status as SolvedStatus],
    0
  );

  return {
    percent: Math.round((solvedTasksRate / solvedTasks.length) * 100),
    totalTasksCount: tasks.length,
    solvedTasksCount: solvedTasks.length,
  };
}

function setupHomeworkPercentElement(percent: number, parent: Element) {
  const percentElement = createPercentElement({
    percent,
    parent,
    insertMethod: 'after',
  });

  setPercentElementAttributes(percentElement);

  return percentElement;
}

function setPercentElementAttributes(percentElement: HTMLElement) {
  percentElement.id = 'homeworkPercent';
  percentElement.classList.add('homeworkPercent');
}

export function checkIsShouldUseLegendary({
  percent,
  totalTasksCount,
  solvedTasksCount,
}: {
  percent: number;
  totalTasksCount: number;
  solvedTasksCount: number;
}) {
  return percent === 100 && totalTasksCount === solvedTasksCount;
}

function useLegendary(element: HTMLElement) {
  element.classList.add('percent-legendary');
}
