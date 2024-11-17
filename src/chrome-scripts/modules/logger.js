const prefix = '[Foxford Tools] ';

/**
 * Логгер для вывода сообщений в консоль с различными уровнями важности.
 */
const logger = {
  /**
   * Выводит информационное сообщение в консоль.
   * @param {string} message - Сообщение для вывода.
   */
  info: (message) => {
    console.log(prefix + message);
  },

  /**
   * Выводит предупреждающее сообщение в консоль.
   * @param {string} message - Сообщение для вывода.
   */
  warn: (message) => {
    console.warn(prefix + message);
  },

  /**
   * Выводит сообщение об ошибке в консоль.
   * @param {string} message - Сообщение для вывода.
   */
  error: (message) => {
    console.error(prefix + message);
  },
};

export default logger;
