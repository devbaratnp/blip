import { describe, expect, test } from 'vitest';
import { readAdminRoute } from './adminRoutes.js';

describe('admin route parsing', () => {
  test('recognizes dashboard and login routes', () => {
    expect(readAdminRoute('/admin')).toEqual({ kind: 'dashboard' });
    expect(readAdminRoute('/admin/login')).toEqual({ kind: 'login' });
  });

  test('maps nested admin modules to their workspace kind', () => {
    expect(readAdminRoute('/admin/products/new')).toEqual({ kind: 'products', id: 'new' });
    expect(readAdminRoute('/admin/pages/home')).toEqual({ kind: 'pages' });
    expect(readAdminRoute('/admin/leads/42')).toEqual({ kind: 'leads' });
  });

  test('falls back to dashboard for an unknown admin path', () => {
    expect(readAdminRoute('/admin/unknown')).toEqual({ kind: 'dashboard' });
  });
});
