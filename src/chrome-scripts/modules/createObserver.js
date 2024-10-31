import debounce from './debounce';
import logger from './logger';

/**
 * Создает MutationObserver, который отслеживает изменения в DOM и вызывает функцию обратного вызова.
 * @param {Array} options - Массив настроек.
 * @param {string} options[0] - Селектор элемента, за которым нужно наблюдать.
 * @param {number} options[1] - Задержка в миллисекундах перед вызовом функции обратного вызова.
 * @param {string} options[2] - Часть URL для проверки, содержит ли текущий URL ее.
 * @param {string} options[3] - Имя класса элемента значка для проверки, существует ли он уже.
 * @param {Function} options[4] - Функция обратного вызова, которая будет вызвана, когда найден наблюдаемый элемент.
 * @returns {MutationObserver} - Созданный экземпляр MutationObserver.
 */
export default function createObserver([querySelector, delay, urlPart, badgeClass, callback]) {
  let isAdded = false;
  const debouncedCallback = debounce(callback, delay);
  return new MutationObserver(() => {
    requestAnimationFrame(() => {
      try {
        const element = document.querySelector(querySelector);
        if (element) {
          if (!isAdded && location.href.includes(urlPart)) {
            if (!document.querySelector(badgeClass)) {
              debouncedCallback(element);
              isAdded = true;
            }
          }
        } else {
          isAdded = false;
        }
      } catch (error) {
        logger(`Failed to create MutationObserver: ${error}`, 'error');
      }
    });
  });
}
