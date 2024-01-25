const elements = ['version', 'logo', 'name', 'commit'];

document.addEventListener('DOMContentLoaded', async () => {
  const settingGroups = await fetch('assets/json/settingGroups.json').then((response) => response.json());
  const links = await fetch('assets/json/links.json').then((response) => response.json());
  const [manifest, meta] = await fetchExtensionData();
  populatePageElements(manifest, meta);
  createSettingsGroups(settingGroups);
  createLinks(links);
  checkForUpdates(manifest);
  addRefreshButtonListener();
  handleTabs();
  handleThemes();
  handleBugPage();
  handleReadingList();
});

async function fetchExtensionData() {
  const manifest = await fetch('../../manifest.json').then((response) => response.json());
  let meta;
  try {
    meta = await fetch('../../meta.json').then((response) => response.json());
  } catch (e) {
    console.log(`[Foxford Tools] Ошибка при подгрузке meta.json: ${e}`);
    meta = { sha: '0000000' };
  }
  return [manifest, meta];
}

function populatePageElements(manifest, meta) {
  const elementProperties = {
    version: manifest.version_name,
    logo: manifest.action.default_icon,
    name: manifest.name,
    commit: meta.sha,
  };

  elements.forEach((id) => {
    const element = document.getElementById(id);
    if (id === 'logo') {
      element.src = elementProperties[id];
    } else {
      element.textContent = elementProperties[id];
    }
  });
}

function createSettingsGroups(settingGroups) {
  const checkboxesContainer = document.querySelector('.checkboxes');

  settingGroups.forEach((group) => {
    const checkboxGroup = document.createElement('div');
    checkboxGroup.classList.add('checkbox-group');
    group.settings.forEach((setting) => {
      const checkbox = document.createElement('div');
      checkbox.classList.add('checkbox');
      checkbox.innerHTML = `
        <input type="checkbox" id="${setting.id}" />
        <label for="${setting.id}">${setting.title}</label>
      `;
      checkbox.addEventListener('click', () => {
        const input = checkbox.querySelector('input');
        input.checked = !input.checked;
        localStorage.setItem(setting.id, input.checked);
        chrome.storage.local.set({ [setting.id]: input.checked });

        document.getElementById('refreshPage').classList.remove('hidden');
      });

      const item = localStorage.getItem(setting.id);
      checkbox.querySelector('input').checked = item === null ? false : item === 'true';

      checkboxGroup.appendChild(checkbox);
    });
    checkboxesContainer.appendChild(checkboxGroup);
  });
}

function createLinks(links) {
  const linksContainer = document.getElementById('links');
  links.forEach((link) => {
    const linkElement = document.createElement('a');
    linkElement.classList.add('link');
    linkElement.href = '#';
    linkElement.id = link.id;
    linkElement.innerHTML = `<img src="./assets/images/${link.icon}">`;
    linksContainer.appendChild(linkElement);
    linkElement.addEventListener('click', () => {
      chrome.tabs.create({ url: link.url });
    });
  });
}

function addRefreshButtonListener() {
  document.getElementById('refreshButton').addEventListener('click', () => {
    chrome.tabs.reload();
    window.close();
  });
}

function handleTabs() {
  document.querySelector('.tabs').addEventListener('click', function (event) {
    if (event.target.classList.contains('tab-button')) {
      const tabNumber = event.target.id.split('tab')[1].split('-')[0];
      switchTab(tabNumber);
    } else if (event.target.parentNode.classList.contains('tab-button')) {
      const tabNumber = event.target.parentNode.id.split('tab')[1].split('-')[0];
      switchTab(tabNumber);
    }
  });
}

function switchTab(tabNumber) {
  document.querySelectorAll('.tab-content, .tab-button').forEach((element) => {
    element.classList.remove('active');
  });

  document.getElementById(`tab${tabNumber}-content`).classList.add('active');
  document.getElementById(`tab${tabNumber}-button`).classList.add('active');
}

async function handleThemes() {
  let themesIndex;
  try {
    themesIndex = await fetch('../../themes.json').then((response) => response.json());
  } catch (e) {
    console.log(`[Foxford Tools] Ошибка при подгрузке themes.json: ${e}`);
    themesIndex = [];
  }

  const themesData = await Promise.all(
    themesIndex.map((theme) => fetch(`../../themes/${theme}`).then((response) => response.json()))
  );

  createThemeSelector(themesData);

  const selectedTheme = localStorage.getItem('selectedTheme');
  if (selectedTheme) {
    document.getElementById('theme').value = selectedTheme;
    const themeInfo = document.querySelector('.theme-info');
    themeInfo.classList.remove('hidden');
    const themeName = document.getElementById('themeName');
    const themeAuthor = document.getElementById('themeAuthor');
    const themeVersion = document.getElementById('themeVersion');
    const theme = themesData.find((theme) => theme.name.toLowerCase() === selectedTheme);
    themeName.textContent = theme.name;
    themeAuthor.textContent = theme.author;
    themeVersion.textContent = theme.version;
  }
}

