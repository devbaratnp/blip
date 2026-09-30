import { ArrowRight, BookOpen, Headphones, Mail, Phone, ShieldCheck, Wrench } from 'lucide-react';
import { site } from '../data/site.js';
import PublicPageHero from '../components/PublicPageHero.jsx';

const helpTopics = [
  { icon: BookOpen, title: 'Product guidance', text: 'Get help comparing cameras, recorders, access control, attendance, fire alarm and networking options.' },
  { icon: Wrench, title: 'Installation support', text: 'Share your site requirements and our team can guide planning, setup and handover.' },
  { icon: ShieldCheck, title: 'After-sales support', text: 'We can help with troubleshooting, compatibility checks, maintenance and upgrades.' },
  { icon: Headphones, title: 'Talk to a person', text: 'If you are unsure where to start, contact the BLI team and we’ll route your question.' },
];

export default function HelpCenterPage({ onNavigate }) {
  return (
    <main className="public-page help-page">
      <PublicPageHero
        eyebrow="Help center"
        title="Support that keeps your system moving."
        description="Find the right starting point for product questions, installation guidance and ongoing support."
        current="Help Center"
        onNavigate={onNavigate}
      />
      <section className="public-section">
        <div className="container public-section-heading"><span className="eyebrow">How can we help?</span><h2>Start with the kind of support you need.</h2><p>Our team can help you make a decision, solve a problem or plan the next stage of your system.</p></div>
        <div className="container help-topic-grid">{helpTopics.map(({ icon: Icon, title, text }) => <article key={title}><span className="help-topic-grid__icon"><Icon size={21} /></span><h3>{title}</h3><p>{text}</p><button className="text-link" type="button" onClick={() => onNavigate('/contact')}>Get help <ArrowRight size={15} /></button></article>)}</div>
      </section>
      <section className="public-section public-section--soft">
        <div className="container help-contact-panel"><div><span className="eyebrow">Need a direct answer?</span><h2>Contact the BLI support team.</h2><p>Tell us the product, site or issue you’re dealing with and include any useful details.</p></div><div className="help-contact-panel__actions"><a className="button button--primary" href={`tel:${site.phoneHref}`}><Phone size={16} />{site.phoneDisplay}</a><a className="button button--outline" href={`mailto:${site.email}`}><Mail size={16} />{site.email}</a></div></div>
      </section>
    </main>
  );
}
