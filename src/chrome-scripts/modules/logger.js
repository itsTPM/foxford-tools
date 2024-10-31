/**
 * Выводит сообщение в консоль с определенным типом.
 *
 * @param {string} message - Сообщение для вывода.
 * @param {string} [type='message'] - Тип сообщения. Может быть 'message', 'warn' или 'error'.
 */

export default function logger(message, type = 'message') {
  const prefix = '[Foxford Tools] ';

  if (type === 'error') {
    console.error(prefix + message);
    return;
  }

  if (type === 'warn') {
    console.warn(prefix + message);
    return;
  }

  console.log(prefix + message);
}
