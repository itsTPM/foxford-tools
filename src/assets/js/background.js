chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'injectCSS' && request.theme) {
        const cssCode = `let link = document.createElement('link');
                         link.rel = 'stylesheet';
                         link.href = '${chrome.runtime.getURL(`themes/${request.theme}.css`)}';
                         document.head.appendChild(link);`;

        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: new Function(cssCode)
            });
        });
    }
});