const urlTitleMap = {
  'daily-plan': 'План на сегодня',
  calendar: 'Календарь',
  progress: 'Успеваемость',
  conspects: 'Теория к уроку',
  tasks: 'Домашка',
  groups: 'Вебинарка',
};

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  await new Promise((r) => setTimeout(r, 100));
  if (changeInfo.status === 'complete') {
    console.log(`Tab updated: ${tab.url}`);
    for (const [urlPart, title] of Object.entries(urlTitleMap)) {
      if (tab.url.includes(urlPart)) {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          function: functionToInject,
          args: [title],
        });
        break;
      }
    }
  }
});

function functionToInject(title) {
  console.log('Title changed');
  document.title = title;
}
