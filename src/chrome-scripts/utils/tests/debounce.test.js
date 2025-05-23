import { describe, it, expect, vi, beforeEach } from 'vitest';
import { debounce } from '..';

const DELAY = 1000;
const SHORT_DELAY = 1;

describe('debounce', () => {
  let func, debouncedFunc, quickDebouncedFunc;

  beforeEach(() => {
    vi.useFakeTimers();

    func = vi.fn();
    debouncedFunc = debounce(func, DELAY);
    quickDebouncedFunc = debounce(func, SHORT_DELAY);
  });

  it('should work correctly with minimal delays', async () => {
    quickDebouncedFunc();
    quickDebouncedFunc();
    quickDebouncedFunc();

    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(SHORT_DELAY);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should delay the execution of the function', () => {
    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(DELAY - 1);
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(DELAY);
    expect(func).toHaveBeenCalled();
  });

  it('should only call the function once if called multiple times within the wait period', () => {
    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    vi.advanceTimersByTime(DELAY);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should call the function with the correct arguments', () => {
    debouncedFunc('arg1', 'arg2');
    vi.advanceTimersByTime(DELAY);
    expect(func).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should reset the timer if called again within the wait period', () => {
    debouncedFunc();
    vi.advanceTimersByTime(DELAY - 1);
    debouncedFunc();
    vi.advanceTimersByTime(DELAY - 1);
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(DELAY - 1);
    expect(func).toHaveBeenCalled();
  });

  it('should call the function only with last set of arguments', () => {
    debouncedFunc('arg1');
    debouncedFunc('arg2');
    debouncedFunc('arg3');

    vi.advanceTimersByTime(DELAY);
    expect(func).toHaveBeenCalledWith('arg3');
  });
});
