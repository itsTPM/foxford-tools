import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Observer } from '../';

describe('Observer', () => {
  let callback;
  let observer;
  let target;

  beforeEach(() => {
    vi.useFakeTimers();

    callback = vi.fn();
    target = createTargetElement();

    window.location.href = 'http://example.com/test';

    observer = new Observer({
      targetElementSelector: '#target',
      createdElementSelector: '#created',
      delay: 100,
      urlPart: 'test',
      callback,
    });

    observer.observe(target, {
      childList: true,
    });
  });

  it('should call callback when mutation has occured', async () => {
    mutateElement(target);

    await vi.waitUntil(() => callback.mock.calls.length === 1);
  });

  it('should not call callback when no mutation has occured', () => {
    setTimeout(() => {
      expect(callback).not.toHaveBeenCalled();
    }, 200);

    vi.runAllTimers();
  });

  it('should not call callback when element is created already', () => {
    createCreatedElement();

    mutateElement(target);

    setTimeout(() => {
      expect(callback).not.toHaveBeenCalled();
    }, 200);

    vi.runAllTimers();
  });

  it('should not call callback when url does not contain urlPart', () => {
    window.location.href = 'http://example.com/';

    mutateElement(target);

    setTimeout(() => {
      expect(callback).not.toHaveBeenCalled();
    }, 200);

    vi.runAllTimers();
  });
});

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

function mutateElement(element) {
  element.innerHTML = 'test';
}
