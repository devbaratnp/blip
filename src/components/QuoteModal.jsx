import { useEffect, useState } from 'react';
import { CheckCircle2, FileText, X } from 'lucide-react';
import { submitPublicLead } from '../lib/leadClient.js';

const initialForm = { name: '', company: '', phone: '', email: '', industry: '', quantity: '1', requirement: '', message: '' };

export default function QuoteModal({ product, open, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submission, setSubmission] = useState({ status: 'idle', error: '' });

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) { setSubmitted(false); setSubmission({ status: 'idle', error: '' }); setForm(initialForm); }
  }, [open]);

  if (!open) return null;

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  const submitForm = async (event) => {
    event.preventDefault();
    setSubmission({ status: 'submitting', error: '' });
    try {
      await submitPublicLead({ type: 'quote', name: form.name, company: form.company, phone: form.phone, email: form.email || null, source: 'quote-modal', message: form.message, payload: { industry: form.industry, quantity: form.quantity, requirement: form.requirement, product: product ? { id: product.id, name: product.name, slug: product.slug } : null } });
      setSubmitted(true);
      setSubmission({ status: 'idle', error: '' });
    } catch (error) {
      setSubmission({ status: 'error', error: error.payload?.message || error.message });
    }
  };

  return (
    <div className="overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="quote-title">
        <button className="modal__close icon-button" type="button" onClick={onClose} aria-label="Close request quote form"><X size={20} /></button>
        {submitted ? (
          <div className="success-state">
            <CheckCircle2 size={46} />
            <span className="eyebrow">Enquiry received</span>
            <h2>Thanks, we will be in touch.</h2>
            <p>Your request is ready for the BLI team. This prototype keeps submission local until a backend is connected.</p>
            <button className="button button--primary" type="button" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <div className="modal__heading">
              <span className="modal__icon"><FileText size={22} /></span>
              <div><span className="eyebrow">BLI project desk</span><h2 id="quote-title">Request a quote</h2><p>Tell us what you need and the right team will guide the next step.</p></div>
            </div>
            {product && <div className="selected-product"><img src={product.image} alt="" /><div><span>Product enquiry</span><strong>{product.name}</strong></div></div>}
            <form className="quote-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
              <label>Name<input required value={form.name} onChange={update('name')} placeholder="Your name" /></label>
              <label>Company<input value={form.company} onChange={update('company')} placeholder="Company name" /></label>
              <label>Phone<input required value={form.phone} onChange={update('phone')} placeholder="98XXXXXXXX" /></label>
              <label>Email<input type="email" value={form.email} onChange={update('email')} placeholder="you@company.com" /></label>
              <label>Industry<select value={form.industry} onChange={update('industry')}><option value="">Select one</option><option>Home</option><option>Office</option><option>School</option><option>Retail</option><option>Hospitality</option><option>Other</option></select></label>
              <label>Quantity<input type="number" min="1" value={form.quantity} onChange={update('quantity')} /></label>
              <label className="field-span-2">What do you need?<input value={form.requirement} onChange={update('requirement')} placeholder="CCTV, fire alarm, access control..." /></label>
              <label className="field-span-2">Message<textarea rows="3" value={form.message} onChange={update('message')} placeholder="Share a little about your site or project" /></label>
              {submission.error && <p className="admin-form-error field-span-2" role="alert">{submission.error}</p>}
              <button className="button button--primary field-span-2" type="submit" disabled={submission.status === 'submitting'}>{submission.status === 'submitting' ? 'Sending…' : 'Send enquiry'}</button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
