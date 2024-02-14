import getReadingList from './getReadingList.js';
import setReadingList from './setReadingList.js';

/**
 * Обновляет список чтения в зависимости от указанного действия.
 *
 * @param {Array} list - Список чтения.
 * @param {string} url - URL для добавления или удаления из списка.
 * @param {string} action - Действие, которое нужно выполнить ('add' или 'remove').
 * @returns {Promise<Array>} - Обновленный список чтения.
 */
export default async function updateReadingList(list, url, action) {
  list = await getReadingList();
  const updatedList = action === 'add' ? [...list, url] : list.filter((item) => item.url !== url);
  await setReadingList(updatedList);
  return updatedList;
}
