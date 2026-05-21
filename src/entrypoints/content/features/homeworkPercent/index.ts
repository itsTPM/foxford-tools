import { createObserver, createPercentElement } from '@/utils/dom';
import { calculatePercent, isFullyAssessed, logger, makeRequest } from '@/utils';
import type { PercentResult } from '@/utils/calculatePercent';

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
  const homeworkLink = element.closest<HTMLAnchorElement>('a[href]')?.href;
  if (!homeworkLink || homeworkLink.includes('trainings')) return;

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

  if (stats.homework.tasks_count === 0) return;

  const result = calculatePercent(stats.homework);
  const percentElement = setupHomeworkPercentElement(result.percent, element);

  if (percentElement && checkIsShouldUseLegendary(result)) {
    useLegendary(percentElement);
  }
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

function setupHomeworkPercentElement(percent: number | null, titleElement: Element) {
  const tasksProgress = titleElement.nextElementSibling;
  if (!(tasksProgress instanceof Element)) {
    logger.error('Unable to find tasks-progress for homework percent element');
    return;
  }

  const percentElement = createPercentElement({
    percent,
    parent: tasksProgress,
    insertMethod: 'prepend',
  });

  setPercentElementAttributes(percentElement);

  return percentElement;
}

function setPercentElementAttributes(percentElement: HTMLElement) {
  percentElement.id = 'homeworkPercent';
  percentElement.classList.add('homeworkPercent');
}

export function checkIsShouldUseLegendary({ percent, totalTasksCount, assessedTasksCount }: PercentResult) {
  return percent === 100 && totalTasksCount === assessedTasksCount;
}

function useLegendary(element: HTMLElement) {
  element.classList.add('percent-legendary');
}
