import { createObserver, createPercentElement } from '../../dom';
import { logger, makeRequest } from '../../utils';

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
  const webinarLink = getWebinarLink(element);
  if (!webinarLink) return;

  const webinarId = webinarLink.match(/lessons\/(\d+)/)?.[1];
  if (!webinarId) {
    logger.error('Webinar ID is undefined');
    return;
  }

  const lessonTasksStats = await getLessonTasksStats(webinarId);
  if (!lessonTasksStats) {
    logger.error('Lesson tasks stats are undefined');
    return;
  }

  const percent = calculatePercent(lessonTasksStats.classwork);
  setupWebinarPercentElement(percent, element);
}

function getWebinarLink(element: Element) {
  return element.closest<HTMLAnchorElement>('a[href]')?.href;
}

async function getLessonTasksStats(webinarId: string) {
  return makeRequest<LessonTasksStats>({ url: `user/calendar/items/course_lessons/${webinarId}` });
}

export function calculatePercent(tasksStats: ClassworkStats) {
  const {
    solved_tasks_count: successfulTasksCount,
    partially_tasks_count: partiallyTasksCount,
    failed_tasks_count: failedTasksCount,
  } = tasksStats;

  const solvedTasksCount = successfulTasksCount + partiallyTasksCount + failedTasksCount;
  if (solvedTasksCount === 0) return null;

  return Math.round(((successfulTasksCount + partiallyTasksCount * 0.5) / solvedTasksCount) * 100);
}

function setupWebinarPercentElement(percent: number | null, element: Element) {
  const parent = element.lastChild?.lastChild?.lastChild?.lastChild;
  if (!(parent instanceof Element)) {
    logger.error('Unable to find suitable parent for webinar percent element');
    return;
  }

  const percentElement = createPercentElement({
    percent,
    parent,
    insertMethod: 'before',
  });

  setPercentElementAttributes(percentElement);

  return percentElement;
}

function setPercentElementAttributes(percentElement: HTMLElement) {
  percentElement.id = 'webinarPercent';
  percentElement.classList.add('webinarPercent');
}
