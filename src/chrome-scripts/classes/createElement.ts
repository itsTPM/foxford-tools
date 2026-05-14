interface CreateElementOptions {
  tag: string;
  properties?: Partial<HTMLElement>;
  parent?: Element | null;
  insertMethod?: 'appendChild' | 'prepend' | 'append' | 'before' | 'after';
}

export function createElement({
  tag,
  properties,
  parent,
  insertMethod = 'appendChild',
}: CreateElementOptions): HTMLElement {
  const element = document.createElement(tag);

  Object.assign(element, { ...properties });

  if (parent) {
    parent[insertMethod](element);
  }

  return element;
}
