import { useEffect, useState } from 'react';
import { ApiError } from '../lib/apiClient.js';
import { getCurrentAdmin, loginAdmin, logoutAdmin } from '../lib/authSession.js';
import { readAdminRoute } from './adminRoutes.js';
import AdminShell from './components/AdminShell.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import AdminPlaceholderPage from './pages/AdminPlaceholderPage.jsx';
import AdminProductsPage from './pages/AdminProductsPage.jsx';

const placeholderPages = {
  products: ['Products', 'The catalog manager will be connected to the products API here.'],
  categories: ['Categories', 'The category manager will be connected to the taxonomy API here.'],
  pages: ['Content pages', 'The structured page editor will be connected to the CMS API here.'],
  media: ['Media library', 'The media picker and upload workflow will be connected here.'],
  leads: ['Leads & enquiries', 'The enquiry inbox will be connected to the leads API here.'],
  downloads: ['Downloads', 'The resource manager will be connected to the downloads API here.'],
  settings: ['Settings', 'The public site settings editor will be connected here.'],
  activity: ['Activity log', 'The immutable audit log will be connected here.'],
};

export default function AdminApp({ path, onNavigate }) {
  const [session, setSession] = useState({ status: 'loading', user: null, error: '' });
  const adminRoute = readAdminRoute(path);

  useEffect(() => {
    let active = true;
    getCurrentAdmin().then((payload) => { if (active) setSession({ status: 'authenticated', user: payload.user, error: '' }); }).catch((error) => { if (active) setSession({ status: error instanceof ApiError && error.status !== 0 ? 'anonymous' : 'error', user: null, error: '' }); });
    return () => { active = false; };
  }, []);

  const handleLogin = async (credentials) => {
    setSession((current) => ({ ...current, status: 'signing-in', error: '' }));
    try { const payload = await loginAdmin(credentials); setSession({ status: 'authenticated', user: payload.user, error: '' }); onNavigate('/admin'); } catch (error) { setSession({ status: 'anonymous', user: null, error: error.payload?.errors?.email?.[0] || error.message }); }
  };

  const handleLogout = async () => { await logoutAdmin().catch(() => undefined); setSession({ status: 'anonymous', user: null, error: '' }); onNavigate('/admin/login'); };

  if (session.status === 'loading' || session.status === 'signing-in') return <div className="admin-loading" role="status">Loading Admin workspace…</div>;
  if (adminRoute.kind === 'login' || session.status === 'anonymous' || session.status === 'error') return <AdminLoginPage onSubmit={handleLogin} error={session.error} busy={session.status === 'signing-in'} />;

  const page = adminRoute.kind === 'dashboard' ? <AdminDashboardPage onNavigate={onNavigate} /> : adminRoute.kind === 'products' ? <AdminProductsPage productId={adminRoute.id} onNavigate={onNavigate} /> : <AdminPlaceholderPage title={placeholderPages[adminRoute.kind]?.[0] || 'Admin module'} description={placeholderPages[adminRoute.kind]?.[1] || 'This admin route is not configured yet.'} onNavigate={onNavigate} />;
  return <AdminShell user={session.user} path={path.replace(/\/$/, '') || '/admin'} onNavigate={onNavigate} onLogout={handleLogout}>{page}</AdminShell>;
}
