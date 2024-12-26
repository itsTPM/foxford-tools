export default class Element {
  constructor({ tag, properties, parent, insertMethod = 'appendChild' }) {
    this.element = document.createElement(tag);
    this.#assignProperties(properties);
    this.#insertIntoParent(parent, insertMethod);

    return this.element;
  }

  #assignProperties(properties) {
    Object.assign(this.element, { ...properties });
  }

  #insertIntoParent(parent, insertMethod) {
    parent?.[insertMethod](this.element);
  }
}
