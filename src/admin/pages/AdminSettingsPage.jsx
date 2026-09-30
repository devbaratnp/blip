import { useEffect, useState } from 'react';
import { CheckCircle2, Save, Settings2, X } from 'lucide-react';
import { apiGet, apiPatch } from '../../lib/apiClient.js';

const initialSettings = { phoneDisplay: '', phoneHref: '', email: '', address: '', officeHours: '', facebookUrl: '', youtubeUrl: '' };

export default function AdminSettingsPage() {
  const [form, setForm] = useState(initialSettings);
  const [state, setState] = useState({ status: 'loading', error: '', message: '' });
  useEffect(() => { apiGet('/api/v1/settings').then((payload) => { setForm({ ...initialSettings, ...(payload.data || payload) }); setState({ status: 'ready', error: '', message: '' }); }).catch((error) => setState({ status: 'error', error: error.message, message: '' })); }, []);
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  const save = async (event) => { event.preventDefault(); setState({ status: 'saving', error: '', message: '' }); try { const payload = await apiPatch('/api/v1/settings', form); setForm({ ...initialSettings, ...(payload.data || payload) }); setState({ status: 'saved', error: '', message: 'Site settings saved.' }); } catch (error) { setState({ status: 'error', error: error.message, message: '' }); } };
  if (state.status === 'loading') return <section className="admin-page"><div className="admin-empty"><p>Loading settings…</p></div></section>;
  return <section className="admin-page"><div className="admin-page__head"><div><span className="eyebrow">System</span><h1>Site settings</h1><p>Keep public contact details and social links current in one place.</p></div><Settings2 size={28} className="admin-page__head-icon" /></div><form className="admin-form" onSubmit={save}><div className="admin-form__grid"><label>Phone display *<input required value={form.phoneDisplay} onChange={update('phoneDisplay')} /></label><label>Phone link value *<input required value={form.phoneHref} onChange={update('phoneHref')} /></label><label>Email *<input required type="email" value={form.email} onChange={update('email')} /></label><label>Office hours *<input required value={form.officeHours} onChange={update('officeHours')} /></label><label className="field-span-2">Address *<input required value={form.address} onChange={update('address')} /></label><label>Facebook URL<input type="url" value={form.facebookUrl} onChange={update('facebookUrl')} /></label><label>YouTube URL<input type="url" value={form.youtubeUrl} onChange={update('youtubeUrl')} /></label></div>{state.error && <p className="admin-form-error" role="alert"><X size={16} />{state.error}</p>}{state.message && <p className="admin-form-success" role="status"><CheckCircle2 size={16} />{state.message}</p>}<div className="admin-form__actions"><button className="button button--primary" type="submit" disabled={state.status === 'saving'}><Save size={15} />{state.status === 'saving' ? 'Saving…' : 'Save settings'}</button></div></form></section>;
}
