import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fetchWithCache from '../fetchWithCache';
import logger from '../logger';

vi.mock('../logger', () => ({
  default: vi.fn(),
}));

global.fetch = vi.fn();

describe('fetchWithCache', () => {
  const url = 'https://example.com/tasks';
  const mockData = [
    { id: 1, status: 'solved' },
    { id: 2, status: 'partially' },
    { id: 3, status: 'failed' },
  ];

  beforeEach(() => {
    localStorage.clear();
    fetch.mockClear();
    logger.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return cached data if available', async () => {
    localStorage.setItem(url, JSON.stringify(mockData));
    const data = await fetchWithCache(url);
    expect(data).toEqual(mockData);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should fetch data if not in cache', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => mockData,
    });

    const data = await fetchWithCache(url);
    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('should cache data if all tasks are solved, partially, or failed', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => mockData,
    });

    await fetchWithCache(url);
    const cachedData = JSON.parse(localStorage.getItem(url));
    expect(cachedData).toEqual(mockData.map(({ status, id }) => ({ status, id })));
  });

  it('should not cache data if not all tasks are solved, partially, or failed', async () => {
    const incompleteData = [
      { id: 1, status: 'solved' },
      { id: 2, status: 'in-progress' },
    ];

    fetch.mockResolvedValueOnce({
      json: async () => incompleteData,
    });

    await fetchWithCache(url);
    const cachedData = localStorage.getItem(url);
    expect(cachedData).toBeNull();
  });

  it('should log an error and return null if fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const data = await fetchWithCache(url);
    expect(data).toBeNull();
    expect(logger.error).toHaveBeenCalledWith('Failed to fetch or parse data: Error: Network error');
  });
});
