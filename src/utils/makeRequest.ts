import { FetchError, ofetch } from 'ofetch';
import { logger } from './logger';

const BASE_API_URL = 'https://foxford.ru/api/';

const inflightRequests = new Map<string, Promise<unknown>>();

interface MakeRequestOptions<T> {
  url: string;
  method?: string;
  cacheCallback?: (data: T) => boolean;
}

export async function makeRequest<T>({ url, method = 'GET', cacheCallback }: MakeRequestOptions<T>) {
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

async function send<T>(url: string, method: string) {
  const key = `${method}:${url}`;
  const inflight = inflightRequests.get(key) as Promise<T | undefined> | undefined;
  if (inflight) return inflight;

  const request = ofetch<T>(url, { method })
    .catch((err: FetchError) => {
      logger.error(err.message);
      return undefined;
    })
    .finally(() => inflightRequests.delete(key));

  inflightRequests.set(key, request);
  return request;
}

const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

interface CacheEntry<T> {
  d: T;
  t: number;
}

function toCacheKey(url: string) {
  return 'ft:' + url.replace('https://foxford.ru/', '');
}

function getCachedData<T>(url: string) {
  const raw = localStorage.getItem(toCacheKey(url));
  if (raw === null) return null;
  const entry = JSON.parse(raw) as CacheEntry<T>;
  if (Date.now() - entry.t > CACHE_TTL_MS) {
    localStorage.removeItem(toCacheKey(url));
    return null;
  }
  return entry.d;
}

function setCachedData<T>(url: string, data: T, cacheCallback: (data: T) => boolean) {
  if (!cacheCallback(data)) return;
  localStorage.setItem(toCacheKey(url), JSON.stringify({ d: data, t: Date.now() } satisfies CacheEntry<T>));
}
