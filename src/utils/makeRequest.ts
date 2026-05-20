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
  const inflight = inflightRequests.get(url) as Promise<T | undefined> | undefined;
  if (inflight) return inflight;

  const request = ofetch<T>(url, { method })
    .catch((err: FetchError) => {
      logger.error(err.message);
      return undefined;
    })
    .finally(() => inflightRequests.delete(url));

  inflightRequests.set(url, request);
  return request;
}

function getCachedData<T>(url: string) {
  const cachedData = localStorage.getItem(url);
  if (cachedData === null) return null;
  return JSON.parse(cachedData) as T;
}

function setCachedData<T>(url: string, data: T, cacheCallback: (data: T) => boolean) {
  if (!cacheCallback(data)) return;
  localStorage.setItem(url, JSON.stringify(data));
}
