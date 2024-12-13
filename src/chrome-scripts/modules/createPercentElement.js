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
  const { textContent, percentClass } = computePercentAttributes(percent);

  const percentElement = createElement('span', { textContent, classList: 'percent' }, parent, insertMethod);
  percentElement.classList.add(percentClass);
  return percentElement;
}

// Хелпер для вычисления атрибутов элемента процента
function computePercentAttributes(percent) {
  const attributes = {
    textContent: 'не начато',
    percentClass: 'percent-gray',
  };

  // 0% валидное если зафейлены все задачи в домашке
  if (percent || percent === 0) {
    attributes.textContent = `${percent}%`;

    if (percent > 70) {
      attributes.percentClass = 'percent-green';
    } else if (percent > 40) {
      attributes.percentClass = 'percent-yellow';
    } else {
      attributes.percentClass = 'percent-red';
    }
  }

  return attributes;
}
