import './assets/content.css';
import * as observers from './observers/index.js';
import getSettings from './modules/getSettings';
import fixYellowBlocksCss from './assets/fixYellowBlocks.css?inline';
import injectCss from './modules/injectCss';

// Получение настроек из localStorage и запуск MutationObserver, если пользователь включил соответствующий пункт в настройках
const settings = {
  readingTime: observers.readingTime(),
  homeworkPercent: observers.homeworkPercent(),
  webinarPercent: observers.webinarPercent(),
  readingList: observers.readingList(),
  searchButton: observers.searchButton(),
  fixYellowBlocks: () => {
    injectCss(fixYellowBlocksCss);
  },
};

getSettings(Object.keys(settings))
  .then((result) => {
    for (const [setting, func] of Object.entries(settings)) {
      if (!result[setting]) continue;

      // Check if "func" is a MutationObserver
      if (func?.observe) {
        func?.observe(document.body, {
          childList: true,
          subtree: true,
        });

        console.log(`[Foxford Tools] MutationObserver started for ${setting}`);
      } else {
        func();
      }
    }
  })
  .catch((error) => console.error(`Error getting settings: ${error}`));
