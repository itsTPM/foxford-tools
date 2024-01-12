const doc = document;
const storage = chrome.storage.local;

// Инъекция JS
function injectScript(src) {
  const script = doc.createElement('script');
  script.src = chrome.runtime.getURL(src);
  script.onload = () => script.remove();
  (doc.head || doc.documentElement).append(script);
}

injectScript('assets/js/inject.js');

// Получение темы из localStorage и инъекция в head
storage.get(['selectedTheme'], function (result) {
  const selectedTheme = result.selectedTheme;
  if (selectedTheme) {
    const linkElement = doc.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = chrome.runtime.getURL(`themes/${selectedTheme}.css`);
    doc.head.appendChild(linkElement);
  }
});

/**
 * Создает функцию с задержкой, которая откладывает вызов предоставленной функции до тех пор, пока не пройдет указанное количество миллисекунд после последнего вызова.
 *
 * @param {Function} func - Функция для задержки.
 * @param {number} wait - Количество миллисекунд для задержки.
 * @returns {Function} - Функция с задержкой.
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Создает MutationObserver, который отслеживает изменения в DOM и вызывает функцию обратного вызова, когда выполняются указанные условия.
 *
 * @param {string} querySelector - CSS-селектор для элемента, который нужно наблюдать.
 * @param {number} delay - Задержка в миллисекундах перед вызовом функции обратного вызова.
 * @param {string} urlPart - Часть URL, которая должна присутствовать в текущем URL, чтобы вызвать функцию обратного вызова.
 * @param {string} badgeClass - CSS-селектор класса для элемента значка.
 * @param {Function} callback - Функция обратного вызова, которая будет выполнена, когда выполняются указанные условия.
 * @returns {MutationObserver} - Созданный экземпляр MutationObserver.
 */

function createObserver(querySelector, delay, urlPart, badgeClass, callback) {
  console.log(badgeClass);
  let isAdded = false;
  const debouncedCallback = debounce(callback, delay);
  return new MutationObserver(() => {
    requestAnimationFrame(() => {
      try {
        const element = doc.querySelector(querySelector);
        if (element) {
          if (!isAdded && location.href.includes(urlPart)) {
            if (!doc.querySelector(badgeClass)) {
              debouncedCallback(element);
              isAdded = true;
            }
          }
        } else {
          isAdded = false;
        }
      } catch (error) {
        console.error(`[Foxford Tools] Ошибка при создании MutationObserver: ${error}`);
      }
    });
  });
}

const calculateReadingTime = (element) => {
  const text = element.textContent;
  const wordCount = [...text.matchAll(/[^\s]+/g)].length;
  const readingTime = Math.round(wordCount / 150);
  const badgeWrapper = createElement('div', { className: 'badgeWrapper' }, element.parentNode, 'prepend');
  createElement(
    'span',
    { textContent: readingTime > 0 ? `~${readingTime} мин. чтения` : `меньше минуты чтения` },
    badgeWrapper
  );
};

const calculateWebinarProgress = (element) => {
  console.log('Observer changed');
  const majors = doc.getElementsByClassName('major');
  if (majors.length < 2) return;
  const webinarPercent = +Math.round((majors[2].textContent / majors[3].textContent) * 100);
  createPercentElement(webinarPercent, element.lastChild.lastChild, 'before').classList.add('webinarPercent');
};

const calculateHomeworkProgress = async (element) => {
  let tasksPercent = 0;
  let tasksCount = 0;
  // следующие 3 строчки - выцепляем id домашки из href кнопки, потом добавляем его в ссылку на api
  const homeworkLink = element.parentNode.parentNode.parentNode.parentNode.parentNode.href; // это надо будет заменить
  const homeworkId = homeworkLink.match(/[0-9]+/g);
  const apiLink = `https://foxford.ru/api/lessons/${homeworkId}/tasks`;

  const tasksJson = await fetchWithCache(apiLink).catch((err) => {
    throw err;
  });

  if (Array.isArray(tasksJson)) {
    tasksJson.forEach((task) => {
      switch (task.status) {
        case 'solved':
          tasksPercent += 1;
          tasksCount += 1;
          break;
        case 'partially':
          tasksPercent += 0.5;
          tasksCount += 1;
          break;
        case 'failed':
          tasksPercent += 0;
          tasksCount += 1;
          break;
        case 'hinted':
          tasksPercent += 0;
          break;
        case 'started':
        case 'not_started':
          break;
        default:
          alert(`Check now: task.status = ${task.status}`);
      }
    });
  }

  const homeworkPercent = Math.round((tasksPercent / tasksCount) * 100);
  createPercentElement(homeworkPercent, element, 'after').classList.add('homeworkPercent');
};

