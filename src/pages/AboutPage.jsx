import { ArrowRight, CheckCircle2, ShieldCheck, Wrench } from 'lucide-react';
import PublicPageHero from '../components/PublicPageHero.jsx';

export default function AboutPage({ onNavigate, onQuote, current = 'About Us', eyebrow = 'About BLI' }) {
  return (
    <main className="public-page about-page">
      <PublicPageHero
        eyebrow={eyebrow}
        title="Advance, authentic and affordable security solutions for all."
        description="Bhagya Laxmi brings updated technology and dependable security solutions together in one place for homes, businesses and institutions."
        current={current}
        onNavigate={onNavigate}
      />

      <section className="public-section">
        <div className="container public-story-grid public-story-grid--intro">
          <div className="public-media public-media--intro">
            <img src="/assets/installation.jpg" alt="BLI security installation support" />
            <span className="public-media__tag">Practical expertise. Long-term support.</span>
          </div>
          <div className="public-copy">
            <span className="eyebrow">About us</span>
            <h2>Intelligent security and surveillance solutions for the places that matter.</h2>
            <p>Bhagya Laxmi offers a wide portfolio of products. It covers CCTV Camera, DVR, NVR, PABX System, Biometric Attendance, Access Control, Video Door Phone, PA System, Burglar Alarm System, Fire Alarm System, and many more.</p>
            <p>Bhagya Laxmi brings intelligent security and surveillance solutions that protect people, properties and assets. They ensure safety, security and productivity in various aspects and help make your premises safer.</p>
            <p>At present, we are serving governments, hotels, hospitals, educational institutes, homes, infrastructure and transportation, among others. We bring efficient, reliable, scalable and integrated solutions to our customers.</p>
            <button className="button button--primary" type="button" onClick={() => onQuote()}>Talk to a BLI expert <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      <section className="public-section public-section--soft">
        <div className="container public-section-heading">
          <span className="eyebrow">What guides us</span>
          <h2>Advance. Authentic. Affordable.</h2>
          <p>We are committed to making a positive impact by providing updated advanced technology and most of the security solutions in one place.</p>
        </div>
        <div className="container public-story-stack">
          <article className="public-story-row">
            <div className="public-story-row__copy">
              <span className="public-story-index">01</span>
              <span className="eyebrow">Our vision</span>
              <h3>Make our country more secure with affordable solutions.</h3>
              <p>We aim to make contemporary security solutions available worldwide—easy to use, more advanced, more valuable and more affordable.</p>
            </div>
            <div className="public-story-row__media"><img src="/assets/hero-v2.png" alt="Security systems supporting a modern workplace" /></div>
          </article>
          <article className="public-story-row public-story-row--reverse">
            <div className="public-story-row__copy">
              <span className="public-story-index">02</span>
              <span className="eyebrow">Our mission</span>
              <h3>Support customers, dealers and partners with fair practices.</h3>
              <p>We care about our dealers by bringing diversified and profitable products, and promote fair practices in all our dealings with employees, customers and dealers.</p>
            </div>
            <div className="public-story-row__media"><img src="/assets/categories/access-control.jpg" alt="Access control system installed for a business" /></div>
          </article>
        </div>
      </section>

      <section className="public-section">
        <div className="container public-section-heading public-section-heading--split">
          <div><span className="eyebrow">Why teams choose BLI</span><h2>Support that covers the whole decision.</h2></div>
          <p>We work across homes, offices, institutions, hospitality, retail and industrial environments with a consistent focus on fit, quality and service.</p>
        </div>
        <div className="container public-trust-grid">
          <article><div className="public-trust-icon"><CheckCircle2 size={21} /></div><h3>Authentic products</h3><p>Source from trusted brands with clear specifications and dependable quality.</p></article>
          <article><div className="public-trust-icon"><Wrench size={21} /></div><h3>Expert installation</h3><p>Plan and deploy systems with trained support for a cleaner handover.</p></article>
          <article><div className="public-trust-icon"><ShieldCheck size={21} /></div><h3>End-to-end support</h3><p>Keep one partner close from consultation through maintenance and upgrades.</p></article>
        </div>
      </section>

      <section className="container public-cta">
        <div><span className="eyebrow">Need guidance?</span><h2>Let’s plan the right solution for your space.</h2><p>Tell us what you need to protect, connect or manage.</p></div>
        <button className="button button--primary" type="button" onClick={() => onQuote()}>Request a quote <ArrowRight size={16} /></button>
      </section>
    </main>
  );
}
