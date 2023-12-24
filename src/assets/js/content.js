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

// Задержка для MutationObserver, чтобы избежать создания лишних элементов
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

// Объединенная функция для создания MutationObserver
function createObserver(querySelector, delay, urlPart, badgeClass, callback) {
  const debouncedCallback = debounce(callback, delay);
  return new MutationObserver(() => {
    try {
      const element = doc.querySelector(querySelector);
      if (element) {
        if (location.href.includes(urlPart)) {
          if (!doc.querySelector(badgeClass)) {
            debouncedCallback(element);
          }
        }
      }
    } catch (error) {
      console.error(`[Foxford Tools] Ошибка при создании MutationObserver: ${error}`);
    }
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
  const majors = doc.getElementsByClassName('major');
  if (majors.length < 4) return;
  const webinarPercent = +Math.round((majors[2].textContent / majors[3].textContent) * 100);
  createPercentElement(webinarPercent, element, 'before').classList.add('webinarPercent');
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

const conspectsObserver = createObserver('#wikiThemeContent', 50, 'conspects', '.badgeWrapper', calculateReadingTime);
const webinarObserver = createObserver('.fyhomc', 50, 'courses', '.webinarPercent', calculateWebinarProgress);
const homeworkObserver = createObserver(
  '#joyrideHomeworkBtn',
  50,
  'courses',
  '.homeworkPercent',
  calculateHomeworkProgress
);

// Функция создания элемента (не процента)
function createElement(tag, properties, parent, insertMethod) {
  const element = doc.createElement(tag);
  Object.assign(element, properties);
  parent && parent[insertMethod || 'appendChild'](element);
  return element;
}

// Функция создания элемента процента (процент дз, процент вебинара)
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

// Кэширование tasks.json, в которых все задачи решены
async function fetchWithCache(url) {
  const cachedData = localStorage.getItem(url);

  if (cachedData) {
    return JSON.parse(cachedData);
  } else {
    const response = await fetch(url);
    const data = await response.json();
    const allTasksSolved =
      Array.isArray(data) &&
      data.every((task) => task.status === 'solved' || task.status === 'partially' || task.status === 'failed');

    if (allTasksSolved) {
      // Если все задачи решены, кэшируем результат
      const cacheData = data.map((task) => ({ status: task.status, id: task.id }));
      localStorage.setItem(url, JSON.stringify(cacheData));
    }

    return data;
  }
}

// Получение настроек из localStorage и запуск MutationObserver, если пользователь включил соответствующий пункт в настройках
const settings = {
  timeSetup: conspectsObserver,
  homeworkPercentSetup: homeworkObserver,
  webinarPercentSetup: webinarObserver,
};

storage.get(Object.keys(settings), function (result) {
  for (const [setting, observer] of Object.entries(settings)) {
    if (result[setting]) {
      observer.observe(doc.body, {
        childList: true,
        subtree: true,
      });
    }
  }
});
