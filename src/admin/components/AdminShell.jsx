import { useState } from 'react';
import { ChevronDown, ExternalLink, LogOut, Menu, X } from 'lucide-react';
import { adminNavigation } from '../adminRoutes.js';

export default function AdminShell({ user, path, onNavigate, onLogout, children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const groups = [...new Set(adminNavigation.map((item) => item.group))];
  const navigate = (nextPath) => { setDrawerOpen(false); onNavigate(nextPath); };

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${drawerOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__brand"><span className="admin-sidebar__mark">BLI</span><div><strong>Admin panel</strong><small>Content &amp; commerce</small></div><button className="admin-mobile-close" type="button" onClick={() => setDrawerOpen(false)} aria-label="Close admin navigation"><X size={18} /></button></div>
        <nav className="admin-nav" aria-label="Admin navigation">
          {groups.map((group) => <div className="admin-nav__group" key={group}><span className="admin-nav__label">{group}</span>{adminNavigation.filter((item) => item.group === group).map((item) => { const active = path === item.path || path.startsWith(`${item.path}/`); return <a className={active ? 'admin-nav__item admin-nav__item--active' : 'admin-nav__item'} aria-current={active ? 'page' : undefined} href={item.path} key={item.path} onClick={(event) => { event.preventDefault(); navigate(item.path); }}>{item.label}</a>; })}</div>)}
        </nav>
        <div className="admin-sidebar__bottom"><a href="/" onClick={(event) => { event.preventDefault(); onNavigate('/'); }}><ExternalLink size={15} /> View public site</a><button type="button" onClick={onLogout}><LogOut size={15} /> Sign out</button></div>
      </aside>
      {drawerOpen && <button className="admin-sidebar-backdrop" type="button" aria-label="Close admin navigation" onClick={() => setDrawerOpen(false)} />}
      <div className="admin-main"><header className="admin-topbar"><button className="admin-mobile-menu" type="button" onClick={() => setDrawerOpen(true)} aria-label="Open admin navigation"><Menu size={21} /></button><div><span className="eyebrow">BLI workspace</span><strong>Security solutions content</strong></div><div className="admin-user"><span>{user.name}</span><small>Admin</small><ChevronDown size={15} /></div></header><main className="admin-content">{children}</main></div>
    </div>
  );
}
