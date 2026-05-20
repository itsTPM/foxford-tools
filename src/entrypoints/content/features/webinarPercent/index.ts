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
  const groupId = getGroupId(element);
  if (!groupId) {
    logger.error('Group ID is undefined');
    return;
  }

  const stats = await getStats(groupId);
  if (!stats) {
    logger.error('Lesson stats are undefined');
    return;
  }

  const { percent } = calculatePercent(stats.classwork);
  setupWebinarPercentElement(percent, element);
}

function getGroupId(element: Element) {
  return element
    .closest('a[href]')
    ?.parentElement?.querySelector<HTMLAnchorElement>('a[href*="/groups/"]')
    ?.href.match(/groups\/(\d+)/)?.[1];
}

async function getStats(groupId: string) {
  return makeRequest<LessonStatsResponse>({
    url: `user/calendar/items/course_lessons/${groupId}`,
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
