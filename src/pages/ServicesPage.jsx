import { ArrowRight, ClipboardCheck, DoorClosed, Fingerprint, LifeBuoy, Settings2, ShieldCheck } from 'lucide-react';
import PublicPageHero from '../components/PublicPageHero.jsx';

const services = [
  { icon: ClipboardCheck, title: 'CCTV installation', text: 'Our trained technicians handle site surveys, camera positioning, wire planning, installation, uninstallation and maintenance.' },
  { icon: ShieldCheck, title: 'Access control and lock fitting', text: 'Install magnetic locks with precision, or upgrade and maintain an existing access control system.' },
  { icon: Settings2, title: 'Gate automation motor installation', text: 'Our team works with access control, RFID, Bluetooth technologies, board-level programming and electrical installation.' },
  { icon: DoorClosed, title: 'Intelligent door lock installation', text: 'Have smart locks fitted and integrated professionally for convenient keyless entry at home or work.' },
  { icon: Fingerprint, title: 'Attendance system installation', text: 'Set up biometric fingerprint attendance systems for secure, efficient workforce tracking and integration.' },
  { icon: LifeBuoy, title: 'Maintenance and support', text: 'Keep your system reliable with troubleshooting, upgrades, replacement guidance and ongoing support.' },
];

export default function ServicesPage({ onNavigate, onQuote }) {
  return (
    <main className="public-page services-page">
      <PublicPageHero
        eyebrow="BLI services"
        title="Services that make security systems work better."
        description="From CCTV installation and access control to gate automation, intelligent door locks and attendance systems, our trained team helps you get the right setup."
        current="Services"
        onNavigate={onNavigate}
      />
      <section className="public-section">
        <div className="container public-section-heading public-section-heading--split"><div><span className="eyebrow">Our services</span><h2>Services we offer.</h2></div><p>Our experienced and well-trained technicians can survey your site, explain the options and install solutions that are easy to use and maintain.</p></div>
        <div className="container service-grid">{services.map(({ icon: Icon, title, text }) => <article key={title}><span className="service-grid__icon"><Icon size={22} /></span><h3>{title}</h3><p>{text}</p><button className="text-link" type="button" onClick={() => onQuote()}>Discuss this service <ArrowRight size={15} /></button></article>)}</div>
      </section>
      <section className="public-section public-section--soft"><div className="container public-section-heading"><span className="eyebrow">A clear process</span><h2>Simple steps from requirement to handover.</h2></div><div className="container service-process"><article><b>01</b><h3>Discover</h3><p>We understand the site, people and outcome.</p></article><article><b>02</b><h3>Plan</h3><p>We recommend a fit-for-purpose system.</p></article><article><b>03</b><h3>Deploy</h3><p>We install, configure and explain the setup.</p></article><article><b>04</b><h3>Support</h3><p>We remain available as your needs change.</p></article></div></section>
      <section className="container public-cta"><div><span className="eyebrow">Ready to start?</span><h2>Tell us what you need to make safer.</h2><p>We’ll help you choose the right service path.</p></div><button className="button button--primary" type="button" onClick={() => onQuote()}>Request a consultation <ArrowRight size={16} /></button></section>
    </main>
  );
}
