import { describe, it, expect } from 'vitest';
import createElement from '../createElement';

describe('createElement', () => {
  it('should create an element with the specified tag', () => {
    const element = createElement('div');
    expect(element.tagName).toBe('DIV');
  });

  it('should assign properties to the created element', () => {
    const properties = { id: 'test-id', className: 'test-class' };
    const element = createElement('div', properties);
    expect(element.id).toBe('test-id');
    expect(element.className).toBe('test-class');
  });

  it('should append the created element to the specified parent', () => {
    const parent = document.createElement('div');
    const element = createElement('span', {}, parent);
    expect(parent.contains(element)).toBe(true);
  });

  it('should use the specified insert method to add the element to the parent', () => {
    const parent = document.createElement('div');
    const element = createElement('span', {}, parent, 'prepend');
    expect(parent.firstChild).toBe(element);
  });

  it('should return the created element', () => {
    const element = createElement('div');
    expect(element).toBeInstanceOf(HTMLElement);
  });
});
