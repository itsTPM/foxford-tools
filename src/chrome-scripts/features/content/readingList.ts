import { createElement, createObserver, makeRequest } from '../../classes';
import bookmarkMinusIcon from '../../assets/bookmark-minus.svg?url';
import bookmarkPlusIcon from '../../assets/bookmark-plus.svg?url';

export function readingList() {
  const observer = createObserver({
    targetElementSelector: '#wikiThemeContent',
    createdElementSelector: '#readingListButton',
    urlPart: 'conspects',
    callback: observerCallback,
  });

  observer.observe();
}

async function observerCallback(element: Element) {
  const conspectUrl = location.href;
  const readingList = await getReadingList();
  let isAdded = readingList.some((item) => item.url === conspectUrl);

  const button = createElement({
    tag: 'button',
    properties: { className: 'readingListButton', id: 'readingListButton' },
    parent: element.parentElement,
    insertMethod: 'prepend',
  });
  const icon = createElement({ tag: 'img', parent: button });
  icon.src = getIconSrc(isAdded);

  button.addEventListener('click', () => void toggleItemInList());

  async function toggleItemInList() {
    const ids = getLessonAndConspectIds(conspectUrl);
    if (!ids) return;

    const conspectData = await makeRequest<ConspectData>({
      url: `lessons/${ids.lessonId}/conspects/${ids.conspectId}`,
    });
    if (!conspectData) return;

    const readingListItem = buildReadingListItem(conspectData, conspectUrl);
    isAdded = !isAdded;
    await updateReadingList(readingListItem, isAdded);
    icon.src = getIconSrc(isAdded);
  }
}

async function getReadingList() {
  const storage = await chrome.storage.sync.get(['readingList']);
  return (storage.readingList as Bookmark[] | undefined) ?? [];
}

function getIconSrc(isAdded: boolean) {
  return isAdded ? bookmarkMinusIcon : bookmarkPlusIcon;
}

function getLessonAndConspectIds(conspectUrl: string) {
  const match = conspectUrl.match(/lessons\/(\d+)\/conspects\/(\d+)/);
  if (!match) return;

  return { lessonId: match[1], conspectId: match[2] };
}

function buildReadingListItem(conspectData: ConspectData, conspectUrl: string): Bookmark {
  const {
    name: title,
    course: { id: courseId, name: courseName },
    discipline: { color: courseColor, image_url: courseImage },
  } = conspectData;

  return { url: conspectUrl, title, courseId, courseName, courseColor, courseImage };
}

async function updateReadingList(item: Bookmark, isAdded: boolean) {
  const currentList = await getReadingList();
  const updatedList = isAdded ? [...currentList, item] : currentList.filter(({ url }) => url !== item.url);

  await chrome.storage.sync.set({ readingList: updatedList });
}
