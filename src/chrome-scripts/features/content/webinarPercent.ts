import { createObserver, createPercentElement, makeRequest } from '../../classes';

export function webinarPercent() {
  const observer = createObserver({
    targetElementSelector: '#joyrideLessonBtn',
    createdElementSelector: '#webinarPercent',
    urlPart: 'courses',
    callback: observerCallback,
  });

  observer.observe();
}

async function observerCallback(element: Element) {
  const webinarLinkElement = element.closest<HTMLAnchorElement>('a');
  if (!webinarLinkElement) return;

  const webinarId = webinarLinkElement.href.match(/lessons\/(\d+)/)?.[1];
  if (!webinarId) return;

  const lessonTasksStats = await getLessonTasksStats(webinarId);
  if (!lessonTasksStats) return;

  const percent = calculateTasksPercent(lessonTasksStats.classwork);
  setupWebinarPercentElement(percent, element);
}

async function getLessonTasksStats(webinarId: string) {
  return makeRequest<LessonTasksStats>({ url: `user/calendar/items/course_lessons/${webinarId}` });
}

function calculateTasksPercent(tasksStats: ClassworkStats) {
  const {
    solved_tasks_count: successfulTasksCount,
    partially_tasks_count: partiallyTasksCount,
    failed_tasks_count: failedTasksCount,
  } = tasksStats;

  const solvedTasksCount = successfulTasksCount + partiallyTasksCount + failedTasksCount;

  return Math.round(((successfulTasksCount + partiallyTasksCount * 0.5) / solvedTasksCount) * 100);
}

function setupWebinarPercentElement(percent: number, element: Element) {
  const parent = element.lastChild?.lastChild?.lastChild?.lastChild;
  if (!(parent instanceof Element)) return;

  const percentElement = createPercentElement({
    percent,
    parent,
    insertMethod: 'before',
  });

  percentElement.id = 'webinarPercent';
  percentElement.classList.add('webinarPercent');
}
