import './assets/content.css';
import * as observers from './observers/index.js';

// Получение настроек из localStorage и запуск MutationObserver, если пользователь включил соответствующий пункт в настройках
const settings = {
  readingTime: observers.calculateReadingTime(),
  homeworkPercent: observers.calculateHomeworkProgress(),
  webinarPercent: observers.calculateWebinarProgress(),
  readingList: observers.addReadingListButton(),
  searchButton: observers.addSearchButton(),
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
      console.log(setting, observer);
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
