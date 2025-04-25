import { PercentElement, Observer, Request } from '../../classes';

export default function createWebinarObserver() {
  const observer = new Observer({
    targetElementSelector: '#joyrideLessonBtn',
    createdElementSelector: '#webinarPercent',
    urlPart: 'courses',
    callback: observerCallback,
  });

  observer.observe();
}

async function observerCallback(element) {
  const webinarLinkElement = getWebinarLinkElement();

  if (!webinarLinkElement) {
    return;
  }

  const webinarId = getWebinarId(webinarLinkElement);
  const lessonTasksStats = await getLessonTasksStats(webinarId);
  const percent = calculateTasksPercent(lessonTasksStats.classwork);

  createPercentElement(percent, element);
}

function getWebinarLinkElement() {
  return document.querySelector('a:has(#joyrideLessonBtn)');
}

function getWebinarId(webinarButton) {
  const webinarLink = webinarButton.getAttribute('href');
  const webinarId = webinarLink.match(/[0-9]+/g);

  return webinarId;
}

async function getLessonTasksStats(webinarId) {
  const request = new Request({ url: `user/calendar/items/course_lessons/${webinarId}` });
  return await request.make();
}

function calculateTasksPercent(tasksStats) {
  const {
    solved_tasks_count: successfulTasksCount,
    partially_tasks_count: partiallyTasksCount,
    failed_tasks_count: failedTasksCount,
  } = tasksStats;

  const solvedTasksCount = successfulTasksCount + partiallyTasksCount + failedTasksCount;

  return Math.round(((successfulTasksCount + partiallyTasksCount * 0.5) / solvedTasksCount) * 100);
}

function createPercentElement(percent, element) {
  const percentElement = new PercentElement({
    percent,
    parent: element.lastChild.lastChild.lastChild.lastChild,
    insertMethod: 'before',
  });

  setPercentElementAttributes(percentElement);

  return percentElement;
}

function setPercentElementAttributes(percentElement) {
  percentElement.id = 'webinarPercent';
  percentElement.classList.add('webinarPercent');
}
