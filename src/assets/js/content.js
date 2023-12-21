const doc = document;
const storage = chrome.storage.local;

let timeSetup,
  homeworkPercentSetup,
  webinarPercentSetup = false;

// Инъекция JS
function injectScript(src) {
  const script = doc.createElement('script');
  script.src = chrome.runtime.getURL(src);
  script.onload = () => script.remove();
  (doc.head || doc.documentElement).append(script);
}

injectScript('assets/js/inject.js');

// получаем тему из localStorage и инжектим ее в head
storage.get(['selectedTheme'], function (result) {
  const selectedTheme = result.selectedTheme;
  if (selectedTheme) {
    const linkElement = doc.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = chrome.runtime.getURL(`themes/${selectedTheme}.css`);
    doc.head.appendChild(linkElement);
  }
});

const conspectsObserver = new MutationObserver(() => {
  const element = doc.querySelector('#wikiThemeContent');
  if (element) {
    setTimeout(() => {
      if (location.href.includes('conspects')) {
        if (!doc.querySelector('.badgeWrapper')) {
          const text = element.textContent;
          const wordCount = [...text.matchAll(/[^\s]+/g)].length;
          const readingTime = Math.round(wordCount / 150);
          const badgeWrapper = createElement('div', { className: 'badgeWrapper' }, element.parentNode, 'prepend');
          createElement(
            'span',
            { textContent: readingTime > 0 ? `~${readingTime} мин. чтения` : `меньше минуты чтения` },
            badgeWrapper
          );
        }
      }
    }, 100);
  }
});

const webinarObserver = new MutationObserver(() => {
  const element = doc.querySelector('.fyhomc');
  setTimeout(() => {
    if (location.href.includes('courses')) {
      if (!doc.querySelector('.webinarPercent')) {
        const majors = doc.getElementsByClassName('major');
        const webinarPercent = +Math.round((majors[2].textContent / majors[3].textContent) * 100);
        if (!webinarPercent) {
          console.log('webinarPercent - NaN');
        }
        createPercentElement(webinarPercent, element, 'before').classList.add('webinarPercent');
      }
    }
  }, 100);
});

const homeworkObserver = new MutationObserver(() => {
  const element = doc.querySelector('#joyrideHomeworkBtn');
  setTimeout(async () => {
    if (location.href.includes('courses')) {
      if (!doc.querySelector('.homeworkPercent')) {
        const loadIndicator = doc.createElement('div');
        loadIndicator.textContent = 'Ждем ответа от API..';
        loadIndicator.classList.add('loadIndicator');
        element.append(loadIndicator);
        let tasksPercent = 0;
        let tasksCount = 0;
        const homeworkLink = element.parentNode.parentNode.parentNode.parentNode.parentNode.href;
        const homeworkId = homeworkLink.match(/[0-9]+/g);
        const apiLink = `https://foxford.ru/api/lessons/${homeworkId}/tasks`;
        const tasksJson = await fetchWithCache(apiLink).catch((err) => {
          throw err;
        });

        if (Array.isArray(tasksJson)) {
          tasksJson.forEach((task) => {
            if (task.status !== 'started' && task.status !== 'not_started') {
              if (task.status === 'solved') {
                tasksPercent += 1;
                tasksCount += 1;
              } else if (task.status === 'partially') {
                tasksPercent += 0.5;
                tasksCount += 1;
              } else if (task.status === 'failed') {
                tasksPercent += 0;
                tasksCount += 1;
              } else if (task.status === 'hinted') {
                tasksPercent += 0;
              } else {
                alert(`Check now: task.status = ${task.status}`);
              }
            }
          });
        }

        const homeworkPercent = Math.round((tasksPercent / tasksCount) * 100);
        createPercentElement(homeworkPercent, element, 'after').classList.add('homeworkPercent');
        loadIndicator.remove();
      }
    }
  }, 100);
});

function createElement(tag, properties, parent, insertMethod) {
  const element = doc.createElement(tag);
  Object.assign(element, properties);
  parent && parent[insertMethod || 'appendChild'](element);
  return element;
}

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

storage.get(['timeSetup', 'homeworkPercentSetup', 'webinarPercentSetup'], function (result) {
  timeSetup = result.timeSetup;
  homeworkPercentSetup = result.homeworkPercentSetup;
  webinarPercentSetup = result.webinarPercentSetup;
  if (timeSetup) {
    conspectsObserver.observe(doc.body, {
      childList: true,
      subtree: true,
    });
  }
  if (homeworkPercentSetup) {
    homeworkObserver.observe(doc.body, {
      childList: true,
      subtree: true,
    });
  }
  if (webinarPercentSetup) {
    webinarObserver.observe(doc.body, {
      childList: true,
      subtree: true,
    });
  }
});
