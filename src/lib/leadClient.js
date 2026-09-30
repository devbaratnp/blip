import { apiPost } from './apiClient.js';

export function newIdempotencyKey() {
  return globalThis.crypto?.randomUUID?.() || 'lead-' + Date.now() + '-' + Math.random().toString(36).slice(2);
}

export function submitPublicLead(payload) {
  return apiPost('/api/v1/leads', { ...payload, idempotencyKey: payload.idempotencyKey || newIdempotencyKey() });
}