async function handleBugPage() {
  const reportButton = document.getElementById('reportBug');

  reportButton.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://github.com/itsTPM/foxford-tools/issues' });
  });
}

async function getReadingList() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['readingList'], (result) => {
      resolve(result['readingList']);
    });
  });
}

async function setReadingList(list) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ readingList: list }, resolve);
  });
}

function createReadingListItem(item, list, readingListContainer) {
  const readingListItem = document.createElement('div');
  readingListItem.classList.add('reading-list-item');
  readingListItem.style = `border: 1px solid #${item.courseColor}`;

  const textDiv = document.createElement('div');
  textDiv.classList.add('reading-list-item__text');

  const titleSpan = document.createElement('span');
  titleSpan.classList.add('reading-list-item__title');
  titleSpan.textContent = item.title;

  const courseSpan = document.createElement('span');
  courseSpan.classList.add('reading-list-item__course');
  courseSpan.textContent = item.courseName;

  textDiv.append(titleSpan, courseSpan);

  const img = document.createElement('img');
  img.src = item.courseImage;

  const closeButton = document.createElement('span');
  closeButton.classList.add('reading-list-item__close');
  closeButton.addEventListener('click', async (event) => {
    event.stopPropagation();
    const updatedList = list.filter((i) => i.url !== item.url);
    await setReadingList(updatedList);
    readingListItem.remove();
    if (updatedList.length === 0) {
      const emptyList = document.createElement('div');
      emptyList.classList.add('empty-list');
      emptyList.textContent = 'Список пуст :(';
      readingListContainer.appendChild(emptyList);
    }
  });

  readingListItem.append(textDiv, img, closeButton);
  readingListItem.addEventListener('click', () => {
    chrome.tabs.create({ url: item.url });
  });

  return readingListItem;
}

async function handleReadingList() {
  const list = await getReadingList();
  const readingListContainer = document.getElementById('readingList');

  if (!list || list.length === 0) {
    const emptyList = document.createElement('div');
    emptyList.classList.add('empty-list');
    emptyList.textContent = 'Список пуст :(';
    readingListContainer.appendChild(emptyList);
    return;
  }

  list.forEach((item) => {
    const readingListItem = createReadingListItem(item, list, readingListContainer);
    readingListContainer.appendChild(readingListItem);
  });
}

function createThemeSelector(themes) {
  const themeSelector = document.getElementById('theme');

  themes.forEach((theme) => {
    if (theme.active === false) return;
    const option = document.createElement('option');
    option.value = theme.name.toLowerCase();
    option.textContent = theme.name;
    themeSelector.appendChild(option);
  });

  themeSelector.addEventListener('change', function () {
    const theme = this.value;
    localStorage.setItem('selectedTheme', theme);
    chrome.storage.local.set({ selectedTheme: theme });
    document.getElementById('refreshPage').classList.remove('hidden');

    const themeInfo = document.querySelector('.theme-info');
    const themeName = document.getElementById('themeName');
    const themeAuthor = document.getElementById('themeAuthor');
    const themeVersion = document.getElementById('themeVersion');

    if (theme) {
      const selectedTheme = themes.find((t) => t.name.toLowerCase() === theme);
      themeName.textContent = selectedTheme.name;
      themeAuthor.textContent = selectedTheme.author;
      themeVersion.textContent = selectedTheme.version;
      themeInfo.classList.remove('hidden');
    } else {
      themeInfo.classList.add('hidden');
    }
  });
}

async function checkForUpdates(manifest) {
  const versionElement = document.getElementById('version');
  const servingData = await fetch('https://update.itstpm.tech/status').then((response) => response.json());

  if (servingData.version == manifest.version) {
    versionElement.classList.add('version-actual');
  } else if (servingData.version > manifest.version) {
    versionElement.classList.add('version-outdated');
    versionElement.style.cursor = 'pointer';
    versionElement.addEventListener('click', () => {
      chrome.tabs.create({ url: 'https://fox.itstpm.tech' });
    });
  } else {
    versionElement.classList.add('version-beta');
  }
}
