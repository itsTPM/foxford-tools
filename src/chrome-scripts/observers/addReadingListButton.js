import createElement from '../modules/createElement.js';
import getReadingList from '../modules/getReadingList.js';
import fetchConspectJson from '../modules/fetchConspectJson.js';
import updateReadingList from '../modules/updateReadingList.js';
import bookmarkPlus from '../assets/bookmark-plus.svg';
import bookmarkMinus from '../assets/bookmark-minus.svg';
import createObserver from '../modules/createObserver.js';

async function addReadingListButton(element) {
  const readingListButton = createElement('div', { className: 'readingListButton' }, element.parentNode, 'prepend');

  let readingList = await getReadingList();

  const currentUrl = location.href;
  let isAdded = readingList.some((item) => item.url === currentUrl);

  const img = createElement(
    'img',
    {
      src: isAdded ? bookmarkMinus : bookmarkPlus,
    },
    readingListButton
  );

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

    const action = isAdded ? 'add' : 'remove';
    readingList = await updateReadingList(readingList, action === 'add' ? readingListItem : currentUrl, action);

    img.src = isAdded ? bookmarkMinus : bookmarkPlus;
  };

  readingListButton.addEventListener('click', toggleList);
}

export default function createReadingListObserver() {
  const observer = createObserver(['#wikiThemeContent', 1, 'conspects', '.readingListButton', addReadingListButton]);

  return observer;
}
