import { PercentElement, Observer } from '../classes';

export default function createWebinarObserver() {
  const observer = new Observer({
    targetElementSelector: '#joyrideLessonBtn',
    createdElementSelector: '#webinarPercent',
    urlPart: 'courses',
    callback: observerCallback,
  });

  observer.observe();
}

function observerCallback(element) {
  const xpElement = getXpElement(element);
  const xpElementText = getXpElementText(xpElement);
  const extractedXp = extractXp(xpElementText);
  const [gainedXp, maxXp] = parseXp(extractedXp);
  const percent = calculatePercent(gainedXp, maxXp);

  createPercentElement(percent, element);
}

function getXpElement(element) {
  return element.lastChild.lastChild.lastChild.lastChild.firstChild.lastChild;
}

function getXpElementText(xpElement) {
  return xpElement.textContent;
}

function extractXp(xpElementText) {
  return xpElementText.match(/[0-9]+/g);
}

function parseXp(extractedXp) {
  return extractedXp.map((xp) => parseInt(xp));
}

function calculatePercent(gainedXp, maxXp) {
  // null ставится чтобы использовался текст "не начато" заместо 0%, так как из-за подсчета по числам xp а не по api тут даже проваленная задача даст 10xp и 0% быть не может
  return +Math.round((gainedXp / maxXp) * 100) || null;
}

function createPercentElement(percent, element) {
  const percentElement = new PercentElement({
    percent,
    parent: element.lastChild.lastChild.lastChild.lastChild,
    insertMethod: 'before',
  });

  setPercentElementAttributes(percentElement);

  return percentElement;
}

function setPercentElementAttributes(percentElement) {
  percentElement.id = 'webinarPercent';
  percentElement.classList.add('webinarPercent');
}
