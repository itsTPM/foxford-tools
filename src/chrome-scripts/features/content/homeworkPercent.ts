import { createObserver, createPercentElement, makeRequest } from '../../classes';

type SolvedStatus = 'solved' | 'partially' | 'failed';

const IGNORED_STATUSES: readonly TaskStatus[] = ['started', 'not_started', 'hinted', 'in_queue', 'unavailable'];
const SOLVED_STATUSES: readonly TaskStatus[] = ['solved', 'partially', 'failed'];
const SOLVED_STATUSES_RATE: Record<SolvedStatus, number> = {
  solved: 1,
  partially: 0.5,
  failed: 0,
};

export function createHomeworkObserver() {
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
  if (!homeworkId) return;

  const tasks = await getTasks(homeworkId);
  const result = calculatePercent(tasks);
  if (!result) return;

  const { percent, totalTasksCount, solvedTasksCount } = result;
  const percentElement = setupHomeworkPercentElement(percent, element);

  if (checkIsShouldUseLegendary({ percent, totalTasksCount, solvedTasksCount })) {
    useLegendary(percentElement);
  }
}

function getHomeworkLink(element: Element): string | undefined {
  return element.closest<HTMLAnchorElement>('a[href]')?.href;
}

async function getTasks(homeworkId: string): Promise<Task[] | undefined> {
  return makeRequest<Task[]>({ url: `lessons/${homeworkId}/tasks`, cacheCallback });
}

function cacheCallback(data: Task[]): boolean {
  return data.every(({ status }) => SOLVED_STATUSES.includes(status));
}

function calculatePercent(tasks: Task[] | undefined) {
  if (!Array.isArray(tasks)) {
    return;
  }

  let totalTasksCount = 0;
  let solvedTasksCount = 0;
  let solvedTasksRate = 0;

  for (const { status } of tasks) {
    totalTasksCount++;

    if (!IGNORED_STATUSES.includes(status)) {
      solvedTasksRate += SOLVED_STATUSES_RATE[status as SolvedStatus];
      solvedTasksCount++;
    }
  }

  const percent = Math.round((solvedTasksRate / solvedTasksCount) * 100);

  return {
    percent,
    totalTasksCount,
    solvedTasksCount,
  };
}

function setupHomeworkPercentElement(percent: number, parent: Element): HTMLElement {
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

function checkIsShouldUseLegendary({
  percent,
  totalTasksCount,
  solvedTasksCount,
}: {
  percent: number;
  totalTasksCount: number;
  solvedTasksCount: number;
}): boolean {
  return percent === 100 && totalTasksCount === solvedTasksCount;
}

function useLegendary(element: HTMLElement) {
  element.classList.add('percent-legendary');
}
