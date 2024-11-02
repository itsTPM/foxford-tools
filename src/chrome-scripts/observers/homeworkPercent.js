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
    hinted: 0,
    started: 0,
    not_started: 0,
    in_queue: 0,
  };

  if (Array.isArray(tasksJson)) {
    tasksJson.forEach((task) => {
      totalTasksCount += 1;
      tasksPercent += statusValues[task.status] || 0;
      if (!['started', 'not_started', 'hinted', 'in_queue'].includes(task.status)) {
        tasksCount += 1;
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
