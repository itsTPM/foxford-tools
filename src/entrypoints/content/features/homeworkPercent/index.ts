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
  const homeworkLink = getHomeworkLink(element);
  if (!homeworkLink || homeworkLink.includes('trainings')) return;

  const lessonId = homeworkLink.match(/lessons\/(\d+)/)?.[1];
  if (!lessonId) {
    logger.error('Lesson ID is undefined');
    return;
  }

  const stats = await getLessonStats(lessonId);
  if (!stats) {
    logger.error('Lesson stats are undefined');
    return;
  }

  const result = calculatePercent(stats.homework);
  const percentElement = setupHomeworkPercentElement(result.percent, element);

  if (checkIsShouldUseLegendary(result)) {
    useLegendary(percentElement);
  }
}

function getHomeworkLink(element: Element) {
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

function setupHomeworkPercentElement(percent: number | null, parent: Element) {
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

export function checkIsShouldUseLegendary({ percent, totalTasksCount, solvedTasksCount }: PercentResult) {
  return percent === 100 && totalTasksCount === solvedTasksCount;
}

function useLegendary(element: HTMLElement) {
  element.classList.add('percent-legendary');
}
