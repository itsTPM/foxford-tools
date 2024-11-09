/**
 * Создает и возвращает новый HTML-элемент с указанным тегом, свойствами и родительским элементом.
 * @param {string} tag - Имя HTML-тега создаваемого элемента.
 * @param {Object} properties - Объект, содержащий свойства, которые нужно присвоить элементу.
 * @param {HTMLElement} parent - Родительский элемент, к которому будет добавлен новый элемент.
 * @param {string} [insertMethod='appendChild'] - Метод, используемый для вставки нового элемента в родительский элемент.
 * @returns {HTMLElement} - Созданный HTML-элемент.
 */
export default function createElement(tag, properties = {}, parent = null, insertMethod = 'appendChild') {
  const element = document.createElement(tag);
  Object.assign(element, properties);
  parent && parent[insertMethod](element);
  return element;
}
