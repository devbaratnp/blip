export const adminNavigation = [
  { label: 'Dashboard', path: '/admin', group: 'Workspace' },
  { label: 'Products', path: '/admin/products', group: 'Catalog' },
  { label: 'Categories', path: '/admin/categories', group: 'Catalog' },
  { label: 'Content pages', path: '/admin/pages', group: 'Content' },
  { label: 'Media library', path: '/admin/media', group: 'Content' },
  { label: 'Leads & enquiries', path: '/admin/leads', group: 'Leads' },
  { label: 'Downloads', path: '/admin/downloads', group: 'Content' },
  { label: 'Settings', path: '/admin/settings', group: 'System' },
  { label: 'Activity log', path: '/admin/activity', group: 'System' },
];

export function readAdminRoute(pathname = window.location.pathname) {
  const normalized = pathname.replace(/\/$/, '') || '/admin';
  if (normalized === '/admin' || normalized === '/admin/login') return { kind: normalized === '/admin/login' ? 'login' : 'dashboard' };
  if (normalized.startsWith('/admin/products')) return { kind: 'products', id: normalized.split('/')[3] || null };
  if (normalized.startsWith('/admin/categories')) return { kind: 'categories' };
  if (normalized.startsWith('/admin/pages')) return { kind: 'pages', id: normalized.split('/')[3] || null };
  if (normalized.startsWith('/admin/media')) return { kind: 'media' };
  if (normalized.startsWith('/admin/leads')) return { kind: 'leads', id: normalized.split('/')[3] || null };
  if (normalized.startsWith('/admin/downloads')) return { kind: 'downloads' };
  if (normalized.startsWith('/admin/settings')) return { kind: 'settings' };
  if (normalized.startsWith('/admin/activity')) return { kind: 'activity' };
  return { kind: 'dashboard' };
}
