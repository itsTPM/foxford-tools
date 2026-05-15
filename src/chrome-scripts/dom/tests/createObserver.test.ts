import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createObserver } from '../';
import { logger } from '../../utils';

vi.mock('../../utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../utils')>();
  return {
    ...actual,
    logger: {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    },
  };
});

const DELAY = 100;

describe('createObserver', () => {
  let callback: ReturnType<typeof vi.fn<(element: Element) => void>>;
  let target: HTMLElement;

  beforeEach(() => {
    vi.useFakeTimers();

    callback = vi.fn<(element: Element) => void>();
    target = createTargetElement();

    window.location.href = 'http://example.com/test';
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  it('should call callback when mutation has occured', async () => {
    createDefaultObserver(callback).observe();

    mutateElement(target);
    await vi.advanceTimersByTimeAsync(DELAY);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(target);
  });

  it('should not call callback when no mutation has occured', async () => {
    createDefaultObserver(callback).observe();

    await vi.advanceTimersByTimeAsync(DELAY);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not call callback when element is created already', async () => {
    createCreatedElement();
    createDefaultObserver(callback).observe();

    mutateElement(target);
    await vi.advanceTimersByTimeAsync(DELAY);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not call callback when url does not contain urlPart', async () => {
    window.location.href = 'http://example.com/';
    createDefaultObserver(callback).observe();

    mutateElement(target);
    await vi.advanceTimersByTimeAsync(DELAY);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should call callback when urlPart is not provided', async () => {
    window.location.href = 'http://example.com/anywhere';
    createObserver({
      targetElementSelector: '#target',
      createdElementSelector: '#created',
      delay: DELAY,
      callback,
    }).observe();

    mutateElement(target);
    await vi.advanceTimersByTimeAsync(DELAY);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should use a default delay when not provided', async () => {
    createObserver({
      targetElementSelector: '#target',
      createdElementSelector: '#created',
      urlPart: 'test',
      callback,
    }).observe();

    mutateElement(target);
    await vi.advanceTimersByTimeAsync(1);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should fire callback again when target element is replaced after first run', async () => {
    createDefaultObserver(callback).observe();

    mutateElement(target);
    await vi.advanceTimersByTimeAsync(DELAY);
    expect(callback).toHaveBeenCalledTimes(1);

    mutateElement(target);
    await vi.advanceTimersByTimeAsync(DELAY);
    expect(callback).toHaveBeenCalledTimes(1);

    target.remove();
    target = createTargetElement();
    await vi.advanceTimersByTimeAsync(DELAY);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith(target);
  });

  it('should support an async callback', async () => {
    const asyncCallback = vi.fn(async () => {
      await Promise.resolve();
    });
    createDefaultObserver(asyncCallback).observe();

    mutateElement(target);
    await vi.advanceTimersByTimeAsync(DELAY);

    expect(asyncCallback).toHaveBeenCalledTimes(1);
  });

  it('should log an info message when observe is called', () => {
    createDefaultObserver(callback).observe();

    expect(logger.info).toHaveBeenCalledWith('Starting Observer for #created');
  });
});

function createDefaultObserver(callback: (element: Element) => void | Promise<void>) {
  return createObserver({
    targetElementSelector: '#target',
    createdElementSelector: '#created',
    delay: DELAY,
    urlPart: 'test',
    callback,
  });
}

function createTargetElement() {
  const targetElement = document.createElement('div');
  targetElement.id = 'target';
  document.body.appendChild(targetElement);

  return targetElement;
}

function createCreatedElement() {
  const createdElement = document.createElement('div');
  createdElement.id = 'created';
  document.body.appendChild(createdElement);

  return createdElement;
}

function mutateElement(element: HTMLElement) {
  element.innerHTML += '<span>test</span>';
}
