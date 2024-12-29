import { Observer, PercentElement, Request } from '../classes';

const IGNORED_STATUSES = ['started', 'not_started', 'hinted', 'in_queue', 'unavailable'];
const SOLVED_STATUSES = ['solved', 'partially', 'failed'];
const SOLVED_STATUSES_RATE = {
  solved: 1,
  partially: 0.5,
  failed: 0,
};

export default function createHomeworkObserver() {
  const observer = new Observer({
    targetElementSelector: '#joyrideHomeworkBtn',
    createdElementSelector: '#homeworkPercent',
    urlPart: 'courses',
    callback: observerCallback,
  });

  observer.observe();
}

async function observerCallback(element) {
  const homeworkLink = getHomeworkLink(element);
  const homeworkId = getHomeworkId(homeworkLink);

  const isShouldReturn = checkIsShouldReturn(homeworkId, homeworkLink);

  if (isShouldReturn) {
    return;
  }

  const tasks = await getTasks(homeworkId);
  const { percent, totalTasksCount, solvedTasksCount } = calculatePercent(tasks);

  const percentElement = createPercentElement(percent, element);

  const isShouldUseLegendary = checkIsShouldUseLegendary({ percent, totalTasksCount, solvedTasksCount });

  if (isShouldUseLegendary) {
    useLegendary(percentElement);
  }
}

function getHomeworkId(homeworkLink) {
  return homeworkLink?.match(/[0-9]+/g);
}

function checkIsShouldReturn(homeworkId, homeworkLink) {
  const falsyCases = [!homeworkId || homeworkLink.includes('trainings')];

  return falsyCases.some((falsyCase) => falsyCase);
}

async function getTasks(homeworkId) {
  const request = new Request({ url: `lessons/${homeworkId}/tasks`, cacheCallback });
  const tasks = await request.make();

  return tasks;
}

function calculatePercent(tasks) {
  if (!Array.isArray(tasks)) {
    return;
  }

  let totalTasksCount = 0;
  let solvedTasksCount = 0;
  let solvedTasksRate = 0;

  for (const { status } of tasks) {
    totalTasksCount++;

    if (!IGNORED_STATUSES.includes(status)) {
      solvedTasksRate += SOLVED_STATUSES_RATE[status];
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

function createPercentElement(percent, parent) {
  const percentElement = new PercentElement({
    percent,
    parent,
    insertMethod: 'after',
  });

  setPercentElementAttributes(percentElement);

  return percentElement;
}

function cacheCallback(data) {
  return data.every(({ status }) => SOLVED_STATUSES.includes(status));
}

function getHomeworkLink(element) {
  return element.parentNode.parentNode.parentNode.parentNode.parentNode.href;
}

function setPercentElementAttributes(percentElement) {
  percentElement.id = 'homeworkPercent';
  percentElement.classList.add('homeworkPercent');
}

function checkIsShouldUseLegendary({ percent, totalTasksCount, solvedTasksCount }) {
  return percent === 100 && totalTasksCount === solvedTasksCount;
}

function useLegendary(element) {
  element.classList.add('percent-legendary');
}
