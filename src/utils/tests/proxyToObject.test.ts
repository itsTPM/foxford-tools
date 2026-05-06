import { describe, it, expect } from 'vitest';
import { proxyToObject } from '../proxyToObject';

describe('proxyToObject', () => {
  it('should convert a proxy object to a regular object', () => {
    const target = { a: 1, b: 2 };
    const proxy = new Proxy(target, {});
    const result = proxyToObject(proxy);
    expect(result).toEqual(target);
  });

  it('should handle nested proxy objects', () => {
    const target = { a: 1, b: { c: 2 } };
    const proxy = new Proxy(target, {});
    const result = proxyToObject(proxy);
    expect(result).toEqual(target);
  });

  it('should handle arrays within proxy objects', () => {
    const target = { a: [1, 2, 3] };
    const proxy = new Proxy(target, {});
    const result = proxyToObject(proxy);
    expect(result).toEqual(target);
  });

  it('should handle empty proxy objects', () => {
    const target = {};
    const proxy = new Proxy(target, {});
    const result = proxyToObject(proxy);
    expect(result).toEqual(target);
  });
});
