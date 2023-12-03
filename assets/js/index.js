console.log("Script loaded");

window.addEventListener('load', async () => {
    const timeSetup = localStorage.getItem('timeSetup');
    const homeworkPercentSetup = localStorage.getItem('homeworkPercentSetup');
    const webinarPercentSetup = localStorage.getItem('webinarPercentSetup');

    document.querySelector('#timeSetup').checked = timeSetup === null ? false : timeSetup === 'true';
    document.querySelector('#homeworkPercentSetup').checked = homeworkPercentSetup === null ? false : homeworkPercentSetup === 'true';
    document.querySelector('#webinarPercentSetup').checked = webinarPercentSetup === null ? false : webinarPercentSetup === 'true';

    const response = await fetch('../../manifest.json');
    const manifest = await response.json();

    const versionElement = document.getElementById("version");
    const logoElement = document.getElementById("logo");

    versionElement.textContent = manifest.version_name;
    logoElement.src = manifest.action.default_icon;

    const inputs = ['timeSetup', 'homeworkPercentSetup', 'webinarPercentSetup'];

    inputs.forEach(id => {
        document.querySelector(`#${id}`).addEventListener('input', function (e) {
            document.getElementById('refreshPage').classList.remove('hidden');
            localStorage.setItem(id, e.target.checked);
            chrome.storage.local.set({ [id]: e.target.checked });
        });
    });

    document.getElementById('openGitHub').addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://github.com/itsTPM/foxford-tools' });
    });

    document.getElementById('refreshButton').addEventListener('click', () => {
        chrome.tabs.reload();
        window.close();
    });
});