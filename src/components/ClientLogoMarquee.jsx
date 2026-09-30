import { ArrowRight } from 'lucide-react';
import { clientImages } from '../data/clientImages.js';

function LogoSet({ suffix = '' }) {
  return (
    <div className="client-marquee__set" aria-hidden={suffix ? 'true' : undefined}>
      {clientImages.map((client) => (
        <span className="client-logo" key={`${client.filename}${suffix}`}>
          <img src={`/assets/clients/${client.filename}`} alt={suffix ? '' : client.alt} />
        </span>
      ))}
    </div>
  );
}

export default function ClientLogoMarquee({ onNavigate }) {
  return (
    <section className="client-marquee-section" aria-label="BLI client logos">
      <div className="container client-marquee__heading">
        <div><span className="eyebrow">Trusted by organizations</span><h2>Built for real environments.</h2></div>
        <button className="text-link" type="button" onClick={() => onNavigate('/products')}>View our projects <ArrowRight size={16} /></button>
      </div>
      <div className="client-marquee" role="presentation">
        <div className="client-marquee__track"><LogoSet /><LogoSet suffix="-duplicate" /></div>
      </div>
    </section>
  );
}
