console.log("Script loaded");

document.addEventListener('DOMContentLoaded', async () => {
    const inputs = ['timeSetup', 'homeworkPercentSetup', 'webinarPercentSetup'];
    // определяем состояние чекбоксов 
    inputs.forEach(id => {
        const item = localStorage.getItem(id);
        document.querySelector(`#${id}`).checked = item === null ? false : item === 'true';
    });
    // вытаскиваем данные из манифеста и мета-файла 
    const [manifest, meta, themes] = await Promise.all([
        fetch('../../manifest.json').then(response => response.json()),
        fetch('../../meta.json').then(response => response.json()),
        fetch('../../themes.json').then(response => response.json())
    ]);
    // заполняем элементы страницы данными из манифеста и мета-файла 
    const [versionElement, logoElement, nameElement, commitElement] = 
          ['version', 'logo', 'name', 'commit']
          .map(id => document.getElementById(id));

    versionElement.textContent = manifest.version_name;
    logoElement.src = manifest.action.default_icon;
    nameElement.textContent = manifest.name;
    commitElement.textContent = meta.sha;
    // вешаем обработчик событий на каждый чекбокс
    inputs.forEach(id => {
        addInputListener(id);
    });

    document.getElementById('openHomePage').addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://github.com/itsTPM/foxford-tools' });
    });

    document.getElementById('refreshButton').addEventListener('click', () => {
        chrome.tabs.reload();
        window.close();
    });
    // вешаем обработчик событий на каждую вкладку
    document.querySelector('.tabs').addEventListener('click', function(event) {
        if (event.target.classList.contains('tab-button')) {
            const tabNumber = event.target.id.split('tab')[1].split('-')[0];
            switchTab(tabNumber);
        }
    });
    // обработка событий для вкладок
    function switchTab(tabNumber) {
        document.querySelectorAll('.tab-content, .tab-button').forEach(element => {
            element.classList.remove('active');
        });

        document.getElementById(`tab${tabNumber}-content`).classList.add('active');
        document.getElementById(`tab${tabNumber}-button`).classList.add('active');
    }
    // обработка событий для чекбоксов
    function addInputListener(id) {
        document.querySelector(`#${id}`).addEventListener('input', function (e) {
            document.getElementById('refreshPage').classList.remove('hidden');
            localStorage.setItem(id, e.target.checked);
            chrome.storage.local.set({ [id]: e.target.checked });
        });
    }
    // темы
    const themesIndex = await fetch('../../themes.json').then(response => response.json());
    const themesData = await Promise.all(themesIndex.map(theme => fetch(`../../themes/${theme}`).then(response => response.json())));

    createThemeSelector(themesData);

    const selectedTheme = localStorage.getItem('selectedTheme');
    if (selectedTheme) {
        document.getElementById('theme').value = selectedTheme;
    }
});

function createThemeSelector(themes) {
    const themeSelector = document.getElementById('theme');

    themes.forEach(theme => {
        const option = document.createElement('option');
        option.value = theme.name.toLowerCase();
        option.textContent = theme.name;
        themeSelector.appendChild(option);
    });

    themeSelector.addEventListener('change', function() {
        const theme = this.value;
        localStorage.setItem('selectedTheme', theme);
        chrome.storage.local.set({selectedTheme: theme});
        document.getElementById('refreshPage').classList.remove('hidden');
    });
}