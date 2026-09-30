import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Mail, MessageSquare, Phone, Search, Send, X } from 'lucide-react';
import { apiGet, apiPatch, apiPost } from '../../lib/apiClient.js';

const statuses = ['new', 'contacted', 'qualified', 'closed', 'lost'];

function LeadList({ onNavigate }) {
  const [state, setState] = useState({ status: 'loading', rows: [], meta: null, error: '' });
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');

  const load = async () => {
    setState((current) => ({ ...current, status: current.rows.length ? 'refreshing' : 'loading', error: '' }));
    try {
      const params = new URLSearchParams({ page: '1', pageSize: '25' });
      if (query.trim()) params.set('search', query.trim());
      if (status) params.set('status', status);
      if (type) params.set('type', type);
      const payload = await apiGet('/api/v1/leads?' + params);
      setState({ status: 'ready', rows: payload.data || [], meta: payload.meta, error: '' });
    } catch (error) {
      setState((current) => ({ ...current, status: 'error', error: error.message }));
    }
  };

  useEffect(() => { load(); }, []);

  return <section className="admin-page"><div className="admin-page__head"><div><span className="eyebrow">Leads</span><h1>Leads &amp; enquiries</h1><p>Review durable quote, contact and dealer enquiries from one triage queue.</p></div><MessageSquare size={28} className="admin-page__head-icon" /></div><div className="admin-filterbar"><form onSubmit={(event) => { event.preventDefault(); load(); }}><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, company or email" aria-label="Search leads" /><button className="button button--outline" type="submit">Search</button></form><select value={type} onChange={(event) => { setType(event.target.value); setTimeout(load, 0); }} aria-label="Filter by lead type"><option value="">All types</option><option value="quote">Quote</option><option value="contact">Contact</option><option value="dealer">Dealer</option></select><select value={status} onChange={(event) => { setStatus(event.target.value); setTimeout(load, 0); }} aria-label="Filter leads by status"><option value="">All statuses</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select></div>{state.error && <div className="admin-error" role="alert">{state.error} <button type="button" onClick={load}>Retry</button></div>}{state.status === 'loading' ? <div className="admin-empty"><p>Loading leads…</p></div> : state.rows.length === 0 ? <div className="admin-empty"><span className="eyebrow">Inbox</span><h2>No enquiries found.</h2><p>New quote, contact and dealer submissions will appear here.</p></div> : <><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Requester</th><th>Type</th><th>Status</th><th>Received</th><th><span className="sr-only">Action</span></th></tr></thead><tbody>{state.rows.map((lead) => <tr key={lead.id}><td><strong>{lead.name}</strong><small>{lead.company || lead.email || lead.phone || 'No contact detail'}</small></td><td>{lead.type}</td><td><span className={'admin-status admin-status--' + lead.status}>{lead.status}</span></td><td>{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : '—'}</td><td><button className="text-link" type="button" onClick={() => onNavigate('/admin/leads/' + lead.id)}>Open</button></td></tr>)}</tbody></table></div><div className="admin-pagination"><span>{state.meta?.total || state.rows.length} lead{state.meta?.total === 1 ? '' : 's'}</span></div></>}</section>;
}

function LeadDetail({ leadId, onNavigate }) {
  const [lead, setLead] = useState(null);
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [state, setState] = useState({ status: 'loading', error: '', message: '' });

  const load = () => apiGet('/api/v1/leads/' + leadId).then((payload) => {
    const record = payload.data || payload;
    setLead(record);
    setStatus(record.status);
    setState({ status: 'ready', error: '', message: '' });
  }).catch((error) => setState({ status: 'error', error: error.message, message: '' }));

  useEffect(() => { load(); }, [leadId]);

  const updateStatus = async (event) => {
    const nextStatus = event.target.value;
    setStatus(nextStatus);
    try {
      const payload = await apiPatch('/api/v1/leads/' + leadId, { status: nextStatus });
      setLead(payload.data || payload);
      setState({ status: 'saved', error: '', message: 'Lead status updated.' });
    } catch (error) {
      setState({ status: 'error', error: error.message, message: '' });
    }
  };

  const addNote = async (event) => {
    event.preventDefault();
    try {
      const payload = await apiPost('/api/v1/leads/' + leadId + '/notes', { body: note });
      setLead(payload.data || payload);
      setNote('');
      setState({ status: 'saved', error: '', message: 'Note added.' });
    } catch (error) {
      setState({ status: 'error', error: error.message, message: '' });
    }
  };

  if (state.status === 'loading' || !lead) return <section className="admin-page"><div className="admin-empty"><p>Loading enquiry…</p></div></section>;
  if (state.status === 'error' && !lead.name) return <section className="admin-page"><div className="admin-error" role="alert">{state.error}</div></section>;
  return <section className="admin-page"><button className="text-link admin-back-link" type="button" onClick={() => onNavigate('/admin/leads')}><ArrowLeft size={15} />Back to leads</button><div className="admin-page__head"><div><span className="eyebrow">{lead.type} enquiry</span><h1>{lead.name}</h1><p>Received {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : '—'}{lead.company ? ' · ' + lead.company : ''}</p></div><select className="admin-detail-status" value={status} onChange={updateStatus} aria-label="Lead status">{statuses.map((item) => <option key={item}>{item}</option>)}</select></div><div className="admin-detail-grid"><article className="admin-detail-card"><span className="eyebrow">Submitted details</span><dl><div><dt>Email</dt><dd>{lead.email ? <a href={'mailto:' + lead.email}><Mail size={14} />{lead.email}</a> : '—'}</dd></div><div><dt>Phone</dt><dd>{lead.phone ? <a href={'tel:' + lead.phone}><Phone size={14} />{lead.phone}</a> : '—'}</dd></div><div><dt>Source</dt><dd>{lead.source || '—'}</dd></div><div><dt>Message</dt><dd>{lead.message || 'No message supplied.'}</dd></div></dl></article><article className="admin-detail-card"><span className="eyebrow">Internal notes</span>{(lead.notes || []).length ? <div className="admin-note-list">{lead.notes.map((item) => <div className="admin-note" key={item.id}><p>{item.body}</p><small>{item.author || 'Admin'} · {item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}</small></div>)}</div> : <p className="admin-muted">No internal notes yet.</p>}<form className="admin-note-form" onSubmit={addNote}><textarea required rows="3" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add an internal follow-up note…" aria-label="Internal note" /><button className="button button--outline" type="submit"><Send size={15} />Add note</button></form></article></div>{state.error && <p className="admin-form-error" role="alert"><X size={16} />{state.error}</p>}{state.message && <p className="admin-form-success" role="status"><CheckCircle2 size={16} />{state.message}</p>}</section>;
}

export default function AdminLeadsPage({ leadId, onNavigate }) {
  return leadId ? <LeadDetail leadId={leadId} onNavigate={onNavigate} /> : <LeadList onNavigate={onNavigate} />;
}
