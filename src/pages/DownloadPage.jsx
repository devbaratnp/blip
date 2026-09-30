import { useEffect, useState } from 'react';
import { ArrowDownToLine, ArrowRight, FileText, Mail } from 'lucide-react';
import { site } from '../data/site.js';
import { getPublicDownloads } from '../lib/publicContentApi.js';
import PublicPageHero from '../components/PublicPageHero.jsx';

const resources = [
  { title: 'IVR', text: 'View the available IVR product resource for the current BLI range.', label: 'IVR resource', href: 'https://www.bli.com.np/uploads/download/IP-PTZ-5M-20X.docx' },
  { title: 'Product catalogue', text: 'Explore CCTV Camera, DVR, NVR, PABX, biometric attendance, access control, video door phone, PA, burglar alarm and fire alarm products.', label: 'Product catalogue request' },
  { title: 'Project planning brief', text: 'Share your site, coverage goals and installation requirements with the BLI team for the right guidance.', label: 'Project planning request' },
];

export default function DownloadPage({ onNavigate }) {
  const [items, setItems] = useState(resources);
  useEffect(() => { getPublicDownloads(resources).then((result) => { if (result.data?.length) setItems(result.data.map((item) => ({ title: item.title, text: item.description, label: item.title, href: item.url }))); }); }, []);
  return (
    <main className="public-page download-page">
      <PublicPageHero
        eyebrow="BLI resources"
        title="Download the information you need."
        description="Access available BLI resources, or contact our team for product information and project guidance."
        current="Download"
        onNavigate={onNavigate}
      />
      <section className="public-section">
        <div className="container public-section-heading public-section-heading--split"><div><span className="eyebrow">Available resources</span><h2>Information for products, planning and support.</h2></div><p>Download the available document directly or contact BLI for the resource that fits your requirement.</p></div>
        <div className="container resource-grid">{items.map((resource) => <article key={resource.title}><span className="resource-grid__icon">{resource.href ? <ArrowDownToLine size={22} /> : <FileText size={22} />}</span><span className="eyebrow">BLI resource</span><h3>{resource.title}</h3><p>{resource.text}</p><a className="text-link" href={resource.href || `mailto:${site.email}?subject=${encodeURIComponent(resource.label)}`} target={resource.href ? '_blank' : undefined} rel={resource.href ? 'noreferrer' : undefined}>{resource.href ? 'Download resource' : 'Request this resource'} {resource.href ? <ArrowDownToLine size={15} /> : <ArrowRight size={15} />}</a></article>)}</div>
      </section>
      <section className="public-section public-section--soft"><div className="container download-contact"><div><span className="eyebrow">Need something specific?</span><h2>Ask us for the right document.</h2><p>Our team can share product information, specifications or project guidance based on your requirement.</p></div><div><a className="button button--primary" href={`mailto:${site.email}`}><Mail size={16} />Email BLI</a><button className="button button--outline" type="button" onClick={() => onNavigate('/contact')}>Contact us <ArrowRight size={16} /></button></div></div></section>
    </main>
  );
}
