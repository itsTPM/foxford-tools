import { logger } from './logger';

const BASE_API_URL = 'https://foxford.ru/api/';

interface MakeRequestOptions<T> {
  url: string;
  method?: string;
  cacheCallback?: (data: T) => boolean;
}

export async function makeRequest<T>({
  url,
  method = 'GET',
  cacheCallback,
}: MakeRequestOptions<T>): Promise<T | undefined> {
  const fullUrl = BASE_API_URL + url;

  if (cacheCallback) {
    const cached = getCachedData<T>(fullUrl);
    if (cached !== null) return cached;

    const data = await send<T>(fullUrl, method);
    if (data !== undefined) setCachedData(fullUrl, data, cacheCallback);
    return data;
  }

  return send<T>(fullUrl, method);
}

async function send<T>(url: string, method: string): Promise<T | undefined> {
  try {
    const response = await fetch(url, { method });
    return response.json() as T;
  } catch (error) {
    logger.error(`Failed to fetch or parse data: ${String(error)}`);
    return;
  }
}

function getCachedData<T>(url: string): T | null {
  const cachedData = localStorage.getItem(url);
  if (cachedData === null) return null;
  return JSON.parse(cachedData) as T;
}

function setCachedData<T>(url: string, data: T, cacheCallback: (data: T) => boolean) {
  if (!cacheCallback(data)) return;
  localStorage.setItem(url, JSON.stringify(data));
}
