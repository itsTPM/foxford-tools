import { Observer, PercentElement, Request } from '../classes';

async function calculateHomeworkProgress(element) {
  let tasksPercent = 0;
  let tasksCount = 0;
  let totalTasksCount = 0;
  // следующие 3 строчки - выцепляем id домашки из href кнопки, потом добавляем его в ссылку на api
  const homeworkLink = element.parentNode.parentNode.parentNode.parentNode.parentNode.href; // это надо будет заменить
  const homeworkId = homeworkLink?.match(/[0-9]+/g);

  // trainings - проверочные, на них процентов нет
  if (!homeworkId || homeworkLink.includes('trainings')) {
    return;
  }

  const request = new Request({ url: `lessons/${homeworkId}/tasks`, cacheCallback });
  const tasksJson = await request.make();

  const statusValues = {
    solved: 1,
    partially: 0.5,
    failed: 0,
  };

  const ignoredStatuses = ['started', 'not_started', 'hinted', 'in_queue', 'unavailable'];

  if (Array.isArray(tasksJson)) {
    tasksJson.forEach(({ status }) => {
      totalTasksCount++;

      if (!ignoredStatuses.includes(status)) {
        tasksPercent += statusValues[status];
        tasksCount++;
      }
    });
  }

  const homeworkPercent = Math.round((tasksPercent / tasksCount) * 100);
  const percentElement = new PercentElement({
    percent: homeworkPercent,
    parent: element,
    insertMethod: 'after',
  });
  percentElement.classList.add('homeworkPercent');

  if (homeworkPercent === 100 && totalTasksCount === tasksCount) {
    percentElement.classList.add('percent-legendary');
  }
}

export default function createHomeworkObserver() {
  const observer = new Observer({
    targetElementSelector: '#joyrideHomeworkBtn',
    createdElementSelector: '.homeworkPercent',
    urlPart: 'courses',
    callback: calculateHomeworkProgress,
  });

  return observer;
}

function cacheCallback(data) {
  return data.every(({ status }) => status === 'solved' || status === 'partially' || status === 'failed');
}
