import { describe, it, expect, vi, beforeEach } from 'vitest';
import createPercentElement from '../createPercentElement';
import createElement from '../createElement';

vi.mock('../createElement', () => ({
  default: vi.fn((tag, options) => {
    const element = document.createElement(tag);
    if (options.textContent) element.textContent = options.textContent;
    if (options.classList) element.classList.add(options.classList);
    return element;
  }),
}));

describe('createPercentElement', () => {
  let parent;

  beforeEach(() => {
    parent = document.createElement('div');
  });

  it('should create an element with "не начато" text and "percent-gray" class for NaN, 0, undefined, or null percent', () => {
    const testCases = [NaN, 0, undefined, null];

    testCases.forEach((percent) => {
      const element = createPercentElement(percent, parent, 'append');
      expect(element.textContent).toBe('не начато');
      expect(element.classList.contains('percent-gray')).toBe(true);
    });
  });

  it('should create an element with "percent-red" class for percent <= 40', () => {
    const element = createPercentElement(40, parent, 'append');
    expect(element.textContent).toBe('40%');
    expect(element.classList.contains('percent-red')).toBe(true);
  });

  it('should create an element with "percent-yellow" class for percent <= 70', () => {
    const element = createPercentElement(70, parent, 'append');
    expect(element.textContent).toBe('70%');
    expect(element.classList.contains('percent-yellow')).toBe(true);
  });

  it('should create an element with "percent-green" class for percent > 70', () => {
    const element = createPercentElement(80, parent, 'append');
    expect(element.textContent).toBe('80%');
    expect(element.classList.contains('percent-green')).toBe(true);
  });

  it('should call createElement with correct arguments', () => {
    createPercentElement(50, parent, 'append');
    expect(createElement).toHaveBeenCalledWith('span', { textContent: '50%', classList: 'percent' }, parent, 'append');
  });
});
