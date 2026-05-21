import { browser } from 'wxt/browser';
import { createElement, createObserver } from '@/utils/dom';
import { logger, makeRequest } from '@/utils';
import bookmarkMinusIcon from './icons/bookmark-minus.svg?url';
import bookmarkPlusIcon from './icons/bookmark-plus.svg?url';

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
    if (isAdded) {
      isAdded = false;
      await removeFromReadingList(conspectUrl);
    } else {
      const ids = getLessonAndConspectIds(conspectUrl);
      if (!ids) {
        alert('Не удалось получить данные о конспекте :(');
        return;
      }

      const conspectData = await makeRequest<ConspectData>({
        url: `lessons/${ids.lessonId}/conspects/${ids.conspectId}`,
      });
      if (!conspectData) {
        alert('Не удалось получить данные о конспекте :(');
        return;
      }

      isAdded = true;
      await addToReadingList(buildReadingListItem(conspectData, conspectUrl));
    }
    icon.src = getIconSrc(isAdded);
  }
}

async function getReadingList() {
  const storage = await browser.storage.sync.get(['readingList']);
  return (storage.readingList as Bookmark[] | undefined) ?? [];
}

function getIconSrc(isAdded: boolean) {
  return isAdded ? bookmarkMinusIcon : bookmarkPlusIcon;
}

function getLessonAndConspectIds(conspectUrl: string) {
  const match = conspectUrl.match(/lessons\/(\d+)\/conspects\/(\d+)/);
  if (!match) {
    logger.error('Lesson and conspect ids match is null');
    return;
  }

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

async function addToReadingList(item: Bookmark) {
  const currentList = await getReadingList();
  await browser.storage.sync.set({ readingList: [...currentList, item] });
}

async function removeFromReadingList(url: string) {
  const currentList = await getReadingList();
  await browser.storage.sync.set({ readingList: currentList.filter((item) => item.url !== url) });
}
