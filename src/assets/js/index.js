console.log("Script loaded");

window.addEventListener('load', async () => {
    const timeSetup = localStorage.getItem('timeSetup');
    const homeworkPercentSetup = localStorage.getItem('homeworkPercentSetup');
    const webinarPercentSetup = localStorage.getItem('webinarPercentSetup');

    document.querySelector('#timeSetup').checked = timeSetup === null ? false : timeSetup === 'true';
    document.querySelector('#homeworkPercentSetup').checked = homeworkPercentSetup === null ? false : homeworkPercentSetup === 'true';
    document.querySelector('#webinarPercentSetup').checked = webinarPercentSetup === null ? false : webinarPercentSetup === 'true';

    const manifest = await (await fetch('../../manifest.json')).json();
    const meta = await (await fetch('../../meta.json')).json();

    const versionElement = document.getElementById("version");
    const logoElement = document.getElementById("logo");
    const nameElement = document.getElementById("name");
    const commitElement = document.getElementById("commit");

    versionElement.textContent = manifest.version_name;
    logoElement.src = manifest.action.default_icon;
    nameElement.textContent = manifest.name;
    commitElement.textContent = meta.sha;

    const inputs = ['timeSetup', 'homeworkPercentSetup', 'webinarPercentSetup'];

    inputs.forEach(id => {
        document.querySelector(`#${id}`).addEventListener('input', function (e) {
            document.getElementById('refreshPage').classList.remove('hidden');
            localStorage.setItem(id, e.target.checked);
            chrome.storage.local.set({ [id]: e.target.checked });
        });
    });

    document.getElementById('openHomePage').addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://github.com/itsTPM/foxford-tools' });
    });

    document.getElementById('refreshButton').addEventListener('click', () => {
        chrome.tabs.reload();
        window.close();
    });

    document.querySelector('.tabs').addEventListener('click', function(event) {
        if (event.target.classList.contains('tab-button')) {
            const tabNumber = event.target.id.split('tab')[1].split('-')[0];
            switchTab(tabNumber);
        }
    });
    
    function switchTab(tabNumber) {
        document.querySelectorAll('.tab-content, .tab-button').forEach(element => {
            element.classList.remove('active');
        });
    
        document.getElementById(`tab${tabNumber}-content`).classList.add('active');
        document.getElementById(`tab${tabNumber}-button`).classList.add('active');
    }
});