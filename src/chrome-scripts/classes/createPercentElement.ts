import { createElement } from './createElement';

interface CreatePercentElementOptions {
  percent?: number | null;
  parent: Element;
  insertMethod?: 'appendChild' | 'prepend' | 'append' | 'before' | 'after';
}

export function createPercentElement({ percent, parent, insertMethod }: CreatePercentElementOptions): HTMLElement {
  const { textContent, percentClass } = computeProperties(percent);

  const element = createElement({
    tag: 'span',
    properties: { textContent, className: 'percent' },
    parent,
    insertMethod,
  });

  element.classList.add(percentClass);

  return element;
}

function computeProperties(percent?: number | null) {
  if (!Number.isFinite(percent)) {
    return { textContent: 'не начато', percentClass: 'percent-gray' };
  }

  let percentClass: string;

  if (percent > 70) {
    percentClass = 'percent-green';
  } else if (percent > 40) {
    percentClass = 'percent-yellow';
  } else {
    percentClass = 'percent-red';
  }

  return { textContent: `${percent}%`, percentClass };
}
