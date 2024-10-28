const urlTitleMap = {
  'daily-plan': 'План на сегодня',
  'interactive-training': 'Интерактивные задачи',
  'socialization-landing': 'Социализация',
  referrals: 'Реферальная программа',
  attestation_works: 'Аттестация',
  calendar: 'Календарь',
  conspects: 'Теория к уроку',
  rating: 'Рейтинг',
  objectives: 'Задания',
  promos: 'Акции',
  notifications: 'Уведомления',
  checkout: 'Корзина',
  bonuses: 'Фоксики',
  schedule: 'Смена расписания',
  // Далее - слова, которые служат началом других страниц,
  // У них есть и свои страницы, поэтому их нужно проверять последними
  externship: 'Домашняя школа',
  account: 'Настройки аккаунта',
  progress: 'Успеваемость',
  dashboard: 'Программы обучения',
  courses: 'Курс',
  tasks: 'Домашка',
  groups: 'Вебинарка',
};

console.log('[Foxford Tools] Фоновый скрипт запущен');

chrome.storage.local.get(['dynamicTitle'], async function (result) {
  if (!result.dynamicTitle) return;

  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    changeTitle(tabId, changeInfo, tab);
  });

  chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await new Promise((resolve) => {
      chrome.tabs.get(activeInfo.tabId, resolve);
    });

    changeTitle(tab.id, { status: 'complete' }, tab);
  });
});

async function changeTitle(tabId, changeInfo, tab) {
  await new Promise((r) => setTimeout(r, 150));

  if (changeInfo.status === 'complete' && tab.url) {
    if (!tab.url.includes('foxford.ru')) return;

    for (const [urlPart, title] of Object.entries(urlTitleMap)) {
      if (tab.url.includes(urlPart)) {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: functionToInject,
          args: [title],
        });

        break;
      }
    }
  }
}

function functionToInject(title) {
  document.title = title;
}

chrome.runtime.onInstalled.addListener((details) => {
  const previousVersion = details.previousVersion;
  const currentVersion = chrome.runtime.getManifest().version;
  const reason = details.reason;

  if (reason === 'install') return;

  if (previousVersion === currentVersion) return;

  const updateData = {
    previousVersion,
    currentVersion,
  };

  console.log(updateData);
  chrome.storage.local.set({ updateData });

  chrome.action.setBadgeBackgroundColor({ color: '#C63C51' });
  chrome.action.setBadgeTextColor({ color: '#FFFFFF' });
  chrome.action.setBadgeText({ text: '1' });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'clearBadge') {
    chrome.action.setBadgeText({ text: '' });
  }
});
