import { describe, it, expect } from 'vitest';
import { PercentElement } from '../';

describe('PercentElement', () => {
  it('should create an element with "не начато" text and "percent-gray" class for NaN, undefined, or null percent', () => {
    const percents = [NaN, undefined, null];

    for (const percent of percents) {
      const element = new PercentElement({ percent });
      expect(element.textContent).toBe('не начато');
      expect(element.classList.contains('percent-gray')).toBe(true);
    }
  });

  it('should create an element with "percent-red" class for percent <= 40', () => {
    const percents = [0, 1, 39, 40];

    for (const percent of percents) {
      const element = new PercentElement({ percent });
      expect(element.textContent).toBe(`${percent}%`);
      expect(element.classList.contains('percent-red')).toBe(true);
    }
  });

  it('should create an element with "percent-yellow" class for percent <= 70', () => {
    const percents = [41, 69, 70];

    for (const percent of percents) {
      const element = new PercentElement({ percent });
      expect(element.textContent).toBe(`${percent}%`);
      expect(element.classList.contains('percent-yellow')).toBe(true);
    }
  });

  it('should create an element with "percent-green" class for percent > 70', () => {
    const percents = [71, 100];

    for (const percent of percents) {
      const element = new PercentElement({ percent });
      expect(element.textContent).toBe(`${percent}%`);
      expect(element.classList.contains('percent-green')).toBe(true);
    }
  });
});
