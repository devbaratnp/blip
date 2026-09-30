import { ArrowRight, CheckCircle2, FileText, ShieldCheck, Wrench } from 'lucide-react';
import { site } from '../data/site.js';
import ClientLogoMarquee from '../components/ClientLogoMarquee.jsx';

const featuredShowcase = [
  { brand: 'CP PLUS', title: 'CP PLUS Smart WiFi Camera', specs: 'Indoor • 2MP • Motion Detection', image: '/assets/products/cp-plus.png', slug: 'cp-plus-e39a-3mp-wi-fi-pt-camera' },
  { brand: 'CP PLUS', title: 'CP PLUS Bullet Camera', specs: 'Outdoor • 4MP • Night Vision', image: '/assets/products/hikvision.png', slug: 'hikvision-2mp-ir-smart-light-audio-camera' },
  { brand: 'BLI SOLUTIONS', title: 'BLI Network Video Recorder', specs: '8/16 Channel • 4K Support', image: '/assets/categories/networking.jpg', slug: 'networking-switch-router-cabling-solution' },
  { brand: 'AGNI', title: 'Agni Fire Alarm Control Panel', specs: 'Conventional • Reliable Protection', image: '/assets/products/agni.png', slug: 'agni-protection-8-zone-fire-alarm-panel' },
];

const whyBli = [
  { title: 'Authentic Products', description: 'Sourced from reputed brands with assured quality.', icon: ShieldCheck },
  { title: 'Expert Installation', description: 'Trained professionals for seamless deployment and support.', icon: Wrench },
  { title: 'End-to-End Solutions', description: 'From consultation to installation and maintenance — all under one roof.', icon: CheckCircle2 },
];

const projects = [
  { title: 'Corporate offices', image: '/assets/hero-v2.png', note: 'Integrated CCTV and access control' },
  { title: 'Institutions and campuses', image: '/assets/categories/time-attendance.jpg', note: 'Attendance and safer access' },
  { title: 'Industrial and commercial', image: '/assets/categories/fire-alarm.jpg', note: 'Fire safety and operations protection' },
];

