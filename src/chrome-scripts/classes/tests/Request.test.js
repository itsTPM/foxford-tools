import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request } from '../';
import { logger } from '../../modules';

vi.mock('../../modules', () => ({
  logger: {
    error: vi.fn(),
  },
}));

const BASE_API_URL = 'https://foxford.ru/api/';

describe('Request', () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.fn();
    global.fetch = fetchMock;
    localStorage.clear();
  });

  it('should construct with default method GET', () => {
    const request = new Request({ url: 'test' });
    expect(request.url).toBe(`${BASE_API_URL}test`);
    expect(request.method).toBe('GET');
  });

  it('should call fetch with correct URL and method', async () => {
    fetchMock.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({ data: 'test' }),
    });

    const request = new Request({ url: 'test' });
    const data = await request.make();

    expect(fetchMock).toHaveBeenCalledWith(`${BASE_API_URL}test`, { method: 'GET' });
    expect(data).toEqual({ data: 'test' });
  });

  it('should log an error if fetch fails', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Fetch error'));

    const request = new Request({ url: 'test' });
    const data = await request.make();

    expect(logger.error).toHaveBeenCalledWith('Failed to fetch or parse data: Error: Fetch error');
    expect(data).toBeUndefined();
  });

  it('should use cache if cacheCallback is provided and data is cached', async () => {
    localStorage.setItem(`${BASE_API_URL}test`, JSON.stringify({ data: 'cached' }));

    const cacheCallback = vi.fn().mockReturnValue(true);
    const request = new Request({ url: 'test', cacheCallback });
    const data = await request.make();

    expect(data).toEqual({ data: 'cached' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('should fetch and cache data if not cached', async () => {
    fetchMock.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({ data: 'fetched' }),
    });

    const cacheCallback = vi.fn().mockReturnValue(true);
    const request = new Request({ url: 'test', cacheCallback });
    const data = await request.make();

    expect(data).toEqual({ data: 'fetched' });
    expect(localStorage.getItem(`${BASE_API_URL}test`)).toBe(JSON.stringify({ data: 'fetched' }));
  });

  it('should not cache data if cacheCallback returns false', async () => {
    fetchMock.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({ data: 'fetched' }),
    });

    const cacheCallback = vi.fn().mockReturnValue(false);
    const request = new Request({ url: 'test', cacheCallback });
    const data = await request.make();

    expect(data).toEqual({ data: 'fetched' });
    expect(localStorage.getItem(`${BASE_API_URL}test`)).toBeNull();
  });
});
