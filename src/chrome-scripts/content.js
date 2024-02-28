import './assets/content.css';
import * as observers from './observers/index.js';
import getSettings from './modules/getSettings';

// Получение настроек из localStorage и запуск MutationObserver, если пользователь включил соответствующий пункт в настройках
const settings = {
  readingTime: observers.readingTime(),
  homeworkPercent: observers.homeworkPercent(),
  webinarPercent: observers.webinarPercent(),
  readingList: observers.readingList(),
  searchButton: observers.searchButton(),
};

getSettings(Object.keys(settings))
  .then((result) => {
    for (const [setting, observer] of Object.entries(settings)) {
      if (!result[setting]) continue;

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      console.log(`[Foxford Tools] MutationObserver started for ${setting}`);
    }
  })
  .catch((error) => console.error(`Error getting settings: ${error}`));
