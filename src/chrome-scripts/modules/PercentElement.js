import Element from './Element';

export default class PercentElement {
  constructor({ percent, parent, insertMethod }) {
    const { textContent, percentClass } = this.#computeProperties(percent);

    this.element = new Element({
      tag: 'span',
      properties: { textContent, className: 'percent' },
      parent,
      insertMethod,
    });
    this.element.classList.add(percentClass);

    return this.element;
  }

  #computeProperties(percent) {
    const attributes = {
      textContent: 'не начато',
      percentClass: 'percent-gray',
    };

    if (percent || percent === 0) {
      attributes.textContent = `${percent}%`;

      if (percent > 70) {
        attributes.percentClass = 'percent-green';
      } else if (percent > 40) {
        attributes.percentClass = 'percent-yellow';
      } else {
        attributes.percentClass = 'percent-red';
      }
    }

    return attributes;
  }
}
