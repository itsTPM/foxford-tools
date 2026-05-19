import { isExtension } from './isExtension';

if (!isExtension) {
  const makeStorageArea = (prefix: string) => ({
    get<T>(key: string | string[]): Promise<T> {
      const keys = typeof key === 'string' ? [key] : key;
      const result: Record<string, unknown> = {};
      for (const k of keys) {
        const raw = localStorage.getItem(`${prefix}:${k}`);
        if (raw !== null) result[k] = JSON.parse(raw) as unknown;
      }
      return Promise.resolve(result as T);
    },
    set(data: Record<string, unknown>): Promise<void> {
      for (const [k, v] of Object.entries(data)) {
        localStorage.setItem(`${prefix}:${k}`, JSON.stringify(v));
      }
      return Promise.resolve();
    },
    remove(key: string | string[]): Promise<void> {
      const keys = typeof key === 'string' ? [key] : key;
      for (const k of keys) localStorage.removeItem(`${prefix}:${k}`);
      return Promise.resolve();
    },
  });

  (globalThis as Record<string, unknown>).chrome = {
    storage: {
      local: makeStorageArea('chrome.local'),
      sync: makeStorageArea('chrome.sync'),
    },
    runtime: {
      getManifest: () => ({ version: '0.0.0' }),
      sendMessage: () => Promise.resolve(),
    },
  };
}
