import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeRequest } from '../makeRequest';
import { logger } from '../logger';

vi.mock('../logger', () => ({
  logger: {
    error: vi.fn(),
  },
}));

const BASE_API_URL = 'https://foxford.ru/api/';

describe('makeRequest', () => {
  let fetchMock: ReturnType<typeof vi.fn<typeof fetch>>;

  beforeEach(() => {
    fetchMock = vi.fn<typeof fetch>();
    global.fetch = fetchMock;
    localStorage.clear();
  });

  it('should call fetch with correct URL and method', async () => {
    fetchMock.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({ data: 'test' }),
    });

    const data: unknown = await makeRequest({ url: 'test' });

    expect(fetchMock).toHaveBeenCalledWith(`${BASE_API_URL}test`, { method: 'GET' });
    expect(data).toEqual({ data: 'test' });
  });

  it('should log an error if fetch fails', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Fetch error'));

    const data: unknown = await makeRequest({ url: 'test' });

    expect(logger.error).toHaveBeenCalledWith('Failed to fetch or parse data: Error: Fetch error');
    expect(data).toBeUndefined();
  });

  it('should use cache if cacheCallback is provided and data is cached', async () => {
    localStorage.setItem(`${BASE_API_URL}test`, JSON.stringify({ data: 'cached' }));

    const cacheCallback = vi.fn().mockReturnValue(true);
    const data: unknown = await makeRequest({ url: 'test', cacheCallback });

    expect(data).toEqual({ data: 'cached' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('should fetch and cache data if not cached', async () => {
    fetchMock.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({ data: 'fetched' }),
    });

    const cacheCallback = vi.fn().mockReturnValue(true);
    const data: unknown = await makeRequest({ url: 'test', cacheCallback });

    expect(data).toEqual({ data: 'fetched' });
    expect(localStorage.getItem(`${BASE_API_URL}test`)).toBe(JSON.stringify({ data: 'fetched' }));
  });

  it('should not cache data if cacheCallback returns false', async () => {
    fetchMock.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({ data: 'fetched' }),
    });

    const cacheCallback = vi.fn().mockReturnValue(false);
    const data: unknown = await makeRequest({ url: 'test', cacheCallback });

    expect(data).toEqual({ data: 'fetched' });
    expect(localStorage.getItem(`${BASE_API_URL}test`)).toBeNull();
  });

  it('should pass custom method to fetch', async () => {
    fetchMock.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({ data: 'test' }),
    });

    await makeRequest({ url: 'test', method: 'POST' });

    expect(fetchMock).toHaveBeenCalledWith(`${BASE_API_URL}test`, { method: 'POST' });
  });

  it('should not cache data if fetch fails when cacheCallback is provided', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Fetch error'));

    const cacheCallback = vi.fn().mockReturnValue(true);
    const data: unknown = await makeRequest({ url: 'test', cacheCallback });

    expect(data).toBeUndefined();
    expect(cacheCallback).not.toHaveBeenCalled();
    expect(localStorage.getItem(`${BASE_API_URL}test`)).toBeNull();
  });
});
