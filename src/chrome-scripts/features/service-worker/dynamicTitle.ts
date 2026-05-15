import { logger } from '@/chrome-scripts/utils';

const urlTitleMap: Record<string, string> = {
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

export function dynamicTitle() {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    void changeTabTitle({ tab, tabId, changeInfo });
  });

  chrome.tabs.onActivated.addListener(({ tabId }) => {
    void (async () => {
      const tab = await chrome.tabs.get(tabId);
      await changeTabTitle({ tab, tabId, changeInfo: { status: 'complete' } });
    })();
  });
}

async function changeTabTitle({
  tab,
  tabId,
  changeInfo,
}: {
  tab: chrome.tabs.Tab;
  tabId: number;
  changeInfo: chrome.tabs.OnUpdatedInfo;
}) {
  await new Promise((r) => setTimeout(r, 150)); // 🤩

  if (!tab.url?.includes('foxford.ru') || changeInfo.status !== 'complete') return;

  const title = getDynamicTitleByUrl(tab.url);
  if (!title) {
    logger.warn(`No suitable title for url ${tab.url}`);
    return;
  }

  void chrome.scripting.executeScript({
    target: { tabId },
    func: (newTitle: string) => {
      document.title = newTitle;
    },
    args: [title],
  });
}

export function getDynamicTitleByUrl(url: string) {
  for (const [urlPart, title] of Object.entries(urlTitleMap)) {
    if (url.includes(urlPart)) {
      return title;
    }
  }
}
