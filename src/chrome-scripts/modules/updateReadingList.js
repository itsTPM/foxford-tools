import getReadingList from './getReadingList.js';
import setReadingList from './setReadingList.js';

/**
 * Обновляет список чтения в зависимости от указанного действия.
 *
 * @param {Array} list - Список чтения.
 * @param {string} url - URL для добавления или удаления из списка.
 * @param {boolean} isAdded - Был ли добавлен или удален элемент из списка.
 * @returns {Promise<Array>} - Обновленный список чтения.
 */
export default async function updateReadingList(list, url, isAdded) {
  list = await getReadingList();
  const updatedList = isAdded ? [...list, url] : list.filter((item) => item.url !== url);
  await setReadingList(updatedList);
  return updatedList;
}
