import { useState } from 'react';
import { CheckCircle2, Clock3, Mail, MapPin, Phone, Send } from 'lucide-react';
import { site } from '../data/site.js';
import PublicPageHero from '../components/PublicPageHero.jsx';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function ContactPage({ onNavigate }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field) => (event) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <main className="public-page contact-page">
      <PublicPageHero
        eyebrow="Contact BLI"
        title="Contact us if you have any queries."
        description="We will get back to you within 24 hr."
        current="Contact Us"
        onNavigate={onNavigate}
      />

      <section className="public-section">
        <div className="container public-section-heading public-section-heading--split">
          <div><span className="eyebrow">Contact us</span><h2>We’re here to help with your security requirements.</h2></div>
          <p>Send us your question or requirement and the BLI team will get back to you within 24 hr.</p>
        </div>
        <div className="container contact-layout">
          <div className="contact-details">
            <article className="contact-detail-card"><span className="contact-detail-card__icon"><Clock3 size={19} /></span><div><h3>Office hours</h3><p>Sun-Fri 10:00-17:00 &amp; Saturday- Closed</p></div></article>
            <article className="contact-detail-card"><span className="contact-detail-card__icon"><MapPin size={19} /></span><div><h3>Address</h3><p>Indrayani Marga, Sanepa-02</p></div></article>
            <article className="contact-detail-card"><span className="contact-detail-card__icon"><Phone size={19} /></span><div><h3>Contact details</h3><a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a></div></article>
            <article className="contact-detail-card"><span className="contact-detail-card__icon"><Mail size={19} /></span><div><h3>Mail</h3><a href={`mailto:${site.email}`}>{site.email}</a></div></article>
            <div className="contact-follow"><span className="eyebrow">Find us at</span><div><a href="https://facebook.com" aria-label="BLI on Facebook">f</a><a href="https://youtube.com" aria-label="BLI on YouTube">▶</a></div></div>
          </div>

          <form className="contact-form-card" onSubmit={submitForm}>
            <div className="contact-form-card__head"><span className="eyebrow">Send message</span><h2>Tell us what you need.</h2><p>Required fields are marked with an asterisk.</p></div>
            <div className="public-form-grid">
              <label>Name *<input required value={form.name} onChange={updateField('name')} placeholder="Your name" /></label>
              <label>Email *<input required type="email" value={form.email} onChange={updateField('email')} placeholder="you@company.com" /></label>
              <label className="field-span-2">Subject *<input required value={form.subject} onChange={updateField('subject')} placeholder="What can we help with?" /></label>
              <label className="field-span-2">Your Message *<textarea required rows="5" value={form.message} onChange={updateField('message')} placeholder="Your Message" /></label>
            </div>
            {submitted && <p className="form-status" role="status"><CheckCircle2 size={17} />Thanks—your enquiry is ready for the BLI team. We’ll get back to you within 24 hr.</p>}
            <button className="button button--primary" type="submit">Send Message <Send size={16} /></button>
          </form>
        </div>
      </section>

      <section className="container public-cta public-cta--compact">
        <div><span className="eyebrow">Prefer a faster route?</span><h2>Request a quote for your project.</h2><p>We can help scope products, installation and support together.</p></div>
        <a className="button button--outline" href={`mailto:${site.email}?subject=Project%20quote%20request`}>Email BLI <Mail size={16} /></a>
      </section>
    </main>
  );
}
