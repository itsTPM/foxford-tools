const state = {
  mode: 'easy', // 'easy', 'extended'
  browser: 'other', // 'chrome', 'firefox', 'edge', 'safari', 'opera', 'yandex', 'other'
  device: 'other', // 'desktop', 'mobile', 'other'
};

const browsers = {
  chrome: {
    displayName: 'Chrome',
    actionClass: 'action-chrome',
    link: 'https://update.itstpm.tech/?browser=chrome,
  },
  firefox: {
    displayName: 'Firefox',
    actionClass: 'action-firefox',
    link: 'https://update.itstpm.tech/?browser=firefox',
  },
  edge: {
    displayName: 'Edge',
    actionClass: 'action-edge',
    link: 'https://update.itstpm.tech/?browser=edge',
  },
  opera: {
    displayName: 'Opera',
    actionClass: 'action-opera',
    link: 'https://update.itstpm.tech/?browser=opera',
  },
  yandex: {
    displayName: 'Yandex',
    actionClass: 'action-yandex',
    link: 'https://update.itstpm.tech/?browser=firefox',
  },
};

const changeModeBtn = document.querySelector('#changeModeBtn');
const actionsBrowser = document.querySelector('.actions__browser');
const changeModeTitle = document.querySelector('#changeModeTitle');

changeModeBtn.addEventListener('click', switchMode);

function switchMode() {
  state.mode = state.mode === 'extended' ? 'easy' : 'extended';
  state.mode === 'extended' ? showExtended() : showEasy();
}

function detectBrowser() {
  const userAgent = navigator.userAgent.toLowerCase();
  const browsers = {
    opera: /opr/.test(userAgent) || /opera/.test(userAgent),
    edge: /edg/.test(userAgent) || /edge/.test(userAgent),
    yandex: /yabrowser/.test(userAgent),
    firefox: /firefox/.test(userAgent),
    chrome: /chrome/.test(userAgent),
    safari: /safari/.test(userAgent) && /mac os x/.test(userAgent),
  };

  for (const key in browsers) {
    if (browsers[key]) {
      state.browser = key;
      break;
    }
  }
}

function detectDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  const devices = {
    mobile: /mobile/.test(userAgent) || /tablet/.test(userAgent),
    desktop: !/mobile/.test(userAgent) && !/tablet/.test(userAgent),
    other: 'false',
  };

  for (const key in devices) {
    if (devices[key]) {
      state.device = key;
      break;
    }
  }
}

function createElement(browser) {
  const newDiv = document.createElement('div');
  newDiv.className = 'actions__element-wrapper';

  const newLink = document.createElement('a');
  newLink.href = browser.link;
  newLink.target = '_blank';
  newLink.className = `actions__element ${browser.actionClass}`;

  const newSpanSubtitle = document.createElement('span');
  newSpanSubtitle.className = 'action-subtitle';
  newSpanSubtitle.textContent = 'установить для';

  const newSpanName = document.createElement('span');
  newSpanName.className = 'action-name';
  newSpanName.textContent = browser.displayName;

  newLink.appendChild(newSpanSubtitle);
  newLink.appendChild(newSpanName);
  newDiv.appendChild(newLink);

  return newDiv;
}

function createNotSupportedElement() {
  const newDiv = document.createElement('div');
  newDiv.className = 'actions__element-wrapper';

  const newLink = document.createElement('a');
  newLink.className = `actions__element action-not-supported`;

  const newSpanSubtitle = document.createElement('span');
  newSpanSubtitle.className = 'action-subtitle';
  newSpanSubtitle.textContent = 'не поддерживается';

  const newSpanName = document.createElement('span');
  newSpanName.className = 'action-name';
  newSpanName.textContent = 'ваш браузер';

  newLink.appendChild(newSpanSubtitle);
  newLink.appendChild(newSpanName);
  newDiv.appendChild(newLink);

  return newDiv;
}

function showEasy() {
  actionsBrowser.innerHTML = '';
  const newElement = browsers[state.browser] ? createElement(browsers[state.browser]) : createNotSupportedElement();
  actionsBrowser.prepend(newElement);
  changeModeBtn.textContent = 'сюда';
  changeModeTitle.textContent = 'другой браузер? нажмите';
}

function showExtended() {
  actionsBrowser.innerHTML = '';
  for (const key in browsers) {
    const newElement = createElement(browsers[key]);
    actionsBrowser.prepend(newElement);
  }
  changeModeBtn.textContent = 'простой режим';
  changeModeTitle.textContent = 'вернуться в';
}

detectBrowser();
detectDevice();
showEasy();
