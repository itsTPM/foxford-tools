export const isExtension = !!(globalThis as { chrome?: { runtime?: { id?: string } } }).chrome?.runtime?.id;
