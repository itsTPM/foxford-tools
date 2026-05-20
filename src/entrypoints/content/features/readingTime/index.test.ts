import { describe, it, expect } from 'vitest';
import { calculateWordCount, calculateReadingTime, calculateReadingTimeElementText } from '.';

describe('readingTime', () => {
  describe('calculateWordCount', () => {
    it('should return 0 for an empty string', () => {
      expect(calculateWordCount('')).toBe(0);
    });

    it('should return 0 for whitespace-only input', () => {
      expect(calculateWordCount('   \n\t  ')).toBe(0);
    });

    it('should count a single word', () => {
      expect(calculateWordCount('word')).toBe(1);
    });

    it('should count words separated by various whitespace characters', () => {
      expect(calculateWordCount('one two\tthree\nfour\r\nfive  six')).toBe(6);
    });

    it('should count punctuation as part of adjacent words', () => {
      expect(calculateWordCount('Hello, world! How are you?')).toBe(5);
    });
  });

  describe('calculateReadingTime', () => {
    it('should return 0 minutes for 0 words', () => {
      expect(calculateReadingTime(0)).toBe(0);
    });

    it('should round 75 words (half a minute) up to 1 minute', () => {
      expect(calculateReadingTime(75)).toBe(1);
    });

    it('should return 1 minute for exactly 150 words', () => {
      expect(calculateReadingTime(150)).toBe(1);
    });

    it('should round 224 words down to 1 minute', () => {
      expect(calculateReadingTime(224)).toBe(1);
    });

    it('should round 225 words up to 2 minutes', () => {
      expect(calculateReadingTime(225)).toBe(2);
    });
  });

  describe('calculateReadingTimeElementText', () => {
    it('should return "меньше минуты чтения" for 0', () => {
      expect(calculateReadingTimeElementText(0)).toBe('меньше минуты чтения');
    });

    it('should return "~1 мин. чтения" for 1', () => {
      expect(calculateReadingTimeElementText(1)).toBe('~1 мин. чтения');
    });

    it('should return "~5 мин. чтения" for 5', () => {
      expect(calculateReadingTimeElementText(5)).toBe('~5 мин. чтения');
    });
  });
});
