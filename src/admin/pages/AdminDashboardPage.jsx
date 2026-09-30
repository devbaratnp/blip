import { ArrowRight, FileText, Image, Package, Radio, Settings2 } from 'lucide-react';

const modules = [
  { label: 'Products', description: 'Manage catalog records, featured items and product media.', path: '/admin/products', icon: Package },
  { label: 'Content pages', description: 'Edit published sections, page copy and SEO metadata.', path: '/admin/pages', icon: FileText },
  { label: 'Media library', description: 'Keep product, client and page imagery organized.', path: '/admin/media', icon: Image },
  { label: 'Leads & enquiries', description: 'Review quote, contact and dealer requests.', path: '/admin/leads', icon: Radio },
  { label: 'Site settings', description: 'Update contact details, links and public settings.', path: '/admin/settings', icon: Settings2 },
];

export default function AdminDashboardPage({ onNavigate }) {
  return <section className="admin-page"><div className="admin-page__head"><div><span className="eyebrow">Admin workspace</span><h1>Keep BLI current.</h1><p>Manage the product catalogue and public content from one focused workspace.</p></div><button className="button button--primary" type="button" onClick={() => onNavigate('/admin/products/new')}>Add product <ArrowRight size={16} /></button></div><div className="admin-notice"><strong>CMS connected</strong><span>Products, structured pages, leads, settings, media and downloads are connected to the Admin workspace. Review the activity log after important changes.</span></div><div className="admin-module-grid">{modules.map(({ label, description, path, icon: Icon }) => <button className="admin-module-card" type="button" key={path} onClick={() => onNavigate(path)}><span className="admin-module-card__icon"><Icon size={20} /></span><span><strong>{label}</strong><small>{description}</small></span><ArrowRight size={16} /></button>)}</div></section>;
}
