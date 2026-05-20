import { createElement, createObserver } from '@/utils/dom';
import { logger, makeRequest } from '@/utils';
import googleIcon from './icons/google-logo.svg?url';

export function searchButton() {
  const observer = createObserver({
    targetElementSelector: '#WebinarCourseTheoryBlock',
    createdElementSelector: '#searchButton',
    urlPart: 'courses',
    callback: observerCallback,
  });

  observer.observe();
}

function observerCallback(element: Element) {
  const target = element.children[0]?.children[0];
  if (!target) {
    logger.error('Unable to find suitable parent element for theory search button');
    return;
  }

  const searchButtonElement = createSearchButtonElement(target);
  searchButtonElement.addEventListener('click', (e) => void searchButtonElementOnClick(e));
}

function createSearchButtonElement(parent: Element) {
  const searchButtonElement = createElement({
    tag: 'button',
    properties: {
      className: 'searchButton',
      id: 'searchButton',
      ariaLabel: 'Искать теорию по теме в Google',
    },
    parent,
    insertMethod: 'append',
  });

  createElement({
    tag: 'img',
    properties: { src: googleIcon },
    parent: searchButtonElement,
  });

  return searchButtonElement;
}

async function searchButtonElementOnClick(e: Event) {
  e.preventDefault();

  const meta = getLinkMeta();
  if (!meta) {
    alert('Не удалось получить данные о конспекте :(');
    return;
  }

  const conspectData = await makeRequest<LessonData>({
    url: `courses/${meta.courseId}/lessons/${meta.lessonId}`,
  });
  if (!conspectData) {
    alert('Не удалось получить данные о конспекте :(');
    return;
  }

  openGoogleSearch(conspectData.title);
}

function getLinkMeta() {
  const match = location.href.match(/courses\/(\d+)\/lessons\/(\d+)/);
  if (!match) {
    logger.error('Lesson and course ids match is null');
    return;
  }

  return { courseId: match[1], lessonId: match[2] };
}

function openGoogleSearch(query: string) {
  window.open(`https://www.google.com/search?q=${query}`);
}
