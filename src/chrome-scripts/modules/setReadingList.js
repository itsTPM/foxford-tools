/**
 * Устанавливает список для чтения в хранилище Chrome.
 *
 * @param {Array} readingList - Список для чтения.
 * @returns {Promise} - Промис, который разрешается после успешного сохранения списка для чтения.
 */
export default async function setReadingList(readingList) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ readingList }, () => {
      resolve();
    });
  });
}
