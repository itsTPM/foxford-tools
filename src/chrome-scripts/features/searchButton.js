import { Element, Observer, Request } from '../classes';
import googleIcon from '@/chrome-scripts/assets/google-logo.svg?url';

export default function createSearchButtonObserver() {
  const observer = new Observer({
    targetElementSelector: 'div[class*="theory__Root"]',
    createdElementSelector: '#searchButton',
    urlPart: 'courses',
    callback: observerCallback,
  });

  observer.observe();
}

async function observerCallback(element) {
  const searchButtonElement = createSearchButtonElement(element);

  searchButtonElement.addEventListener('click', await searchButtonElementOnClick);
}

function createSearchButtonElement(element) {
  const searchButtonElement = new Element({
    tag: 'button',
    properties: {
      className: 'searchButton',
      id: 'searchButton',
      ariaLabel: 'Искать теорию по теме в Google',
    },
    parent: element,
    insertMethod: 'append',
  });

  createSearchButtonIconElement(searchButtonElement);

  return searchButtonElement;
}

async function searchButtonElementOnClick(e) {
  e.preventDefault();
  const { courseId, lessonId } = getLinkMeta();
  const conspectData = await getConspectData({ courseId, lessonId });
  const conspectTitle = getConspectTitle(conspectData);

  openGoogleSearch(conspectTitle);
}

function getLinkMeta() {
  const [courseId, lessonId] = location.href.match(/[0-9]+/g);

  return { courseId, lessonId };
}

async function getConspectData({ courseId, lessonId }) {
  const request = new Request({ url: `courses/${courseId}/lessons/${lessonId}` });
  const data = await request.make();

  return data;
}

function getConspectTitle(data) {
  return data.title;
}

function openGoogleSearch(query) {
  window.open(`https://www.google.com/search?q=${query}`);
}

function createSearchButtonIconElement(searchButtonElement) {
  const searchButtonIconElement = new Element({
    tag: 'img',
    properties: { src: googleIcon },
    parent: searchButtonElement,
  });

  return searchButtonIconElement;
}