export default function HomePage({ onNavigate, onQuote }) {
  return (
    <>
      <section className="hero-section hero-section--immersive">
        <div className="hero-immersive-image"><img src="/assets/hero-v2.png" alt="Security cameras, fire alarm panel, access reader and networking equipment" /></div>
        <div className="container hero-immersive-content">
          <div className="hero-copy">
            <span className="eyebrow">Security systems for a safer tomorrow</span>
            <h1>Security systems for places that matter</h1>
            <p>{site.heroDescription}</p>
            <div className="hero-actions"><button className="button button--primary button--large" type="button" onClick={() => onNavigate('/products')}>Explore solutions <ArrowRight size={17} /></button><button className="button button--outline button--large" type="button" onClick={() => onQuote()}><FileText size={17} />Request a Quote</button></div>
          </div>
        </div>
        <div className="container hero-proof-row"><span><CheckCircle2 size={17} />Trusted Brands &amp; Genuine Products</span><span><CheckCircle2 size={17} />Professional Installation &amp; Support</span><span><CheckCircle2 size={17} />Complete Security Solutions Partner</span></div>
      </section>

      <main>
        <section className="category-strip-section"><div className="container"><span className="eyebrow">Browse our product categories</span><div className="category-strip">{site.productCategoryStrip.map((category) => <button key={category} type="button" onClick={() => onNavigate('/products')}>{category}<ArrowRight size={14} /></button>)}</div></div></section>

        <ClientLogoMarquee onNavigate={onNavigate} />

        <section className="section why-section container"><div className="split-heading"><div><span className="eyebrow">Why BLI</span><h2>Advance. Authentic. Affordable.</h2></div><div className="why-intro"><p>Bhagya Laxmi International Pvt. Ltd. (BLI) delivers reliable security and communication solutions with genuine products, expert guidance and professional installation.</p><button className="text-link" type="button" onClick={() => onNavigate('/products')}>Learn more about BLI <ArrowRight size={16} /></button></div></div><div className="why-grid">{whyBli.map(({ title, description, icon: Icon }, index) => <article className="why-card" key={title}><span className="why-card__number">0{index + 1}</span><span className="why-card__icon"><Icon size={23} /></span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

        <section className="solutions-section section--tint"><div className="container"><div className="section-heading"><div><span className="eyebrow">Our solutions</span><h2>Smart Security for Every Space</h2><p className="section-subtitle">Tailored security and communication systems for diverse environments.</p></div></div><div className="solutions-grid">{site.solutions.map((solution) => <button type="button" className="solution-card" key={solution.title} onClick={() => onNavigate('/products')}><img src={solution.image} alt="" /><span className="solution-card__overlay"><strong>{solution.title}</strong><small>{solution.description}</small><span>Explore solution <ArrowRight size={14} /></span></span></button>)}</div></div></section>

        <section className="section featured-section container"><div className="section-heading"><div><span className="eyebrow">Featured products</span><h2>Trusted Products for Complete Security</h2></div><button className="text-link" type="button" onClick={() => onNavigate('/products')}>View all products <ArrowRight size={16} /></button></div><div className="showcase-grid">{featuredShowcase.map((item, index) => <article className="showcase-card" key={item.title}><div className="showcase-card__topline"><span>{item.brand}</span><b>0{index + 1}</b></div><button className="showcase-card__image" type="button" onClick={() => onNavigate(`/product/${item.slug}`)}><img src={item.image} alt={item.title} /><span>Featured</span></button><div className="showcase-card__copy"><h3>{item.title}</h3><p>{item.specs}</p><div className="showcase-card__actions"><button className="button button--primary" type="button" onClick={() => onQuote()}><FileText size={14} />Inquiry now</button><button className="text-link" type="button" onClick={() => onNavigate(`/product/${item.slug}`)}>View details <ArrowRight size={14} /></button></div></div></article>)}</div></section>

        <section className="projects-section section--navy"><div className="container"><div className="section-heading section-heading--light"><div><span className="eyebrow">Our projects</span><h2>Professional Installation. Real Environments.</h2><p className="section-subtitle">From offices and institutions to commercial and industrial facilities, we design and deploy security systems that keep people, assets and operations safe.</p></div><button className="button button--outline" type="button" onClick={() => onNavigate('/products')}>View our projects <ArrowRight size={16} /></button></div><div className="projects-grid">{projects.map((project) => <article className="project-card" key={project.title}><img src={project.image} alt="" /><div><span>{project.note}</span><h3>{project.title}</h3></div></article>)}</div></div></section>

        <section className="container cta-banner"><div><span className="eyebrow">Need guidance?</span><h2>Talk to Our Security Experts</h2><p>Get the right solution for your space. We'll help you choose, plan and install the best-fit systems for your requirements.</p></div><button className="button button--primary button--large" type="button" onClick={() => onQuote()}>Request a Free Consultation <ArrowRight size={16} /></button></section>

        <section className="section testimonial-section container"><div className="section-heading"><div><span className="eyebrow">Testimonials</span><h2>What Our Clients Say</h2></div><button className="text-link" type="button" onClick={() => onNavigate('/products')}>View more testimonials <ArrowRight size={16} /></button></div><blockquote>“BLI provided a complete CCTV and access control solution for our office. The team was professional, the installation was smooth and the support has been excellent.”<cite>— Business Customer</cite></blockquote></section>
      </main>
      <div className="assurance-strip"><div className="container"><span><CheckCircle2 size={16} />Verified product information</span><span><CheckCircle2 size={16} />Local guidance in Nepal</span><span><CheckCircle2 size={16} />Quote support for projects</span></div></div>
    </>
  );
}
