import { describe, it, expect } from 'vitest';
import Element from '../Element';

describe('Element', () => {
  it('should create an element with the specified tag', () => {
    const element = new Element({ tag: 'div' });
    expect(element.tagName).toBe('DIV');
  });

  it('should assign properties to the created element', () => {
    const properties = { id: 'test-id', className: 'test-class' };
    const element = new Element({ tag: 'div', properties });
    expect(element.id).toBe('test-id');
    expect(element.className).toBe('test-class');
  });

  it('should append the created element to the specified parent', () => {
    const parent = document.createElement('div');
    const element = new Element({ tag: 'span', parent });
    expect(parent.contains(element)).toBe(true);
  });

  it('should use the specified insert method to add the element to the parent', () => {
    const parent = document.createElement('div');
    const element = new Element({ tag: 'span', parent, insertMethod: 'prepend' });
    expect(parent.firstChild).toBe(element);
  });

  it('should return the created element', () => {
    const element = new Element({ tag: 'div' });
    expect(element).toBeInstanceOf(HTMLElement);
  });});
