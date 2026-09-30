import { ArrowDownToLine, ArrowRight, FileText, Mail } from 'lucide-react';
import { site } from '../data/site.js';
import PublicPageHero from '../components/PublicPageHero.jsx';

const resources = [
  { title: 'Product catalogue', text: 'A useful starting point for CCTV, fire alarm, access control, attendance, PABX and networking products.', label: 'Catalogue request' },
  { title: 'Project planning brief', text: 'Share the basics of your site, coverage goals and installation requirements with our team.', label: 'Planning request' },
  { title: 'Installation and support guide', text: 'Understand what to prepare before installation and what a practical handover includes.', label: 'Guide request' },
];

export default function DownloadPage({ onNavigate }) {
  return (
    <main className="public-page download-page">
      <PublicPageHero
        eyebrow="BLI resources"
        title="Resources for better security decisions."
        description="Get the information you need to compare options, prepare your site and start a useful conversation with BLI."
        current="Download"
        onNavigate={onNavigate}
      />
      <section className="public-section">
        <div className="container public-section-heading public-section-heading--split"><div><span className="eyebrow">Resource library</span><h2>Useful documents, shared when you need them.</h2></div><p>Tell us which resource you need and we’ll send the most relevant information for your project.</p></div>
        <div className="container resource-grid">{resources.map((resource) => <article key={resource.title}><span className="resource-grid__icon"><FileText size={22} /></span><span className="eyebrow">BLI resource</span><h3>{resource.title}</h3><p>{resource.text}</p><a className="text-link" href={`mailto:${site.email}?subject=${encodeURIComponent(resource.label)}`}>Request this resource <ArrowRight size={15} /></a></article>)}</div>
      </section>
      <section className="public-section public-section--soft"><div className="container download-contact"><div><span className="eyebrow">Need something specific?</span><h2>Ask us for the right document.</h2><p>Our team can share product information, specifications or project guidance based on your requirement.</p></div><div><a className="button button--primary" href={`mailto:${site.email}`}><Mail size={16} />Email BLI</a><button className="button button--outline" type="button" onClick={() => onNavigate('/contact')}>Contact us <ArrowRight size={16} /></button></div></div></section>
    </main>
  );
}
