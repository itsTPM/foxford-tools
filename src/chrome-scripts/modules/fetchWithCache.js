import logger from './logger';

/**
 * Получает данные из указанного URL с поддержкой кэширования.
 * Если данные уже находятся в кэше, возвращает кэшированные данные.
 * Если все задачи в полученных данных решены, кэширует результат.
 * @param {string} url - URL для получения данных.
 * @returns {Promise<any>} - Промис, который разрешается с полученными данными.
 */
export default async function fetchWithCache(url) {
  try {
    const cachedData = localStorage.getItem(url);

    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      const response = await fetch(url);
      const data = await response.json();
      const allTasksSolved =
        Array.isArray(data) &&
        data.every(({ status }) => status === 'solved' || status === 'partially' || status === 'failed');

      if (allTasksSolved) {
        // Если все задачи решены, кэшируем результат
        const cacheData = data.map(({ status, id }) => ({ status, id }));
        localStorage.setItem(url, JSON.stringify(cacheData));
      }

      return data;
    }
  } catch (error) {
    logger.error(`Failed to fetch or parse data: ${error}`);
    return null;
  }
}
