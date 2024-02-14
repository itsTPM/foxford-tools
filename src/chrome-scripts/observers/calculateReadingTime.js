import createElement from '../modules/createElement.js';

export default function calculateReadingTime(element) {
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
