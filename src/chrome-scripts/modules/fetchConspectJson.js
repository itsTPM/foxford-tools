/**
 * Получает JSON-данные для определенного конспекта.
 *
 * @param {string} lessonId - Идентификатор урока.
 * @param {string} conspectId - Идентификатор конспекта.
 */
export default async function fetchConspectJson(lessonId, conspectId) {
  const apiLink = `https://foxford.ru/api/lessons/${lessonId}/conspects/${conspectId}`;
  const response = await fetch(apiLink);
  return response.json();
}
