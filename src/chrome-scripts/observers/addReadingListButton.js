import createElement from '../modules/createElement.js';
import getReadingList from '../modules/getReadingList.js';
import fetchConspectJson from '../modules/fetchConspectJson.js';
import updateReadingList from '../modules/updateReadingList.js';
import bookmarkPlus from '../assets/bookmark-plus.svg';
import bookmarkMinus from '../assets/bookmark-minus.svg';

export default async function addReadingListButton(element) {
  const readingListButton = createElement('div', { className: 'readingListButton' }, element.parentNode, 'prepend');

  let readingList = await getReadingList();

  const currentUrl = location.href;
  const isAdded = readingList.some((item) => item.url === currentUrl);

  const img = createElement(
    'img',
    {
      src: isAdded ? chrome.runtime.getURL(bookmarkMinus) : chrome.runtime.getURL(bookmarkPlus),
    },
    readingListButton
  );

  const toggleList = async () => {
    const [lessonId, conspectId] = location.href.match(/[0-9]+/g);
    const conspectJson = await fetchConspectJson(lessonId, conspectId);

    const {
      name: title,
      course: { id: courseId, name: courseName },
      discipline: { color: courseColor, image_url: courseImage },
    } = conspectJson;

    const readingListItem = { url: currentUrl, title, courseId, courseName, courseColor, courseImage };

    const action = img.src.endsWith('bookmark-plus.svg') ? 'add' : 'remove';
    readingList = await updateReadingList(readingList, action === 'add' ? readingListItem : currentUrl, action);

    img.src = img.src.endsWith('bookmark-plus.svg')
      ? chrome.runtime.getURL(bookmarkMinus)
      : chrome.runtime.getURL(bookmarkPlus);
  };

  readingListButton.addEventListener('click', toggleList);
}
