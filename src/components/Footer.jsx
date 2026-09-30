import { Mail, MapPin, Phone } from 'lucide-react';
import { site } from '../data/site.js';

const pages = ['Career', 'Home', 'Company', 'Help Center', 'Products', 'Services', 'Download', 'Become A Dealer', 'About Us', 'Contact us'];

export default function Footer({ onNavigate, onQuote }) {
  return (
    <footer className="site-footer site-footer--reference">
      <div className="container footer-reference-main">
        <div className="footer-reference-brand">
          <button className="footer-logo" type="button" onClick={() => onNavigate('/')}><img src="/assets/logo.jpg" alt="BLI" /></button>
          <p><strong>{site.name}</strong> offers a wide portfolio of products. It covers CCTV Camera, DVR, NVR, PABX System, Biometric Attendance, Access Control, Video Door Phone, PA System, Burglar Alarm System, Fire Alarm System, and many more.</p>
          <p>BLI brings intelligent security and surveillance solutions that protect people, properties, and assets. They ensure safety, security, and productivity in various aspects and help make your premises safer.</p>
          <p>At present, we are serving many different verticals, comprising governments, hotels, hospitals, educational institutes, homes, infrastructure, and transportation, among others. We bring efficient, reliable, scalable, and integrated solutions to our customers.</p>
        </div>
        <div className="footer-reference-pages">
          <h3>Pages</h3>
          {pages.map((page) => <button type="button" key={page} onClick={() => onNavigate(page === 'Home' ? '/' : '/products')}>{page}</button>)}
        </div>
        <div className="footer-reference-contact">
          <h3>Find Us</h3>
          <p><MapPin size={17} />Indrayani Marga, Sanepa-02</p>
          <a href="mailto:info@bli-india.com"><Mail size={17} />info@bli-india.com</a>
          <a href="tel:+919315640135"><Phone size={17} />+91 9315640135</a>
          <button className="footer-reference-quote" type="button" onClick={onQuote}>Request a Quote <span>→</span></button>
          <div className="footer-socials"><a href="https://facebook.com" aria-label="BLI on Facebook"><span className="social-glyph">f</span></a><a href="https://youtube.com" aria-label="BLI on YouTube"><span className="social-glyph social-glyph--youtube">▶</span></a></div>
        </div>
      </div>
      <div className="footer-reference-bottom"><div className="container"><span>© 2024 Bhagya Laxmi International Pvt. Ltd. (BLI). All rights reserved.</span><span><button type="button">Privacy Policy</button><button type="button">Terms &amp; Conditions</button><button type="button">Contact Us</button></span></div></div>
    </footer>
  );
}
