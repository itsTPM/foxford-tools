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

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  chrome.storage.local.get(['changeTitles'], async function (result) {
    if (result.changeTitles == true) {
      await new Promise((r) => setTimeout(r, 100));
      if (changeInfo.status === 'complete') {
        console.log(`[Foxford Tools] Вкладка обновлена: ${tab.url}`);
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
  });
});

function functionToInject(title) {
  console.log('[Foxford Tools] Заголовок изменен');
  document.title = title;
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'Сохранить презентацию',
    contexts: ['link'],
    id: 'link',
  });
});
