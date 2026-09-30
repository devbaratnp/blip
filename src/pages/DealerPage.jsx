import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Handshake, MapPin, Send, Store } from 'lucide-react';
import { newIdempotencyKey, submitPublicLead } from '../lib/leadClient.js';
import { site } from '../data/site.js';
import PublicPageHero from '../components/PublicPageHero.jsx';

const initialForm = { company: '', name: '', email: '', website: '', phone: '', landline: '', address: '', area: '', currentProducts: '', mainProducts: '', salesEmployees: '', desiredProducts: '', yearsBusiness: '', serviceEmployees: '', businessDetails: '' };

export default function DealerPage({ onNavigate }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submission, setSubmission] = useState({ status: 'idle', error: '' });
  const idempotencyKey = useRef(newIdempotencyKey());
  const updateField = (field) => (event) => { setSubmitted(false); setForm((current) => ({ ...current, [field]: event.target.value })); };
  const submitForm = async (event) => {
    event.preventDefault();
    setSubmitted(false);
    setSubmission({ status: 'submitting', error: '' });
    try {
      await submitPublicLead({ type: 'dealer', idempotencyKey: idempotencyKey.current, name: form.name, company: form.company, email: form.email, phone: form.phone, source: 'dealer-page', message: form.businessDetails, payload: { ...form } });
      setSubmitted(true);
      idempotencyKey.current = newIdempotencyKey();
      setSubmission({ status: 'idle', error: '' });
      setForm(initialForm);
    } catch (error) {
      setSubmission({ status: 'error', error: error.payload?.message || error.message });
    }
  };

  return (
    <main className="public-page dealer-page">
      <PublicPageHero
        eyebrow="Become a BLI dealer"
        title="Grow your business with a trusted security partner."
        description="Work with BLI to bring genuine products, technical guidance and complete security solutions to more customers."
        current="Become A Dealer"
        onNavigate={onNavigate}
      />
      <section className="public-section"><div className="container public-section-heading public-section-heading--split"><div><span className="eyebrow">Partner with us</span><h2>Become a dealer and grow with BLI.</h2></div><p>Share your company, dealership area and current product focus. We’ll review the details and contact you about the next steps.</p></div><div className="container dealer-benefits"><article><span><Handshake size={21} /></span><h3>Diversified products</h3><p>Bring customers a wider range of CCTV, access control, attendance and communication solutions.</p></article><article><span><Store size={21} /></span><h3>Profitable opportunities</h3><p>Build your business with products selected for real customer and market requirements.</p></article><article><span><MapPin size={21} /></span><h3>Dealer support</h3><p>Work with a BLI team that understands product guidance, installation and customer service.</p></article></div></section>
      <section className="public-section public-section--soft"><div className="container dealer-application"><div className="dealer-application__copy"><span className="eyebrow">Your identity and business information</span><h2>Tell us more about your business.</h2><p>Complete the dealer enquiry and include the products, team and area you currently serve.</p><div className="dealer-application__line"><CheckCircle2 size={17} />Product and category guidance</div><div className="dealer-application__line"><CheckCircle2 size={17} />Partner onboarding conversation</div><div className="dealer-application__line"><CheckCircle2 size={17} />Support for customer requirements</div></div><form className="dealer-form" onSubmit={submitForm}><label>Company Name *<input required value={form.company} onChange={updateField('company')} placeholder="Company Name" /></label><label>Name *<input required value={form.name} onChange={updateField('name')} placeholder="Name" /></label><label>Email Address *<input required type="email" value={form.email} onChange={updateField('email')} placeholder="Email Address" /></label><label>Website Url<input value={form.website} onChange={updateField('website')} placeholder="Website Url" /></label><label>Mobile No *<input required value={form.phone} onChange={updateField('phone')} placeholder="Mobile No" /></label><label>Land Line Number<input value={form.landline} onChange={updateField('landline')} placeholder="Land Line Number" /></label><label>Address *<input required value={form.address} onChange={updateField('address')} placeholder="Address" /></label><label>Area of Dealership *<input required value={form.area} onChange={updateField('area')} placeholder="Area of Dealership" /></label><label>Current Products *<input required value={form.currentProducts} onChange={updateField('currentProducts')} placeholder="Current Products" /></label><label>Current Main Products *<input required value={form.mainProducts} onChange={updateField('mainProducts')} placeholder="CCTV Camera, PABX, access control..." /></label><label>No. of Sales Employee *<input required type="number" min="0" value={form.salesEmployees} onChange={updateField('salesEmployees')} placeholder="Enter number" /></label><label>Products you want to deal with *<input required value={form.desiredProducts} onChange={updateField('desiredProducts')} placeholder="Desired Products" /></label><label>No. of Years in Business<input type="number" min="0" value={form.yearsBusiness} onChange={updateField('yearsBusiness')} placeholder="Years in business" /></label><label>No. of Service Employee *<input required type="number" min="0" value={form.serviceEmployees} onChange={updateField('serviceEmployees')} placeholder="Enter number" /></label><label className="field-span-2">Tell us more about your Business<textarea rows="4" value={form.businessDetails} onChange={updateField('businessDetails')} placeholder="Tell us more about your Business" /></label>{submission.error && <p className="form-status form-status--error" role="alert">{submission.error}</p>}{submitted && <p className="form-status" role="status"><CheckCircle2 size={17} />Thanks—your partnership enquiry is ready for review.</p>}<button className="button button--primary" type="submit" disabled={submission.status === 'submitting'}>{submission.status === 'submitting' ? 'Sending…' : 'Submit'} <Send size={16} /></button></form></div></section>
      <section className="container public-cta"><div><span className="eyebrow">Already have a requirement?</span><h2>Let’s help you scope the opportunity.</h2><p>Contact us directly for product or project support.</p></div><a className="button button--outline" href={`mailto:${site.email}`}>Email BLI <ArrowRight size={16} /></a></section>
    </main>
  );
}
