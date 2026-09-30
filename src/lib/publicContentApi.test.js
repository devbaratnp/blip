import { afterEach, describe, expect, test, vi } from 'vitest';
import { getPublicPage, getPublicSettings } from './publicContentApi.js';

afterEach(() => vi.restoreAllMocks());

describe('public content adapter', () => {
  test('returns published API page content when available', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ data: { slug: 'about', status: 'published' } }), { status: 200 })));
    await expect(getPublicPage('about')).resolves.toMatchObject({ source: 'api', data: { slug: 'about' } });
  });

  test('falls back to local settings when the API is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    await expect(getPublicSettings()).resolves.toMatchObject({ source: 'fallback', email: 'info@bli.com.np' });
  });
});
