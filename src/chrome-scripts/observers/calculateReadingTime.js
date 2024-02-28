import createElement from '../modules/createElement.js';
import createObserver from '../modules/createObserver.js';

function calculateReadingTime(element) {
  const conspectContent = element.textContent;
  const wordCount = [...conspectContent.matchAll(/[^\s]+/g)].length;
  const readingTime = Math.round(wordCount / 150);
  const badgeWrapper = createElement('div', { className: 'badgeWrapper' }, element.parentNode, 'prepend');
  createElement(
    'span',
    { textContent: readingTime > 0 ? `~${readingTime} мин. чтения` : `меньше минуты чтения` },
    badgeWrapper
  );
}

export default function createReadingTimeObserver() {
  const observer = createObserver(['#wikiThemeContent', 1, 'conspects', '.badgeWrapper', calculateReadingTime]);

  return observer;
}
