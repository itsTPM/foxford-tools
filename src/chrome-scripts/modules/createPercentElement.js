import createElement from './createElement.js';

/**
 * Создает элемент процента на основе заданного значения процента.
 * Если значение процента является NaN, 0, undefined или null, элемент будет отображать 'не начато'.
 * Если значение процента меньше или равно 40, элемент будет иметь класс 'percent-red'.
 * Если значение процента меньше или равно 70, элемент будет иметь класс 'percent-yellow'.
 * Если значение процента больше 70, элемент будет иметь класс 'percent-green'.
 *
 * @param {number} percent - Значение процента, которое будет отображаться
 * @param {HTMLElement} parent - Родительский элемент, к которому будет добавлен элемент процента
 * @param {string} insertMethod - Метод вставки элемента процента в родительский элемент ('append', 'prepend', 'before', 'after')
 * @returns {HTMLElement} - Созданный элемент процента
 */
export default function createPercentElement(percent, parent, insertMethod) {
  let percentClass;
  let textContent;

  if (isNaN(percent) || percent === 0 || percent === undefined || percent === null) {
    textContent = 'не начато';
    percentClass = 'percent-gray';
  } else {
    textContent = `${percent}%`;
    if (percent <= 40) {
      percentClass = 'percent-red';
    } else if (percent <= 70) {
      percentClass = 'percent-yellow';
    } else {
      percentClass = 'percent-green';
    }
  }

  const percentElement = createElement('span', { textContent, classList: 'percent' }, parent, insertMethod);
  percentElement.classList.add(percentClass);
  return percentElement;
}
