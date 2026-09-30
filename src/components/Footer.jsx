import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { categories } from '../data/categories.js';
import { site } from '../data/site.js';

export default function Footer({ onNavigate, onQuote }) {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <button className="footer-logo" type="button" onClick={() => onNavigate('/')}><img src="/assets/logo.jpg" alt="BLI" /></button>
          <p><strong>{site.name}</strong><br />Your trusted partner for CCTV, fire alarm, access control, time attendance, PABX and networking solutions in Nepal.</p>
        </div>
        <div className="footer-column">
          <h3>Shop</h3>
          {categories.slice(0, 6).map((category) => <button key={category.id} type="button" onClick={() => onNavigate(`/products?category=${encodeURIComponent(category.name)}`)}>{category.name}</button>)}
          <button type="button" onClick={() => onNavigate('/products')}>All products</button>
        </div>
        <div className="footer-column">
          <h3>Support</h3>
          <button type="button" onClick={onQuote}>Request a quote</button>
          <button type="button" onClick={onQuote}>Installation support</button>
          <button type="button" onClick={() => onNavigate('/products')}>Track your enquiry</button>
          <button type="button" onClick={() => onNavigate('/products')}>Product help</button>
          <button type="button" onClick={() => onNavigate('/products')}>FAQs</button>
        </div>
        <div className="footer-column">
          <h3>About BLI</h3>
          <button type="button" onClick={() => onNavigate('/products')}>About us</button>
          <button type="button" onClick={() => onNavigate('/products')}>Our products</button>
          <button type="button" onClick={() => onNavigate('/products')}>Why choose BLI</button>
          <button type="button" onClick={() => onNavigate('/products')}>Contact us</button>
        </div>
        <div className="footer-contact">
          <h3>Get in touch</h3>
          <p><MapPin size={17} />{site.address}</p>
          <a href={`tel:${site.phone}`}><Phone size={17} />{site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}><Mail size={17} />{site.email}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container"><span>© {new Date().getFullYear()} BLI. All rights reserved.</span><span>Advance. Authentic. Affordable.</span><button type="button" onClick={onQuote}>Start a project <ArrowRight size={14} /></button></div>
      </div>
    </footer>
  );
}
