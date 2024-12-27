import { logger } from '../modules';

const BASE_API_URL = 'https://foxford.ru/api/';

export default class Request {
  constructor({ url, method = 'GET', cacheCallback }) {
    this.url = BASE_API_URL + url;
    this.method = method;
    this.cacheCallback = cacheCallback;

    return this;
  }

  async make() {
    if (this.cacheCallback) {
      return this.#useCache();
    }

    return this.#send();
  }

  async #send() {
    try {
      const response = await fetch(this.url, { method: this.method });
      return response.json();
    } catch (error) {
      logger.error(`Failed to fetch or parse data: ${error}`);
      return;
    }
  }

  async #useCache() {
    const cachedData = this.#getCachedData();

    if (cachedData) {
      return cachedData;
    }

    const data = await this.#send();

    this.#setCachedData(data);

    return data;
  }

  #getCachedData() {
    const cachedData = localStorage.getItem(this.url);

    return JSON.parse(cachedData);
  }

  #setCachedData(data) {
    const isMustCache = this.cacheCallback(data);

    if (!isMustCache) {
      return;
    }

    localStorage.setItem(this.url, JSON.stringify(data));
  }
}
