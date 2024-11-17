import './assets/content.css';
import * as observers from './observers';
import { getSettings, injectCss, logger } from './modules';
import fixYellowBlocksCss from './assets/fixYellowBlocks.css?inline';

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

async function initializeSettings() {
  try {
    const result = await getSettings(Object.keys(settings));
    for (const [setting, func] of Object.entries(settings)) {
      if (!result[setting]) continue;

      // Check if "func" is a MutationObserver
      if (func?.observe) {
        func.observe(document.body, {
          childList: true,
          subtree: true,
        });

        logger.info(`MutationObserver started for ${setting}`);
      } else {
        func();
      }
    }
  } catch (error) {
    logger.error(error);
  }
}

initializeSettings();
