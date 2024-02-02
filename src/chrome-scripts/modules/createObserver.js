import debounce from './debounce';

/**
 * Создает MutationObserver, который отслеживает изменения в DOM и вызывает функцию обратного вызова, когда выполняются указанные условия.
 *
 * @param {string} querySelector - CSS-селектор для элемента, который нужно наблюдать.
 * @param {number} delay - Задержка в миллисекундах перед вызовом функции обратного вызова.
 * @param {string} urlPart - Часть URL, которая должна присутствовать в текущем URL, чтобы вызвать функцию обратного вызова.
 * @param {string} badgeClass - CSS-селектор класса для элемента значка.
 * @param {Function} callback - Функция обратного вызова, которая будет выполнена, когда выполняются указанные условия.
 * @returns {MutationObserver} - Созданный экземпляр MutationObserver.
 */

export default function createObserver(querySelector, delay, urlPart, badgeClass, callback) {
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
        console.error(`[Foxford Tools] Ошибка при создании MutationObserver: ${error}`);
      }
    });
  });
}
