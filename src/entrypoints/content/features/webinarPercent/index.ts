import { createObserver, createPercentElement } from '@/utils/dom';
import { calculatePercent, isFullyAssessed, logger, makeRequest } from '@/utils';

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

  const lessonId = webinarLink.match(/lessons\/(\d+)/)?.[1];
  if (!lessonId) {
    logger.error('Lesson ID is undefined');
    return;
  }

  const stats = await getLessonStats(lessonId);
  if (!stats) {
    logger.error('Lesson stats are undefined');
    return;
  }

  const { percent } = calculatePercent(stats.classwork);
  setupWebinarPercentElement(percent, element);
}

function getWebinarLink(element: Element) {
  return element.closest<HTMLAnchorElement>('a[href]')?.href;
}

async function getLessonStats(lessonId: string) {
  return makeRequest<LessonStatsResponse>({
    url: `user/calendar/items/course_lessons/${lessonId}`,
    cacheCallback,
  });
}

export function cacheCallback(data: LessonStatsResponse) {
  return isFullyAssessed(data.classwork) && isFullyAssessed(data.homework);
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
