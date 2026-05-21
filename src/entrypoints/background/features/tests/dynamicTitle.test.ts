import { describe, it, expect } from 'vitest';
import { getDynamicTitleByUrl } from '../dynamicTitle';

describe('dynamicTitle', () => {
  describe('getDynamicTitleByUrl', () => {
    it('should return the title for a direct match', () => {
      expect(getDynamicTitleByUrl('https://foxford.ru/daily-plan')).toBe('План на сегодня');
      expect(getDynamicTitleByUrl('https://foxford.ru/calendar')).toBe('Календарь');
      expect(getDynamicTitleByUrl('https://foxford.ru/checkout')).toBe('Корзина');
    });

    it('should return undefined when no key matches', () => {
      expect(getDynamicTitleByUrl('https://foxford.ru/unknown-page')).toBeUndefined();
    });

    it('should match the first key in iteration order, even when a later key also matches', () => {
      expect(getDynamicTitleByUrl('https://foxford.ru/dashboard/daily-plan')).toBe('План на сегодня');
    });

    it('should return generic title when only the catch-all key matches', () => {
      expect(getDynamicTitleByUrl('https://foxford.ru/dashboard')).toBe('Программы обучения');
      expect(getDynamicTitleByUrl('https://foxford.ru/courses/12345')).toBe('Курс');
      expect(getDynamicTitleByUrl('https://foxford.ru/groups/42')).toBe('Вебинар');
    });

    it('should return the specific title for "interactive-training" rather than falling through to "tasks"', () => {
      expect(getDynamicTitleByUrl('https://foxford.ru/student/interactive-training/tasks')).toBe(
        'Интерактивные задачи'
      );
    });

    it('should return "Аттестация" for "attestation_works" rather than the "tasks" fallback', () => {
      expect(getDynamicTitleByUrl('https://foxford.ru/attestation_works/tasks/9')).toBe('Аттестация');
    });
  });
});
