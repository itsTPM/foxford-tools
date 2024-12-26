/**
 * Создает функцию с задержкой, которая откладывает вызов предоставленной функции до тех пор, пока не пройдет указанное количество миллисекунд после последнего вызова.
 *
 * @param {Function} func - Функция для задержки.
 * @param {number} wait - Количество миллисекунд для задержки.
 * @returns {Function} - Функция с задержкой.
 */
export default function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
