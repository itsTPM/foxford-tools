import { Element, createObserver } from '../modules';

function calculateReadingTime(element) {
  const conspectContent = element.textContent;
  const wordCount = [...conspectContent.matchAll(/[^\s]+/g)].length;
  const readingTime = Math.round(wordCount / 150);
  const badgeWrapper = new Element({
    tag: 'div',
    properties: { className: 'badgeWrapper' },
    parent: element.parentNode,
    insertMethod: 'prepend',
  });

  new Element({
    tag: 'span',
    properties: {
      textContent: readingTime > 0 ? `~${readingTime} мин. чтения` : `меньше минуты чтения`,
    },
    parent: badgeWrapper,
  });
}

export default function createReadingTimeObserver() {
  const observer = createObserver(['#wikiThemeContent', 1, 'conspects', '.badgeWrapper', calculateReadingTime]);

  return observer;
}
