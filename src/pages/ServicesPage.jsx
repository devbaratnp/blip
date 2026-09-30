import { ArrowRight, ClipboardCheck, LifeBuoy, Settings2, ShieldCheck } from 'lucide-react';
import PublicPageHero from '../components/PublicPageHero.jsx';

const services = [
  { icon: ClipboardCheck, title: 'Consultation and site planning', text: 'Understand coverage, access points, workflows and priorities before choosing products.' },
  { icon: ShieldCheck, title: 'Security system supply', text: 'Source cameras, recorders, fire alarm, access control, attendance and networking products from trusted brands.' },
  { icon: Settings2, title: 'Professional installation', text: 'Deploy a clean, usable system with setup, configuration and practical handover.' },
  { icon: LifeBuoy, title: 'Maintenance and support', text: 'Keep systems reliable with troubleshooting, upgrades, replacement guidance and ongoing support.' },
];

export default function ServicesPage({ onNavigate, onQuote }) {
  return (
    <main className="public-page services-page">
      <PublicPageHero
        eyebrow="BLI services"
        title="From first plan to everyday support."
        description="We help you move from a security requirement to a working system your people can use and maintain."
        current="Services"
        onNavigate={onNavigate}
      />
      <section className="public-section">
        <div className="container public-section-heading public-section-heading--split"><div><span className="eyebrow">Our services</span><h2>Practical support at every important step.</h2></div><p>Whether you need a single product or an end-to-end deployment, BLI can help you make a clear decision and keep the work moving.</p></div>
        <div className="container service-grid">{services.map(({ icon: Icon, title, text }) => <article key={title}><span className="service-grid__icon"><Icon size={22} /></span><h3>{title}</h3><p>{text}</p><button className="text-link" type="button" onClick={() => onQuote()}>Discuss this service <ArrowRight size={15} /></button></article>)}</div>
      </section>
      <section className="public-section public-section--soft"><div className="container public-section-heading"><span className="eyebrow">A clear process</span><h2>Simple steps from requirement to handover.</h2></div><div className="container service-process"><article><b>01</b><h3>Discover</h3><p>We understand the site, people and outcome.</p></article><article><b>02</b><h3>Plan</h3><p>We recommend a fit-for-purpose system.</p></article><article><b>03</b><h3>Deploy</h3><p>We install, configure and explain the setup.</p></article><article><b>04</b><h3>Support</h3><p>We remain available as your needs change.</p></article></div></section>
      <section className="container public-cta"><div><span className="eyebrow">Ready to start?</span><h2>Tell us what you need to make safer.</h2><p>We’ll help you choose the right service path.</p></div><button className="button button--primary" type="button" onClick={() => onQuote()}>Request a consultation <ArrowRight size={16} /></button></section>
    </main>
  );
}
