import createPercentElement from '../modules/createPercentElement.js';
import createObserver from '../modules/createObserver.js';

function calculateWebinarProgress(element) {
  // У элемента текст че-то типа "60 из 120 XP", достаем 60 и 120
  const xpElementText = element.lastChild.lastChild.lastChild.lastChild.firstChild.lastChild.textContent;

  const xpNumbers = xpElementText.match(/[0-9]+/g);

  const gainedXp = +xpNumbers[0];
  const maxXp = +xpNumbers[1];

  const webinarPercent = +Math.round((gainedXp / maxXp) * 100);
  createPercentElement(webinarPercent, element.lastChild.lastChild.lastChild.lastChild, 'before').classList.add(
    'webinarPercent'
  );
}

export default function createWebinarObserver() {
  const observer = createObserver(['#joyrideLessonBtn', 1, 'courses', '.webinarPercent', calculateWebinarProgress]);

  return observer;
}
