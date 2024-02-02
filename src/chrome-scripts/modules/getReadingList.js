/**
 * Получает список для чтения из хранилища Chrome.
 * @returns {Promise<Array>} Промис, который разрешается массивом списка для чтения.
 */
export default async function getReadingList() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['readingList'], (result) => {
      resolve(result.readingList || []);
    });
  });
}
