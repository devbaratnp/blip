import { fallbackContent, fallbackSettings } from './contentFallback.js';

const apiBase = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

async function getPublic(path) {
  const response = await fetch(apiBase + path, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('Public content request failed.');
  return response.json();
}

export async function getPublicPage(slug, fallback = null) {
  try {
    const payload = await getPublic('/api/v1/public/pages/' + encodeURIComponent(slug));
    return { data: payload.data || payload, source: 'api', error: null };
  } catch (error) {
    return { data: fallback, source: 'fallback', error };
  }
}

export async function getPublicSettings() {
  try {
    const payload = await getPublic('/api/v1/public/settings');
    return { ...fallbackSettings, ...(payload.data || payload), source: 'api' };
  } catch {
    return { ...fallbackContent.settings, source: 'fallback' };
  }
}
