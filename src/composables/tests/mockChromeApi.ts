import { vi } from 'vitest';

export default function mockChromeAPI() {
  return {
    storage: {
      local: {
        get: vi.fn(),
        set: vi.fn(),
        remove: vi.fn(),
      },
      sync: {
        get: vi.fn(),
        set: vi.fn(),
      },
    },
    runtime: {
      sendMessage: vi.fn(),
    },
  };
}
