import { debounce, logger } from '../utils';

interface ObserverOptions {
  targetElementSelector: string;
  createdElementSelector: string;
  delay?: number;
  urlPart?: string;
  callback: (element: Element) => void | Promise<void>;
}

export function createObserver({
  targetElementSelector,
  createdElementSelector,
  delay = 1,
  urlPart,
  callback,
}: ObserverOptions): { observe(): void } {
  let isElementCreated = false;
  let targetElement: Element | null = null;
  let createdElement: Element | null = null;

  const debouncedCallback = debounce(callback, delay);

  function setElements() {
    targetElement = document.querySelector(targetElementSelector);
    createdElement = document.querySelector(createdElementSelector);
  }

  function updateElements() {
    const prevTarget = targetElement;
    const prevCreated = createdElement;

    setElements();

    if (prevTarget !== targetElement || prevCreated !== createdElement) {
      isElementCreated = false;
    }
  }

  function checkIsUrlPartIncluded() {
    if (!urlPart) return true;
    return location.href.includes(urlPart);
  }

  function checkIsObserverActive() {
    return !isElementCreated && !!targetElement && !createdElement && checkIsUrlPartIncluded();
  }

  const mutationObserver = new MutationObserver(() => {
    updateElements();

    if (!checkIsObserverActive()) return;

    isElementCreated = true;
    debouncedCallback(targetElement!);
  });

  updateElements();

  return {
    observe() {
      mutationObserver.observe(document.body, { childList: true, subtree: true });
      logger.info(`Starting Observer for ${createdElementSelector}`);
    },
  };
}
