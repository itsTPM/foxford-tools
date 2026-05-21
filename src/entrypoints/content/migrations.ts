import { runOnce } from '@/utils/migrations';

export async function runContentMigrations() {
  await runOnce('2.0.0-foxford', () => {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('https://foxford.ru/api/')) keysToRemove.push(key);
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  });
}
