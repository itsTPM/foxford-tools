import { Element, Observer, Request } from '../classes';
import bookmarkMinusIcon from '../assets/bookmark-minus.svg?url';
import bookmarkPlusIcon from '../assets/bookmark-plus.svg?url';

export default function createReadingListObserver() {
  const observer = new Observer({
    targetElementSelector: '#wikiThemeContent',
    createdElementSelector: '#readingListButton',
    urlPart: 'conspects',
    callback: observerCallback,
  });

  return observer;
}

async function observerCallback(element) {
  const conspectUrl = location.href;
  let readingList = await getReadingList();
  let isAdded = checkIsAdded({ readingList, conspectUrl });

  const button = createReadingListButton(element);
  const icon = createReadingListIcon(button);
  icon.src = getIconSrc(isAdded);

  button.addEventListener('click', toggleItemInList);

  async function toggleItemInList() {
    const [lessonId, conspectId] = getLessonAndConspectIds(conspectUrl);
    const conspectData = await getConspectData({ lessonId, conspectId });

    const readingListItem = createReadingListItem({ conspectData, conspectUrl });

    isAdded = !isAdded;

    readingList = await updateReadingList({ readingListItem, isAdded });

    icon.src = getIconSrc(isAdded);
  }
}

async function getReadingList() {
  const storage = await chrome.storage.sync.get(['readingList']);

  return storage.readingList || [];
}

function checkIsAdded({ readingList, conspectUrl }) {
  return readingList.some((item) => item.url === conspectUrl);
}

function createReadingListButton(element) {
  const readingListButton = new Element({
    tag: 'button',
    properties: { className: 'readingListButton', id: 'readingListButton' },
    parent: element.parentNode,
    insertMethod: 'prepend',
  });

  return readingListButton;
}

function createReadingListIcon(parent) {
  const readingListIcon = new Element({
    tag: 'img',
    parent,
  });

  return readingListIcon;
}

function getIconSrc(isAdded) {
  if (isAdded) {
    return bookmarkMinusIcon;
  }

  return bookmarkPlusIcon;
}

function getLessonAndConspectIds(conspectUrl) {
  return conspectUrl.match(/[0-9]+/g);
}

async function getConspectData({ lessonId, conspectId }) {
  const request = new Request({ url: `lessons/${lessonId}/conspects/${conspectId}` });
  const data = await request.make();

  return data;
}

function createReadingListItem({ conspectData, conspectUrl }) {
  const {
    name: title,
    course: { id: courseId, name: courseName },
    discipline: { color: courseColor, image_url: courseImage },
  } = conspectData;

  return { url: conspectUrl, title, courseId, courseName, courseColor, courseImage };
}

async function updateReadingList({ readingListItem, isAdded }) {
  const currentList = await getReadingList();
  const url = readingListItem.url;
  const updatedList = isAdded ? [...currentList, readingListItem] : currentList.filter((item) => item.url !== url);
  await setReadingList(updatedList);
  return updatedList;
}

async function setReadingList(readingList) {
  await chrome.storage.sync.set({ readingList });
}
