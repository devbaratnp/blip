import { ArrowRight, CheckCircle2, ChevronRight, FileText, Settings, ShieldCheck, Truck } from 'lucide-react';
import { categories } from '../data/categories.js';
import { featuredProducts } from '../data/products.js';
import { site } from '../data/site.js';
import BrandStrip from '../components/BrandStrip.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import ProductCard from '../components/ProductCard.jsx';

const benefitIcons = { truck: Truck, settings: Settings, shield: ShieldCheck };

export default function HomePage({ onNavigate, onQuote, onAddToCart, onCompare, compareIds }) {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">{site.heroEyebrow}</span>
            <h1>{site.heroTitle}</h1>
            <p>{site.heroDescription}</p>
            <div className="hero-actions"><button className="button button--primary button--large" type="button" onClick={() => onNavigate('/products')}>Shop products <ArrowRight size={17} /></button><button className="button button--outline button--large" type="button" onClick={() => onQuote()}><FileText size={17} />Request a quote</button></div>
          </div>
          <div className="hero-visual"><img src="/assets/hero.jpg" alt="BLI security products for home and business" /><div className="hero-visual__caption"><span className="hero-visual__dot" /><span>Security systems, sourced and supported by BLI</span></div></div>
        </div>
        <div className="container benefits-row">{site.benefits.map((benefit) => { const Icon = benefitIcons[benefit.icon]; return <div className="benefit" key={benefit.title}><span className="benefit__icon"><Icon size={22} /></span><span><strong>{benefit.title}</strong><small>{benefit.description}</small></span></div>; })}</div>
      </section>

      <main>
        <section className="section container">
          <div className="section-heading"><div><span className="eyebrow">Browse by solution</span><h2>Popular categories</h2></div><button className="text-link" type="button" onClick={() => onNavigate('/products')}>View all categories <ArrowRight size={16} /></button></div>
          <div className="category-grid">{categories.slice(0, 6).map((category) => <CategoryCard key={category.id} category={category} onClick={() => onNavigate(`/products?category=${encodeURIComponent(category.name)}`)} />)}</div>
        </section>

        <section className="section section--tint">
          <div className="container">
            <div className="section-heading"><div><span className="eyebrow">Selected for you</span><h2>Featured products</h2></div><button className="text-link" type="button" onClick={() => onNavigate('/products')}>View all products <ArrowRight size={16} /></button></div>
            <div className="product-tabs" role="tablist" aria-label="Featured product categories"><button className="product-tab product-tab--active" type="button" role="tab" aria-selected="true">All products</button>{categories.slice(0, 5).map((category) => <button key={category.id} className="product-tab" type="button" role="tab" onClick={() => onNavigate(`/products?category=${encodeURIComponent(category.name)}`)}>{category.name}</button>)}</div>
            <div className="product-grid">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} onNavigate={onNavigate} onAddToCart={onAddToCart} onQuote={onQuote} onCompare={onCompare} compared={compareIds.includes(product.id)} />)}</div>
          </div>
        </section>

        <section className="section container brand-section"><div className="section-heading"><div><span className="eyebrow">Brands you can trust</span><h2>Shop by brand</h2></div><button className="text-link" type="button" onClick={() => onNavigate('/products')}>View all brands <ArrowRight size={16} /></button></div><BrandStrip brands={site.brands.slice(0, 4)} /></section>

        <section className="container install-banner"><div className="install-banner__copy"><span className="install-banner__icon"><Settings size={28} /></span><div><span className="eyebrow">From product to peace of mind</span><h2>Professional installation support</h2><p>Get expert guidance and installation support for CCTV, fire alarm, access control and more.</p></div></div><button className="button button--primary" type="button" onClick={() => onQuote()}><span>Request installation quote</span><ArrowRight size={16} /></button><div className="install-banner__visual"><img src="/assets/installation.jpg" alt="BLI installation support" /></div></section>
      </main>
      <div className="assurance-strip"><div className="container"><span><CheckCircle2 size={16} />Verified product information</span><span><CheckCircle2 size={16} />Local guidance in Nepal</span><span><CheckCircle2 size={16} />Quote support for projects</span><span><ChevronRight size={16} /></span></div></div>
    </>
  );
}
