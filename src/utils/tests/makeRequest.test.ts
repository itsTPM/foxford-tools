import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ofetch, FetchError } from 'ofetch';
import { makeRequest } from '../makeRequest';
import { logger } from '../logger';

vi.mock('ofetch');
vi.mock('../logger', () => ({
  logger: {
    error: vi.fn(),
  },
}));

const BASE_API_URL = 'https://foxford.ru/api/';

describe('makeRequest', () => {
  beforeEach(() => {
    vi.mocked(ofetch).mockReset();
    localStorage.clear();
  });

  it('should call ofetch with correct URL and method', async () => {
    vi.mocked(ofetch).mockResolvedValueOnce({ data: 'test' });

    const data = await makeRequest({ url: 'test' });

    expect(ofetch).toHaveBeenCalledWith(`${BASE_API_URL}test`, { method: 'GET' });
    expect(data).toEqual({ data: 'test' });
  });

  it('should log an error if fetch fails', async () => {
    const fetchError = new FetchError('Fetch error');
    vi.mocked(ofetch).mockRejectedValueOnce(fetchError);

    const data = await makeRequest({ url: 'test' });

    expect(logger.error).toHaveBeenCalledWith(fetchError.message);
    expect(data).toBeUndefined();
  });

  it('should use cache if cacheCallback is provided and data is cached', async () => {
    localStorage.setItem(`${BASE_API_URL}test`, JSON.stringify({ data: 'cached' }));

    const cacheCallback = vi.fn<(data: unknown) => boolean>().mockReturnValue(true);
    const data = await makeRequest({ url: 'test', cacheCallback });

    expect(data).toEqual({ data: 'cached' });
    expect(ofetch).not.toHaveBeenCalled();
  });

  it('should fetch and cache data if not cached', async () => {
    vi.mocked(ofetch).mockResolvedValueOnce({ data: 'fetched' });

    const cacheCallback = vi.fn<(data: unknown) => boolean>().mockReturnValue(true);
    const data = await makeRequest({ url: 'test', cacheCallback });

    expect(data).toEqual({ data: 'fetched' });
    expect(localStorage.getItem(`${BASE_API_URL}test`)).toBe(JSON.stringify({ data: 'fetched' }));
  });

  it('should not cache data if cacheCallback returns false', async () => {
    vi.mocked(ofetch).mockResolvedValueOnce({ data: 'fetched' });

    const cacheCallback = vi.fn<(data: unknown) => boolean>().mockReturnValue(false);
    const data = await makeRequest({ url: 'test', cacheCallback });

    expect(data).toEqual({ data: 'fetched' });
    expect(localStorage.getItem(`${BASE_API_URL}test`)).toBeNull();
  });

  it('should pass custom method to ofetch', async () => {
    vi.mocked(ofetch).mockResolvedValueOnce({ data: 'test' });

    await makeRequest({ url: 'test', method: 'POST' });

    expect(ofetch).toHaveBeenCalledWith(`${BASE_API_URL}test`, { method: 'POST' });
  });

  it('should not cache data if fetch fails when cacheCallback is provided', async () => {
    vi.mocked(ofetch).mockRejectedValueOnce(new FetchError('Fetch error'));

    const cacheCallback = vi.fn<(data: unknown) => boolean>().mockReturnValue(true);
    const data = await makeRequest({ url: 'test', cacheCallback });

    expect(data).toBeUndefined();
    expect(cacheCallback).not.toHaveBeenCalled();
    expect(localStorage.getItem(`${BASE_API_URL}test`)).toBeNull();
  });

  it('should deduplicate concurrent requests to the same URL', async () => {
    vi.mocked(ofetch).mockResolvedValueOnce({ data: 'test' });

    const [a, b] = await Promise.all([makeRequest({ url: 'test' }), makeRequest({ url: 'test' })]);

    expect(ofetch).toHaveBeenCalledTimes(1);
    expect(a).toEqual({ data: 'test' });
    expect(b).toEqual({ data: 'test' });
  });
});
