import { useState } from 'react';
import { ArrowRight, CheckCircle2, Handshake, MapPin, Send, Store } from 'lucide-react';
import { site } from '../data/site.js';
import PublicPageHero from '../components/PublicPageHero.jsx';

const initialForm = { name: '', company: '', phone: '', location: '' };

export default function DealerPage({ onNavigate }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const updateField = (field) => (event) => { setSubmitted(false); setForm((current) => ({ ...current, [field]: event.target.value })); };
  const submitForm = (event) => { event.preventDefault(); setSubmitted(true); setForm(initialForm); };

  return (
    <main className="public-page dealer-page">
      <PublicPageHero
        eyebrow="Become a BLI dealer"
        title="Grow your business with a trusted security partner."
        description="Work with BLI to bring genuine products, technical guidance and complete security solutions to more customers."
        current="Become A Dealer"
        onNavigate={onNavigate}
      />
      <section className="public-section"><div className="container public-section-heading public-section-heading--split"><div><span className="eyebrow">Partner with us</span><h2>More than a product supplier.</h2></div><p>We support dealers with a dependable product range, practical product knowledge and a team that understands the work after the sale.</p></div><div className="container dealer-benefits"><article><span><Handshake size={21} /></span><h3>Trusted product range</h3><p>Offer customers genuine products from brands they can rely on.</p></article><article><span><Store size={21} /></span><h3>Commercial support</h3><p>Build better proposals with guidance on products, fit and system planning.</p></article><article><span><MapPin size={21} /></span><h3>Local partnership</h3><p>Work with a Nepal-based team that can support your market and customers.</p></article></div></section>
      <section className="public-section public-section--soft"><div className="container dealer-application"><div className="dealer-application__copy"><span className="eyebrow">Start a conversation</span><h2>Tell us about your business.</h2><p>Share your details and the areas you serve. The BLI team will follow up with the next steps.</p><div className="dealer-application__line"><CheckCircle2 size={17} />Product and category guidance</div><div className="dealer-application__line"><CheckCircle2 size={17} />Partner onboarding conversation</div><div className="dealer-application__line"><CheckCircle2 size={17} />Support for customer requirements</div></div><form className="dealer-form" onSubmit={submitForm}><label>Your name *<input required value={form.name} onChange={updateField('name')} placeholder="Your name" /></label><label>Company name *<input required value={form.company} onChange={updateField('company')} placeholder="Company name" /></label><label>Phone *<input required value={form.phone} onChange={updateField('phone')} placeholder="01-5183328" /></label><label>Primary location *<input required value={form.location} onChange={updateField('location')} placeholder="City or district" /></label>{submitted && <p className="form-status" role="status"><CheckCircle2 size={17} />Thanks—your partnership enquiry is ready for review.</p>}<button className="button button--primary" type="submit">Send partnership enquiry <Send size={16} /></button></form></div></section>
      <section className="container public-cta"><div><span className="eyebrow">Already have a requirement?</span><h2>Let’s help you scope the opportunity.</h2><p>Contact us directly for product or project support.</p></div><a className="button button--outline" href={`mailto:${site.email}`}>Email BLI <ArrowRight size={16} /></a></section>
    </main>
  );
}
