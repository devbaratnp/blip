import { ArrowLeft } from 'lucide-react';

export default function AdminPlaceholderPage({ title, description, onNavigate }) {
  return <section className="admin-page"><button className="text-link admin-back-link" type="button" onClick={() => onNavigate('/admin')}><ArrowLeft size={15} />Back to dashboard</button><div className="admin-empty"><span className="eyebrow">Admin module</span><h1>{title}</h1><p>{description}</p><p className="admin-empty__note">This route is reserved for the next implementation slice; no fake records are shown.</p></div></section>;
}
