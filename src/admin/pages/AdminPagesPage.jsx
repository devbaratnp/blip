import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, FileText, Send, X } from 'lucide-react';
import { apiGet, apiPatch, apiPost } from '../../lib/apiClient.js';

const sectionTypes = ['hero', 'rich_text', 'split_media', 'icon_grid', 'product_grid', 'solution_grid', 'project_grid', 'testimonial', 'cta', 'contact_info', 'faq'];

function PageList({ onNavigate }) {
  const [state, setState] = useState({ status: 'loading', rows: [], error: '' });
  useEffect(() => {
    apiGet('/api/v1/pages')
      .then((payload) => setState({ status: 'ready', rows: payload.data || [], error: '' }))
      .catch((error) => setState({ status: 'error', rows: [], error: error.message }));
  }, []);

  return <section className="admin-page"><div className="admin-page__head"><div><span className="eyebrow">Content</span><h1>Content pages</h1><p>Manage structured copy and publishing state without editing the public React files.</p></div><FileText size={28} className="admin-page__head-icon" /></div>{state.error && <div className="admin-error" role="alert">{state.error}</div>}{state.status === 'loading' ? <div className="admin-empty"><p>Loading pages…</p></div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Page</th><th>Slug</th><th>Sections</th><th>Status</th><th><span className="sr-only">Action</span></th></tr></thead><tbody>{state.rows.map((page) => <tr key={page.id}><td><strong>{page.title}</strong><small>Updated {page.updatedAt ? new Date(page.updatedAt).toLocaleDateString() : '—'}</small></td><td>{page.slug}</td><td>{page.sectionsCount ?? '—'}</td><td><span className={'admin-status admin-status--' + page.status}>{page.status}</span></td><td><button className="text-link" type="button" onClick={() => onNavigate('/admin/pages/' + page.id)}>Edit</button></td></tr>)}</tbody></table></div>}</section>;
}

function PageEditor({ pageId, onNavigate }) {
  const [form, setForm] = useState(null);
  const [state, setState] = useState({ status: 'loading', error: '', message: '' });
  useEffect(() => {
    apiGet('/api/v1/pages/' + pageId).then((payload) => {
      const page = payload.data || payload;
      const sections = page.sections?.data || page.sections || [];
      setForm({ ...page, seoTitle: page.seoTitle || '', seoDescription: page.seoDescription || '', sections: sections.map((section) => ({ ...section, json: JSON.stringify(section.data || {}, null, 2) })) });
      setState({ status: 'ready', error: '', message: '' });
    }).catch((error) => setState({ status: 'error', error: error.message, message: '' }));
  }, [pageId]);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  const updateSection = (id, field, value) => setForm((current) => ({ ...current, sections: current.sections.map((section) => section.id === id ? { ...section, [field]: value } : section) }));
  const save = async (publish = false) => {
    setState({ status: 'saving', error: '', message: '' });
    try {
      const sections = form.sections.map((section) => ({ ...section, data: JSON.parse(section.json || '{}') }));
      await apiPatch('/api/v1/pages/' + pageId, { slug: form.slug, title: form.title, seoTitle: form.seoTitle, seoDescription: form.seoDescription, status: publish ? 'published' : form.status });
      await Promise.all(sections.map((section) => apiPatch('/api/v1/page-sections/' + section.id, { type: section.type, data: section.data, sortOrder: Number(section.sortOrder) || 0, isVisible: Boolean(section.isVisible) })));
      if (publish) await apiPost('/api/v1/pages/' + pageId + '/publish', {});
      setForm((current) => ({ ...current, status: publish ? 'published' : current.status }));
      setState({ status: 'saved', error: '', message: publish ? 'Page published.' : (form.status === 'published' ? 'Page changes saved.' : 'Page saved as draft.') });
    } catch (error) {
      setState({ status: 'error', error: error instanceof SyntaxError ? 'One section contains invalid JSON.' : error.message, message: '' });
    }
  };

  if (state.status === 'loading' || !form) return <section className="admin-page"><div className="admin-empty"><p>Loading page…</p></div></section>;
  if (state.status === 'error' && !form.title) return <section className="admin-page"><div className="admin-error" role="alert">{state.error}</div></section>;
  return <section className="admin-page"><button className="text-link admin-back-link" type="button" onClick={() => onNavigate('/admin/pages')}><ArrowLeft size={15} />Back to pages</button><div className="admin-page__head"><div><span className="eyebrow">{form.slug}</span><h1>Edit {form.title}</h1><p>Structured sections keep the approved public design stable while copy and ordering stay editable.</p></div><span className={'admin-status admin-status--' + form.status}>{form.status}</span></div><form className="admin-form" onSubmit={(event) => { event.preventDefault(); save(false); }}><div className="admin-form__grid"><label>Page title *<input required value={form.title} onChange={update('title')} /></label><label>Slug *<input required pattern="[A-Za-z0-9_-]+" value={form.slug} onChange={update('slug')} /></label><label className="field-span-2">SEO title<input value={form.seoTitle} onChange={update('seoTitle')} /></label><label className="field-span-2">SEO description<textarea rows="3" value={form.seoDescription} onChange={update('seoDescription')} /></label></div><div className="admin-section-list"><div className="admin-section-list__head"><div><span className="eyebrow">Sections</span><h2>Page structure</h2></div><span>{form.sections.length} section{form.sections.length === 1 ? '' : 's'}</span></div>{form.sections.map((section, index) => <article className="admin-section-editor" key={section.id}><div className="admin-section-editor__head"><strong>Section {index + 1}</strong><span className={'admin-status ' + (section.isVisible ? 'admin-status--published' : 'admin-status--draft')}>{section.isVisible ? 'Visible' : 'Hidden'}</span></div><div className="admin-form__grid"><label>Type<select value={section.type} onChange={(event) => updateSection(section.id, 'type', event.target.value)}>{sectionTypes.map((type) => <option key={type}>{type}</option>)}</select></label><label>Sort order<input type="number" min="0" value={section.sortOrder} onChange={(event) => updateSection(section.id, 'sortOrder', event.target.value)} /></label><label className="admin-check"><input type="checkbox" checked={Boolean(section.isVisible)} onChange={(event) => updateSection(section.id, 'isVisible', event.target.checked)} />Visible on public page</label><label className="field-span-2">Section data JSON<textarea rows="8" value={section.json} onChange={(event) => updateSection(section.id, 'json', event.target.value)} /></label></div></article>)}</div>{state.error && <p className="admin-form-error" role="alert"><X size={16} />{state.error}</p>}{state.message && <p className="admin-form-success" role="status"><CheckCircle2 size={16} />{state.message}</p>}<div className="admin-form__actions"><button className="button button--outline" type="button" onClick={() => onNavigate('/admin/pages')}>Cancel</button><button className="button button--outline" type="submit" disabled={state.status === 'saving'}>Save draft</button><button className="button button--primary" type="button" disabled={state.status === 'saving'} onClick={() => save(true)}><Send size={15} />Save &amp; publish</button></div></form></section>;
}

export default function AdminPagesPage({ pageId, onNavigate }) {
  return pageId ? <PageEditor pageId={pageId} onNavigate={onNavigate} /> : <PageList onNavigate={onNavigate} />;
}
