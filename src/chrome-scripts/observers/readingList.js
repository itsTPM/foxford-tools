import { Element, getReadingList, fetchConspectJson, updateReadingList, createObserver } from '../modules';
import bookmarkPlus from '../assets/bookmark-plus.svg?url';
import bookmarkMinus from '../assets/bookmark-minus.svg?url';

async function addReadingListButton(element) {
  const readingListButton = new Element({
    tag: 'button',
    properties: { className: 'readingListButton' },
    parent: element.parentNode,
    insertMethod: 'prepend',
  });

  let readingList = await getReadingList();

  const currentUrl = location.href;
  let isAdded = readingList.some((item) => item.url === currentUrl);

  const img = new Element({
    tag: 'img',
    properties: { src: isAdded ? bookmarkMinus : bookmarkPlus },
    parent: readingListButton,
  });

  const toggleList = async () => {
    isAdded = !isAdded;

    const [lessonId, conspectId] = location.href.match(/[0-9]+/g);
    const conspectJson = await fetchConspectJson(lessonId, conspectId);

    const {
      name: title,
      course: { id: courseId, name: courseName },
      discipline: { color: courseColor, image_url: courseImage },
    } = conspectJson;

    const readingListItem = { url: currentUrl, title, courseId, courseName, courseColor, courseImage };

    readingList = await updateReadingList(readingList, isAdded ? readingListItem : currentUrl, isAdded);

    img.src = isAdded ? bookmarkMinus : bookmarkPlus;
  };

  readingListButton.addEventListener('click', toggleList);
}

export default function createReadingListObserver() {
  const observer = createObserver(['#wikiThemeContent', 1, 'conspects', '.readingListButton', addReadingListButton]);

  return observer;
}
