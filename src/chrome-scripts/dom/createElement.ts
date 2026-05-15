interface CreateElementOptions<K extends keyof HTMLElementTagNameMap> {
  tag: K;
  properties?: Partial<HTMLElementTagNameMap[K]>;
  parent?: Element | null;
  insertMethod?: 'appendChild' | 'prepend' | 'append' | 'before' | 'after';
}

export function createElement<K extends keyof HTMLElementTagNameMap>({
  tag,
  properties,
  parent,
  insertMethod = 'appendChild',
}: CreateElementOptions<K>) {
  const element = document.createElement(tag);

  Object.assign(element, { ...properties });

  if (parent) {
    parent[insertMethod](element);
  }

  return element;
}