const showRatingPosition = async (element) => {
  const courseId = location.href.match(/[0-9]+/g)[0];
  const apiLink = `https://foxford.ru/api/courses/${courseId}/rating`;

  const lastFetchTimeKey = `lastFetchTime_${courseId}`;
  const ratingPositionKey = `ratingPosition_${courseId}`;

  const lastFetchTime = localStorage.getItem(lastFetchTimeKey);
  const oneHour = 60 * 60 * 1000;

  let ratingPosition = localStorage.getItem(ratingPositionKey);
  let minutesUntilUpdate = 60;

  if (!lastFetchTime || new Date() - new Date(lastFetchTime) >= oneHour) {
    try {
      const ratingJson = await (await fetch(apiLink)).json();
      if (Array.isArray(ratingJson)) {
        ratingPosition = ratingJson[0].position;
        localStorage.setItem(ratingPositionKey, ratingPosition);
        localStorage.setItem(lastFetchTimeKey, new Date().toISOString());
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    minutesUntilUpdate = Math.round((oneHour - (new Date() - new Date(lastFetchTime))) / 60000);
  }

  let ratingWrapper = document.querySelector('.ratingWrapper');

  if (!ratingWrapper) {
    ratingWrapper = createElement('div', { className: 'ratingWrapper' }, element, 'before');
  }

  const ratingText = createElement('span', { textContent: 'Место в рейтинге ', classList: 'ratingText' });
  const ratingTime = createElement(
    'span',
    {
      textContent: `обновится через ${minutesUntilUpdate} мин`,
      classList: 'ratingTime',
    },
    ratingText
  );
  const ratingElement = createElement('span', { textContent: `#${ratingPosition}`, classList: 'ratingPosition' });

  ratingText.appendChild(ratingTime);
  ratingWrapper.appendChild(ratingText);
  ratingWrapper.appendChild(ratingElement);
};

const ratingObserver = createObserver('.gXSvvj', 1, 'courses', '.ratingWrapper', showRatingPosition);
const conspectsObserver = createObserver('#wikiThemeContent', 1, 'conspects', '.badgeWrapper', calculateReadingTime);
const webinarObserver = createObserver('.bKdhIU', 1, 'courses', '.webinarPercent', calculateWebinarProgress);
const homeworkObserver = createObserver(
  '#joyrideHomeworkBtn',
  1,
  'courses',
  '.homeworkPercent',
  calculateHomeworkProgress
);

/**
 * Создает и возвращает новый HTML-элемент с указанным тегом, свойствами и родительским элементом.
 * @param {string} tag - Имя HTML-тега создаваемого элемента.
 * @param {Object} properties - Объект, содержащий свойства, которые нужно присвоить элементу.
 * @param {HTMLElement} parent - Родительский элемент, к которому будет добавлен новый элемент.
 * @param {string} [insertMethod='appendChild'] - Метод, используемый для вставки нового элемента в родительский элемент.
 * @returns {HTMLElement} - Созданный HTML-элемент.
 */
function createElement(tag, properties, parent, insertMethod) {
  const element = doc.createElement(tag);
  Object.assign(element, properties);
  parent && parent[insertMethod || 'appendChild'](element);
  return element;
}

/**
 * Создает элемент процента на основе заданного значения процента.
 * Если значение процента является NaN, 0, undefined или null, элемент будет отображать 'не начато'.
 * Если значение процента меньше или равно 40, элемент будет иметь класс 'percent-red'.
 * Если значение процента меньше или равно 70, элемент будет иметь класс 'percent-yellow'.
 * Если значение процента больше 70, элемент будет иметь класс 'percent-green'.
 *
 * @param {number} percent - Значение процента, которое будет отображаться
 * @param {HTMLElement} parent - Родительский элемент, к которому будет добавлен элемент процента
 * @param {string} insertMethod - Метод вставки элемента процента в родительский элемент ('append', 'prepend', 'before', 'after')
 * @returns {HTMLElement} - Созданный элемент процента
 */
function createPercentElement(percent, parent, insertMethod) {
  let percentClass;
  let textContent;

  if (isNaN(percent) || percent === 0 || percent === undefined || percent === null) {
    textContent = 'не начато';
    percentClass = 'percent-gray';
  } else {
    textContent = `${percent}%`;
    if (percent <= 40) {
      percentClass = 'percent-red';
    } else if (percent <= 70) {
      percentClass = 'percent-yellow';
    } else {
      percentClass = 'percent-green';
    }
  }

  const percentElement = createElement('span', { textContent, classList: 'percent' }, parent, insertMethod);
  percentElement.classList.add(percentClass);
  return percentElement;
}

/**
 * Получает данные из указанного URL с поддержкой кэширования.
 * Если данные уже находятся в кэше, возвращает кэшированные данные.
 * Если все задачи в полученных данных решены, кэширует результат.
 * @param {string} url - URL для получения данных.
 * @returns {Promise<any>} - Промис, который разрешается с полученными данными.
 */
async function fetchWithCache(url) {
  try {
    const cachedData = localStorage.getItem(url);

    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      const response = await fetch(url);
      const data = await response.json();
      const allTasksSolved =
        Array.isArray(data) &&
        data.every(({ status }) => status === 'solved' || status === 'partially' || status === 'failed');

      if (allTasksSolved) {
        // Если все задачи решены, кэшируем результат
        const cacheData = data.map(({ status, id }) => ({ status, id }));
        localStorage.setItem(url, JSON.stringify(cacheData));
      }

      return data;
    }
  } catch (error) {
    console.error(`Failed to fetch or parse data: ${error}`);
    return null;
  }
}

// Получение настроек из localStorage и запуск MutationObserver, если пользователь включил соответствующий пункт в настройках
const settings = {
  timeSetup: conspectsObserver,
  homeworkPercentSetup: homeworkObserver,
  webinarPercentSetup: webinarObserver,
  ratingPositionSetup: ratingObserver,
};

storage.get(Object.keys(settings), function (result) {
  for (const [setting, observer] of Object.entries(settings)) {
    if (!result[setting]) {
      continue;
    }

    observer.observe(doc.body, {
      childList: true,
      subtree: true,
    });
  }
});
