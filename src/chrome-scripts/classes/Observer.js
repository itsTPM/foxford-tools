import { debounce, logger } from '../utils';

export default class Observer {
  constructor({ targetElementSelector, createdElementSelector, delay = 1, urlPart, callback }) {
    this.debouncedCallback = this.#createDebouncedCallback(callback, delay);
    this.targetElementSelector = targetElementSelector;
    this.createdElementSelector = createdElementSelector;
    this.urlPart = urlPart;
    this.isElementCreated = false;
    this.targetElement = null;
    this.createdElement = null;

    this.#updateElements();
    this.observer = this.#createObserver();

    return this;
  }

  observe() {
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    logger.info(`Starting Observer for ${this.createdElementSelector}`);
  }

  #createObserver() {
    return new MutationObserver(() => {
      this.#updateElements(); // обновляем элементы, т.к. они могли быть изменены

      const isObserverActive = this.#checkIsObserverActive();

      if (!isObserverActive) {
        return;
      }

      this.isElementCreated = true;
      this.debouncedCallback(this.targetElement);
    });
  }

  #checkIsObserverActive() {
    const isUrlPartIncluded = this.#checkIsUrlPartIncluded(this.urlPart);

    const falsyCases = [
      this.isElementCreated, // если этот же observer уже отрабатывал успешно
      !this.targetElement, // если нет элемента, за которым нужно наблюдать
      this.createdElement, // если элемент уже создан, но другим observer'ом или как-то еще
      !isUrlPartIncluded, // если текущий URL не содержит часть URL, за которой нужно наблюдать
    ];

    return !falsyCases.some((falsyCase) => falsyCase);
  }

  #updateElements() {
    const current = {
      targetElement: this.targetElement,
      createdElement: this.createdElement,
    };

    this.#setElements();

    const updated = {
      targetElement: this.targetElement,
      createdElement: this.createdElement,
    };

    if (!this.#checkIsTwoObjectsEqual(current, updated)) {
      this.isElementCreated = false;
    }
  }

  #setElements() {
    this.targetElement = this.#getElement(this.targetElementSelector);
    this.createdElement = this.#getElement(this.createdElementSelector);
  }

  #createDebouncedCallback(callback, delay) {
    return debounce(callback, delay);
  }

  #getElement(querySelector) {
    return document.querySelector(querySelector);
  }

  #checkIsUrlPartIncluded(urlPart) {
    if (!urlPart) {
      return true;
    }

    return location.href.includes(urlPart);
  }

  #checkIsTwoObjectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
}
