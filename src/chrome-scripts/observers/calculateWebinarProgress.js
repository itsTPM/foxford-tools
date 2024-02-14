import createPercentElement from '../modules/createPercentElement.js';

export default function calculateWebinarProgress(element) {
  const xpCounters = document.getElementsByClassName('major');
  if (xpCounters.length < 2) return;
  const webinarPercent = +Math.round((xpCounters[2].textContent / xpCounters[3].textContent) * 100);
  createPercentElement(webinarPercent, element.lastChild.lastChild, 'before').classList.add('webinarPercent');
}
