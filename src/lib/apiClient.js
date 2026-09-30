const apiBase = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
const authTokenKey = 'bli.admin.token';
let csrfReady = false;

function xsrfToken() {
  const token = document.cookie.split('; ').find((value) => value.startsWith('XSRF-TOKEN='));
  return token ? decodeURIComponent(token.substring('XSRF-TOKEN='.length)) : '';
}

export function setApiAuthToken(token) {
  if (token) sessionStorage.setItem(authTokenKey, token);
  else sessionStorage.removeItem(authTokenKey);
}

function apiAuthToken() {
  return sessionStorage.getItem(authTokenKey) || '';
}

export class ApiError extends Error {
  constructor(message, status, payload = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

export async function ensureCsrfCookie() {
  if (csrfReady) return;
  const response = await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: 'include' });
  if (!response.ok) throw new ApiError('Could not start a secure session.', response.status);
  csrfReady = true;
}

export async function apiRequest(path, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const csrfRetry = options._csrfRetry === true;
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) await ensureCsrfCookie();

  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    method,
    credentials: 'include',
    headers: { Accept: 'application/json', ...(options.body && !(options.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}), ...(apiAuthToken() ? { Authorization: 'Bearer ' + apiAuthToken() } : {}), ...(method !== 'GET' && xsrfToken() ? { 'X-XSRF-TOKEN': xsrfToken() } : {}), ...(options.headers || {}) },
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    if (response.status === 419 && !csrfRetry) {
      csrfReady = false;
      await ensureCsrfCookie();
      return apiRequest(path, { ...options, _csrfRetry: true });
    }
    if (response.status === 419) csrfReady = false;
    throw new ApiError(payload?.message || 'The request could not be completed.', response.status, payload);
  }
  return payload;
}

export const apiGet = (path) => apiRequest(path);
export const apiPost = (path, body) => apiRequest(path, { method: 'POST', body: JSON.stringify(body) });
export const apiPatch = (path, body) => apiRequest(path, { method: 'PATCH', body: JSON.stringify(body) });
export const apiUpload = (path, body) => apiRequest(path, { method: 'POST', body });
