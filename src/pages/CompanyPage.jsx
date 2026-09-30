import { ArrowRight, CheckCircle2, Globe2, UsersRound } from 'lucide-react';
import { site } from '../data/site.js';
import PublicPageHero from '../components/PublicPageHero.jsx';

export default function CompanyPage({ onNavigate, onQuote }) {
  return (
    <main className="public-page company-page">
      <PublicPageHero
        eyebrow="The BLI company"
        title="A local partner for systems that protect and connect."
        description="BLI brings together trusted products, practical expertise and responsive service for organizations across Nepal."
        current="Company"
        onNavigate={onNavigate}
      />
      <section className="public-section">
        <div className="container public-info-grid">
          <div className="public-copy"><span className="eyebrow">Our company</span><h2>Clear advice. Genuine products. Reliable follow-through.</h2><p>{site.name} works with homes, businesses, institutions and infrastructure teams to make security and communication projects easier to plan and maintain.</p><p>Our approach is straightforward: understand the environment, recommend what fits, install it carefully and stay available when the system needs attention.</p><button className="button button--primary" type="button" onClick={() => onQuote()}>Talk to BLI <ArrowRight size={16} /></button></div>
          <aside className="public-side-panel"><div className="public-side-panel__mark"><Globe2 size={25} /></div><span className="eyebrow">Where we work</span><h3>Supporting real environments across Nepal.</h3><p>From offices and retail spaces to institutions, hotels and industrial sites, we help teams choose systems that make sense for how they work.</p><div className="public-side-panel__line"><CheckCircle2 size={16} />Consultation to maintenance</div><div className="public-side-panel__line"><CheckCircle2 size={16} />Products from trusted brands</div></aside>
        </div>
      </section>
      <section className="public-section public-section--soft">
        <div className="container public-section-heading"><span className="eyebrow">How we work</span><h2>One team across the project lifecycle.</h2></div>
        <div className="container public-info-cards"><article><span>01</span><h3>Listen first</h3><p>We start with the people, space and risk your system needs to support.</p></article><article><span>02</span><h3>Recommend clearly</h3><p>We explain the trade-offs so the right choice is easy to understand.</p></article><article><span>03</span><h3>Stay involved</h3><p>We support installation, handover and future improvements with care.</p></article></div>
      </section>
      <section className="container public-cta"><div><span className="eyebrow">Work with BLI</span><h2>Have a project in mind?</h2><p>Let’s understand the environment and map the next step.</p></div><button className="button button--primary" type="button" onClick={() => onQuote()}>Request a quote <ArrowRight size={16} /></button></section>
    </main>
  );
}
