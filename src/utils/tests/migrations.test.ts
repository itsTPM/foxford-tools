import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fakeBrowser } from 'wxt/testing/fake-browser';

describe('runOnce', () => {
  beforeEach(() => {
    vi.resetModules();
    fakeBrowser.reset();
  });

  it('should run fn if migration has not been completed', async () => {
    const { runOnce } = await import('../migrations');
    const fn = vi.fn();

    await runOnce('test-migration', fn);

    expect(fn).toHaveBeenCalledOnce();
  });

  it('should not run fn if migration has already been completed', async () => {
    const { runOnce } = await import('../migrations');
    const fn = vi.fn();

    await fakeBrowser.storage.local.set({ completedMigrations: ['test-migration'] });
    await runOnce('test-migration', fn);

    expect(fn).not.toHaveBeenCalled();
  });

  it('should mark migration as completed after running', async () => {
    const { runOnce } = await import('../migrations');

    await runOnce('test-migration', vi.fn());

    const result = await fakeBrowser.storage.local.get('completedMigrations');
    expect(result.completedMigrations).toContain('test-migration');
  });

  it('should not overwrite existing completed migrations', async () => {
    const { runOnce } = await import('../migrations');
    await fakeBrowser.storage.local.set({ completedMigrations: ['old-migration'] });

    await runOnce('new-migration', vi.fn());

    const result = await fakeBrowser.storage.local.get('completedMigrations');
    expect(result.completedMigrations).toContain('old-migration');
    expect(result.completedMigrations).toContain('new-migration');
  });
});
