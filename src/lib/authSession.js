import { apiGet, apiPost, setApiAuthToken } from './apiClient.js';

export const getCurrentAdmin = () => apiGet('/api/v1/auth/me');
export async function loginAdmin(credentials) {
  const payload = await apiPost('/api/v1/auth/login', credentials);
  setApiAuthToken(payload.token);
  return payload;
}

export async function logoutAdmin() {
  try {
    return await apiPost('/api/v1/auth/logout', {});
  } finally {
    setApiAuthToken(null);
  }
}
