import { Element, Observer } from '../classes';

export default function createReadingTimeObserver() {
  const observer = new Observer({
    targetElementSelector: '#wikiThemeContent',
    createdElementSelector: '#readingTime',
    urlPart: 'conspects',
    callback: observerCallback,
  });

  return observer;
}

function observerCallback(element) {
  const conspectText = getConspectText(element);
  const wordCount = calculateWordCount(conspectText);
  const readingTime = calculateReadingTime(wordCount);
  const readingTimeElementText = calculateReadingTimeElementText(readingTime);

  createReadingTimeElement({
    textContent: readingTimeElementText,
    element,
  });
}

function getConspectText(element) {
  return element.textContent;
}

function calculateWordCount(text) {
  return [...text.matchAll(/[^\s]+/g)].length;
}

function calculateReadingTime(wordCount) {
  const WORDS_PER_MINUTE = 150;

  return Math.round(wordCount / WORDS_PER_MINUTE);
}

function calculateReadingTimeElementText(readingTime) {
  if (readingTime > 0) {
    return `~${readingTime} мин. чтения`;
  }

  return `меньше минуты чтения`;
}

function createReadingTimeElement({ textContent, element }) {
  new Element({
    tag: 'div',
    properties: {
      textContent,
      className: 'readingTime',
      id: 'readingTime',
    },
    parent: element.parentNode,
    insertMethod: 'prepend',
  });
}
