import { useState } from 'react';
import { ArrowRight, LockKeyhole } from 'lucide-react';

export default function AdminLoginPage({ onSubmit, error, busy }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  return <main className="admin-login"><section className="admin-login__card"><div className="admin-login__brand"><span className="admin-sidebar__mark">BLI</span><div><strong>Admin panel</strong><small>Advance. Authentic. Affordable.</small></div></div><span className="eyebrow">Secure workspace</span><h1>Sign in to manage BLI.</h1><p>Update products, content, media and enquiries from one place.</p><form className="admin-login__form" onSubmit={(event) => { event.preventDefault(); onSubmit(form); }}><label>Email address<input required type="email" value={form.email} onChange={update('email')} autoComplete="username" placeholder="admin@bli.com.np" /></label><label>Password<input required type="password" value={form.password} onChange={update('password')} autoComplete="current-password" placeholder="Your password" /></label>{error && <p className="admin-form-error" role="alert"><LockKeyhole size={16} />{error}</p>}<button className="button button--primary button--full" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'} <ArrowRight size={16} /></button></form><a className="text-link" href="/">← Back to public site</a></section></main>;
}
