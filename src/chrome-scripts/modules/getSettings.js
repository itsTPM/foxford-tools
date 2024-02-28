/**
 * Получает настройки из локального хранилища Chrome.
 * @param {Array} keys - Массив ключей настроек.
 * @returns {Promise} - Промис, который разрешается с объектом настроек или отклоняется с ошибкой.
 */
export default function getSettings(keys) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result);
      }
    });
  });
}
