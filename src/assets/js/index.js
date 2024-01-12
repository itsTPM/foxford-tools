const inputs = ['timeSetup', 'homeworkPercentSetup', 'webinarPercentSetup', 'changeTitles', 'ratingPositionSetup'];
const elements = ['version', 'logo', 'name', 'commit'];

document.addEventListener('DOMContentLoaded', async () => {
  const [manifest, meta] = await fetchExtensionData();
  setCheckboxStates();
  populatePageElements(manifest, meta);
  addEventListeners();
  handleTabs();
  handleThemes();
  addHomePageListener();
  addGitHubListener();
  addRefreshButtonListener();
  // checkForUpdates(meta);
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

function setCheckboxStates() {
  inputs.forEach((id) => {
    const item = localStorage.getItem(id);
    document.querySelector(`#${id}`).checked = item === null ? false : item === 'true';
  });
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

function addEventListeners() {
  inputs.forEach((id) => {
    addInputListener(id);
  });
}

function addInputListener(id) {
  document.querySelector(`#${id}`).addEventListener('input', function (e) {
    document.getElementById('refreshPage').classList.remove('hidden');
    localStorage.setItem(id, e.target.checked);
    chrome.storage.local.set({ [id]: e.target.checked });
  });
}

function handleTabs() {
  document.querySelector('.tabs').addEventListener('click', function (event) {
    if (event.target.classList.contains('tab-button')) {
      const tabNumber = event.target.id.split('tab')[1].split('-')[0];
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

function addHomePageListener() {
  document.getElementById('openHomePage').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://fox.itstpm.tech/' });
  });
}

function addGitHubListener() {
  document.getElementById('openGitHub').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://github.com/itsTPM/foxford-tools' });
  });
}

function addRefreshButtonListener() {
  document.getElementById('refreshButton').addEventListener('click', () => {
    chrome.tabs.reload();
    window.close();
  });
}

async function checkForUpdates(meta) {
  const latestCommitFull = await fetch('https://api.github.com/repos/itsTPM/foxford-tools/git/refs/heads/dev')
    .then((response) => response.json())
    .then((data) => data.object.sha);

  const latestCommit = latestCommitFull.substring(0, 7);

  if (meta.sha !== latestCommit) {
    console.log(`[Foxford Tools] Обнаружено обновление: ${meta.sha} -> ${latestCommit}`);
  }
}
