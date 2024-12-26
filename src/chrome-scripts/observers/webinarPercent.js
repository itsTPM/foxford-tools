import { PercentElement, Observer } from '../modules';

function calculateWebinarProgress(element) {
  // У элемента текст че-то типа "60 из 120 XP", достаем 60 и 120
  const xpElementText = element.lastChild.lastChild.lastChild.lastChild.firstChild.lastChild.textContent;

  const xpNumbers = xpElementText.match(/[0-9]+/g);
  const [gainedXp, maxXp] = xpNumbers.map((number) => parseInt(number));

  // null ставится чтобы createPercentElement использовал текст "не начато" заместо 0%
  // так как из-за подсчета по числам xp а не по api тут даже проваленная задача даст 10xp и 0% быть не может
  const webinarPercent = +Math.round((gainedXp / maxXp) * 100) || null;

  new PercentElement({
    percent: webinarPercent,
    parent: element.lastChild.lastChild.lastChild.lastChild,
    insertMethod: 'before',
  }).classList.add('webinarPercent');
}

export default function createWebinarObserver() {
  const observer = new Observer({
    targetElementSelector: '#joyrideLessonBtn',
    createdElementSelector: '.webinarPercent',
    urlPart: 'courses',
    callback: calculateWebinarProgress,
  });

  return observer;
}
