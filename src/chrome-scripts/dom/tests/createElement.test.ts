import { describe, it, expect } from 'vitest';
import { createElement } from '../';

describe('createElement', () => {
  it('should create an element with the specified tag', () => {
    const element = createElement({ tag: 'div' });
    expect(element.tagName).toBe('DIV');
  });

  it('should assign properties to the created element', () => {
    const properties = { id: 'test-id', className: 'test-class' };
    const element = createElement({ tag: 'div', properties });
    expect(element.id).toBe('test-id');
    expect(element.className).toBe('test-class');
  });

  it('should append the created element to the specified parent', () => {
    const parent = document.createElement('div');
    const element = createElement({ tag: 'span', parent });
    expect(parent.contains(element)).toBe(true);
  });

  it('should use the specified insert method to add the element to the parent', () => {
    const parent = document.createElement('div');
    const element = createElement({ tag: 'span', parent, insertMethod: 'prepend' });
    expect(parent.firstChild).toBe(element);
  });

  it('should append the element to the parent when insertMethod is "append"', () => {
    const parent = document.createElement('div');
    parent.appendChild(document.createElement('i'));
    const element = createElement({ tag: 'span', parent, insertMethod: 'append' });
    expect(parent.lastChild).toBe(element);
  });

  it('should insert the element before the parent when insertMethod is "before"', () => {
    const grandparent = document.createElement('div');
    const parent = document.createElement('div');
    grandparent.appendChild(parent);
    const element = createElement({ tag: 'span', parent, insertMethod: 'before' });
    expect(grandparent.firstChild).toBe(element);
    expect(element.nextSibling).toBe(parent);
  });

  it('should insert the element after the parent when insertMethod is "after"', () => {
    const grandparent = document.createElement('div');
    const parent = document.createElement('div');
    grandparent.appendChild(parent);
    const element = createElement({ tag: 'span', parent, insertMethod: 'after' });
    expect(grandparent.lastChild).toBe(element);
    expect(element.previousSibling).toBe(parent);
  });

  it('should not throw and not attach the element when parent is null', () => {
    const element = createElement({ tag: 'div', parent: null });
    expect(element.parentNode).toBeNull();
  });

  it('should return the created element', () => {
    const element = createElement({ tag: 'div' });
    expect(element).toBeInstanceOf(HTMLElement);
  });
});
