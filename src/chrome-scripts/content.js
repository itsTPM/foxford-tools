import './assets/content.css';
import * as observers from './observers/index.js';
import createObserver from './modules/createObserver.js';

const conspectsObserver = createObserver(
  '#wikiThemeContent',
  1,
  'conspects',
  '.badgeWrapper',
  observers.calculateReadingTime
);
const webinarObserver = createObserver('.bKdhIU', 1, 'courses', '.webinarPercent', observers.calculateWebinarProgress);
const homeworkObserver = createObserver(
  '#joyrideHomeworkBtn',
  1,
  'courses',
  '.homeworkPercent',
  observers.calculateHomeworkProgress
);
const readingListObserver = createObserver(
  '#wikiThemeContent',
  1,
  'conspects',
  '.readingListButton',
  observers.addReadingListButton
);

// Получение настроек из localStorage и запуск MutationObserver, если пользователь включил соответствующий пункт в настройках
const settings = {
  readingTime: conspectsObserver,
  homeworkPercent: homeworkObserver,
  webinarPercent: webinarObserver,
  readingList: readingListObserver,
};

function getSettings(keys) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result);
      }
    });
  });
}

getSettings(Object.keys(settings))
  .then((result) => {
    for (const [setting, observer] of Object.entries(settings)) {
      if (!result[setting]) {
        continue;
      }

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      console.log(`[Foxford Tools] MutationObserver started for ${setting}`);
    }
  })
  .catch((error) => console.error(`Error getting settings: ${error}`));
