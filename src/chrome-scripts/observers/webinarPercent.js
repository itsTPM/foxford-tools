import createPercentElement from '../modules/createPercentElement.js';
import createObserver from '../modules/createObserver.js';

function calculateWebinarProgress(element) {
  const xpCounters = document.getElementsByClassName('major');
  if (xpCounters.length < 2) return;
  const webinarPercent = +Math.round((xpCounters[2].textContent / xpCounters[3].textContent) * 100);
  createPercentElement(webinarPercent, element.lastChild.lastChild, 'before').classList.add('webinarPercent');
}

export default function createWebinarObserver() {
  const observer = createObserver(['.bKdhIU', 1, 'courses', '.webinarPercent', calculateWebinarProgress]);

  return observer;
}
