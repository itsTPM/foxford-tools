import { createElement, createObserver } from '../../classes';

export function readingTime() {
  const observer = createObserver({
    targetElementSelector: '#wikiThemeContent',
    createdElementSelector: '#readingTime',
    urlPart: 'conspects',
    callback: observerCallback,
  });

  observer.observe();
}

function observerCallback(element: Element) {
  const conspectText = getConspectText(element);
  const wordCount = calculateWordCount(conspectText);
  const readingTime = calculateReadingTime(wordCount);
  const readingTimeElementText = calculateReadingTimeElementText(readingTime);

  createReadingTimeElement({
    textContent: readingTimeElementText,
    element,
  });
}

function getConspectText(element: Element) {
  return element.textContent ?? '';
}

function calculateWordCount(text: string) {
  return [...text.matchAll(/[^\s]+/g)].length;
}

function calculateReadingTime(wordCount: number) {
  const WORDS_PER_MINUTE = 150;

  return Math.round(wordCount / WORDS_PER_MINUTE);
}

function calculateReadingTimeElementText(readingTime: number) {
  if (readingTime > 0) {
    return `~${readingTime} мин. чтения`;
  }

  return `меньше минуты чтения`;
}

function createReadingTimeElement({ textContent, element }: { textContent: string; element: Element }) {
  createElement({
    tag: 'div',
    properties: {
      textContent,
      className: 'readingTime',
      id: 'readingTime',
    },
    parent: element.parentElement,
    insertMethod: 'prepend',
  });
}
