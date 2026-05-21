import { runOnce } from '@/utils/migrations';

export async function runPopupMigrations() {
  await runOnce('2.0.0-popup', () => {
    ['calendarLink', 'color', 'levelData', 'profileData', 'radius'].forEach((key) => localStorage.removeItem(key));
  });
}
