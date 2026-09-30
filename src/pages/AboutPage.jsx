import { ArrowRight, CheckCircle2, ShieldCheck, Wrench } from 'lucide-react';
import { site } from '../data/site.js';
import PublicPageHero from '../components/PublicPageHero.jsx';

export default function AboutPage({ onNavigate, onQuote }) {
  return (
    <main className="public-page about-page">
      <PublicPageHero
        eyebrow="About BLI"
        title="Security solutions built around trust."
        description="Bhagya Laxmi International Pvt. Ltd. helps homes, businesses and institutions choose, install and maintain dependable security and communication systems."
        current="About Us"
        onNavigate={onNavigate}
      />

      <section className="public-section">
        <div className="container public-story-grid public-story-grid--intro">
          <div className="public-media public-media--intro">
            <img src="/assets/installation.jpg" alt="BLI security installation support" />
            <span className="public-media__tag">Practical expertise. Long-term support.</span>
          </div>
          <div className="public-copy">
            <span className="eyebrow">Who we are</span>
            <h2>A dependable partner for safer places and smoother operations.</h2>
            <p>{site.name} offers a focused portfolio of CCTV, fire alarm, access control, attendance, PABX, networking and related products.</p>
            <p>We combine genuine products with clear guidance and professional installation so teams can make confident decisions before, during and after deployment.</p>
            <button className="button button--primary" type="button" onClick={() => onQuote()}>Talk to a BLI expert <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      <section className="public-section public-section--soft">
        <div className="container public-section-heading">
          <span className="eyebrow">What guides us</span>
          <h2>Advance. Authentic. Affordable.</h2>
          <p>Our work is shaped by practical technology, honest product advice and support that stays useful after installation day.</p>
        </div>
        <div className="container public-story-stack">
          <article className="public-story-row">
            <div className="public-story-row__copy">
              <span className="public-story-index">01</span>
              <span className="eyebrow">Our vision</span>
              <h3>Make reliable security technology easier to access.</h3>
              <p>We want every organization to have access to dependable, appropriately planned systems—without unnecessary complexity or guesswork.</p>
            </div>
            <div className="public-story-row__media"><img src="/assets/hero-v2.png" alt="Security systems supporting a modern workplace" /></div>
          </article>
          <article className="public-story-row public-story-row--reverse">
            <div className="public-story-row__copy">
              <span className="public-story-index">02</span>
              <span className="eyebrow">Our mission</span>
              <h3>Bring the right products, planning and people together.</h3>
              <p>From a first consultation to future maintenance, our mission is to make security and communication projects clear, scalable and useful in the real world.</p>
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
