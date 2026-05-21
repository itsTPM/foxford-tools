import { browser } from 'wxt/browser';

const STORAGE_KEY = 'completedMigrations';

async function getCompleted(): Promise<string[]> {
  const result = await browser.storage.local.get(STORAGE_KEY);
  return (result[STORAGE_KEY] as string[] | undefined) ?? [];
}

export async function runOnce(id: string, fn: () => void | Promise<void>): Promise<void> {
  const completed = await getCompleted();
  if (completed.includes(id)) return;
  await fn();
  const updated = await getCompleted();
  await browser.storage.local.set({ [STORAGE_KEY]: [...updated, id] });
}
