import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { apiGet } from '../../lib/apiClient.js';

export default function AdminActivityPage() {
  const [state, setState] = useState({ status: 'loading', rows: [], error: '' });
  useEffect(() => { apiGet('/api/v1/activity?pageSize=50').then((payload) => setState({ status: 'ready', rows: payload.data || [], error: '' })).catch((error) => setState({ status: 'error', rows: [], error: error.message })); }, []);
  return <section className="admin-page"><div className="admin-page__head"><div><span className="eyebrow">System</span><h1>Activity log</h1><p>Review the Admin actions that changed catalog, content, leads, media and settings.</p></div><Activity size={28} className="admin-page__head-icon" /></div>{state.error && <div className="admin-error" role="alert">{state.error}</div>}{state.status === 'loading' ? <div className="admin-empty"><p>Loading activity…</p></div> : state.rows.length === 0 ? <div className="admin-empty"><h2>No activity yet.</h2><p>Successful CMS changes will be recorded here.</p></div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Action</th><th>Resource</th><th>Actor</th><th>Outcome</th><th>Time</th></tr></thead><tbody>{state.rows.map((event) => <tr key={event.id}><td><strong>{event.action}</strong></td><td>{event.resourceType} {event.resourceId || ''}</td><td>{event.actor || 'System'}</td><td><span className={'admin-status admin-status--' + event.outcome}>{event.outcome}</span></td><td>{event.createdAt ? new Date(event.createdAt).toLocaleString() : '—'}</td></tr>)}</tbody></table></div>}</section>;
}
