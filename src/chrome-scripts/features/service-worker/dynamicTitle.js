const urlTitleMap = {
  'daily-plan': 'План на сегодня',
  'interactive-training': 'Интерактивные задачи',
  'digital-portfolio': 'Цифровое портфолио',
  'trial-exams': 'Пробники',
  socialization: 'Социализация',
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

export default function useDynamicTitle() {
  listenForTabUpdate();
  listenForTabActivation();
}

function listenForTabUpdate() {
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    changeTabTitle({ tab, tabId, changeInfo });
  });
}

function listenForTabActivation() {
  chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const { tabId } = activeInfo;
    const tab = await chrome.tabs.get(tabId);

    changeTabTitle({
      tab,
      tabId,
      changeInfo: { status: 'complete' },
    });
  });
}

async function changeTabTitle({ tab, tabId, changeInfo }) {
  await new Promise((r) => setTimeout(r, 150)); // 🤩

  if (checkIsShouldReturn({ tab, changeInfo })) {
    return;
  }

  const title = getDynamicTitleByUrl(tab.url);

  if (!title) {
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId },
    func: (title) => {
      document.title = title;
    },
    args: [title],
  });
}

function checkIsShouldReturn({ tab, changeInfo }) {
  const falsyCases = [!tab.url?.includes('foxford.ru'), changeInfo.status !== 'complete'];

  return falsyCases.some(Boolean);
}

function getDynamicTitleByUrl(url) {
  for (const [urlPart, title] of Object.entries(urlTitleMap)) {
    if (url.includes(urlPart)) {
      return title;
    }
  }
}
