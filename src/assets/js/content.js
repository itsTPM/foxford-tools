let timeSetup = false;
let homeworkPercentSetup = false;
let webinarPercentSetup = false;
chrome.storage.local.get(['timeSetup', 'homeworkPercentSetup', 'webinarPercentSetup'], function (result) {
    timeSetup = result.timeSetup;
    homeworkPercentSetup = result.homeworkPercentSetup;
    webinarPercentSetup = result.webinarPercentSetup;
    init();
});

// Инъекция JS
function injectScript (src) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(src);
    script.onload = () => script.remove();
    (document.head || document.documentElement).append(script);
}

injectScript('asssets/js/inject.js')

// получаем тему из localStorage и инжектим ее в head
chrome.storage.local.get(['selectedTheme'], function(result) {
    const selectedTheme = result.selectedTheme;
    if (selectedTheme) {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = chrome.runtime.getURL(`themes/${selectedTheme}.css`);
        document.head.appendChild(linkElement);
    }
});
// кэширование запросов для списка задач
async function fetchWithCache(url) {
    const cachedData = localStorage.getItem(url);
    if (cachedData) {
        return JSON.parse(cachedData);
    } else {
        const response = await fetch(url);
        const data = await response.json();
        const allTasksSolved = Array.isArray(data) && data.every(task => task.status === "solved" || task.status === "partially" || task.status === "failed");
        if (allTasksSolved) {
            // Если все задачи решены, кэшируем результат
            const cacheData = data.map(task => ({ status: task.status, id: task.id }));
            localStorage.setItem(url, JSON.stringify(cacheData));
        }
        return data;
    }
}

let currentURL = location.href;
const doc = document;

const observerURL = new MutationObserver(() => {
    if (currentURL != location.href) {
        currentURL = location.href;
        init();
    }
});

observerURL.observe(doc.body, { childList: true, subtree: true });


// прикольный фокус https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
// события
function waitForElm(selector) {
    return new Promise(resolve => {
        const element = doc.querySelector(selector);
        if (element) {
            return resolve(element);
        }

        const observer = new MutationObserver(() => {
            const element = doc.querySelector(selector);
            if (element) {
                observer.disconnect();
                resolve(element);
            }
        });

        observer.observe(doc.body, {
            childList: true,
            subtree: true
        });
    });
}

function createElement(tag, properties, parent, insertMethod) {
    const element = doc.createElement(tag);
    Object.assign(element, properties);
    parent && parent[insertMethod || 'appendChild'](element);
    return element;
}

function createPercentElement(percent, parent, insertMethod) {
    let percentClass;
    let textContent;

    if (isNaN(percent) || percent === 0 || percent === undefined || percent === null) {
        textContent = 'не начато';
        percentClass = 'percent-gray';
    } else {
        textContent = `${percent}%`;
        if (percent <= 40) {
            percentClass = 'percent-red';
        } else if (percent <= 70) {
            percentClass = 'percent-yellow';
        } else {
            percentClass = 'percent-green';
        }
    }

    const percentElement = createElement("span", { textContent, classList: 'percent' }, parent, insertMethod);
    percentElement.classList.add(percentClass);
    return percentElement;
}

async function init() {
    if (timeSetup) {
        if (currentURL.includes('conspects')) {
            waitForElm('#wikiThemeContent').then((elm) => {
                const text = elm.textContent;
                const wordCount = [...text.matchAll(/[^\s]+/g)].length;
                const readingTime = Math.round(wordCount / 150);
                const badgeWrapper = createElement("div", { className: 'badgeWrapper' }, elm.parentNode, 'prepend');
                createElement("span", { textContent: readingTime > 0 ? `~${readingTime} мин. чтения` : `меньше минуты чтения` }, badgeWrapper);
            });
        }
    }
    if (currentURL.includes('courses')) {
        if (webinarPercentSetup) {
            waitForElm('.fyhomc').then((elm) => {
                const majors = doc.getElementsByClassName('major');
                const webinarPercent = +Math.round(majors[2].textContent / majors[3].textContent * 100)
                if (!webinarPercent) {
                    console.log('webinarPercent - NaN')
                }
                createPercentElement(webinarPercent, elm, 'before');
            });
        }
        if (homeworkPercentSetup) {
            const homeworkButton = await waitForElm('#WebinarCourseHomeworkBlock');
            const loadIndicator = doc.createElement("div")
            loadIndicator.textContent = 'Ждем ответа от API..'
            loadIndicator.classList.add('loadIndicator')
            homeworkButton.append(loadIndicator)
            let tasksPercent = 0;
            let tasksCount = 0;
            const homeworkLink = homeworkButton.parentNode.href
            const homeworkId = homeworkLink.match(/[0-9]+/g);
            const apiLink = `https://foxford.ru/api/lessons/${homeworkId}/tasks`
            const tasksJson = await fetchWithCache(apiLink).catch(err => { throw err });
    
            if (Array.isArray(tasksJson)) {
                tasksJson.forEach(task => {
                    if (task.status !== "started" && task.status !== "not_started") {
                        tasksCount += 1;
                        if (task.status === "solved") {
                            tasksPercent += 1;
                        } else if (task.status === "partially") {
                            tasksPercent += 0.5;
                        } else if (task.status === "failed") {
                            tasksPercent += 0;
                        } else {
                            alert(`Check now: task.status = ${task.status}`)
                        }
                    }
                });
            }

            waitForElm('#joyrideHomeworkBtn').then((elm) => {
                const homeworkPercent = Math.round((tasksPercent / tasksCount) * 100)
                createPercentElement(homeworkPercent, elm, 'after');
                loadIndicator.remove();
            });
        }
    }

}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}