import { fetchWithCache, createPercentElement, createObserver } from '../modules';

async function calculateHomeworkProgress(element) {
  let tasksPercent = 0;
  let tasksCount = 0;
  let totalTasksCount = 0;
  // следующие 3 строчки - выцепляем id домашки из href кнопки, потом добавляем его в ссылку на api
  const homeworkLink = element.parentNode.parentNode.parentNode.parentNode.parentNode.href; // это надо будет заменить
  const homeworkId = homeworkLink?.match(/[0-9]+/g);
  const apiLink = `https://foxford.ru/api/lessons/${homeworkId}/tasks`;

  if (!homeworkId || homeworkLink.includes('trainings')) {
    return;
  }

  const tasksJson = await fetchWithCache(apiLink).catch((err) => {
    throw err;
  });

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
  const percentElement = createPercentElement(homeworkPercent, element, 'after');
  percentElement.classList.add('homeworkPercent');

  if (homeworkPercent === 100 && totalTasksCount === tasksCount) {
    percentElement.classList.add('percent-legendary');
  }
}

export default function createHomeworkObserver() {
  const observer = createObserver(['#joyrideHomeworkBtn', 1, 'courses', '.homeworkPercent', calculateHomeworkProgress]);

  return observer;
}
