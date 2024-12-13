import { describe, it, expect, vi } from 'vitest';
import debounce from '../debounce';

describe('debounce', () => {
  it('should delay the execution of the function', () => {
    vi.useFakeTimers();
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalled();
  });

  it('should only call the function once if called multiple times within the wait period', () => {
    vi.useFakeTimers();
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    vi.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should call the function with the correct arguments', () => {
    vi.useFakeTimers();
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc('arg1', 'arg2');
    vi.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should reset the timer if called again within the wait period', () => {
    vi.useFakeTimers();
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    vi.advanceTimersByTime(500);
    debouncedFunc();
    vi.advanceTimersByTime(500);
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(func).toHaveBeenCalled();
  });
});
