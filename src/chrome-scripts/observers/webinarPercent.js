import { createPercentElement, createObserver } from '../modules';

function calculateWebinarProgress(element) {
  // У элемента текст че-то типа "60 из 120 XP", достаем 60 и 120
  const xpElementText = element.lastChild.lastChild.lastChild.lastChild.firstChild.lastChild.textContent;

  const xpNumbers = xpElementText.match(/[0-9]+/g);
  const [gainedXp, maxXp] = xpNumbers.map((number) => parseInt(number));

  // null ставится чтобы createPercentElement использовал текст "не начато" заместо 0%
  // так как из-за подсчета по числам xp а не по api тут даже проваленная задача даст 10xp и 0% быть не может
  const webinarPercent = +Math.round((gainedXp / maxXp) * 100) || null;
  createPercentElement(webinarPercent, element.lastChild.lastChild.lastChild.lastChild, 'before').classList.add(
    'webinarPercent'
  );
}

export default function createWebinarObserver() {
  const observer = createObserver(['#joyrideLessonBtn', 1, 'courses', '.webinarPercent', calculateWebinarProgress]);

  return observer;
}
