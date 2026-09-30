import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, FilePlus2, Pencil, Search, Send, X } from 'lucide-react';
import { ApiError, apiGet, apiPatch, apiPost } from '../../lib/apiClient.js';

const emptyProduct = { name: '', slug: '', brandId: '', categoryId: '', model: '', priceNpr: '', quoteOnly: false, shortSpecs: '', description: '', features: '', imageAlt: '', badge: '', availability: 'In stock', featured: false, sortOrder: 0, status: 'draft' };

const npr = (value) => value == null || value === '' ? 'Request price' : `Rs. ${Number(value).toLocaleString('en-IN')}`;

function ProductList({ onNavigate }) {
  const [state, setState] = useState({ status: 'loading', rows: [], meta: null, error: '' });
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const load = async (nextPage = page) => {
    setState((current) => ({ ...current, status: current.rows.length ? 'refreshing' : 'loading', error: '' }));
    try {
      const params = new URLSearchParams({ page: String(nextPage), pageSize: '25' });
      if (query.trim()) params.set('search', query.trim());
      if (status) params.set('status', status);
      const payload = await apiGet(`/api/v1/products?${params}`);
      setPage(nextPage);
      setState({ status: 'ready', rows: payload.data || [], meta: payload.meta, error: '' });
    } catch (error) {
      setState((current) => ({ ...current, status: 'error', error: error.message }));
    }
  };

  useEffect(() => { load(1); }, []);

  return <section className="admin-page"><div className="admin-page__head"><div><span className="eyebrow">Catalog</span><h1>Products</h1><p>Find and maintain the records shown across the public BLI catalogue.</p></div><button className="button button--primary" type="button" onClick={() => onNavigate('/admin/products/new')}><FilePlus2 size={16} />Add product</button></div><div className="admin-filterbar"><form onSubmit={(event) => { event.preventDefault(); load(1); }}><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, model or slug" aria-label="Search products" /><button className="button button--outline" type="submit">Search</button></form><select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} aria-label="Filter by status"><option value="">All statuses</option><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></div>{state.error && <div className="admin-error" role="alert">{state.error} <button type="button" onClick={() => load(page)}>Retry</button></div>}{state.status === 'loading' ? <div className="admin-empty"><p>Loading products…</p></div> : state.rows.length === 0 ? <div className="admin-empty"><span className="eyebrow">Catalog</span><h2>No products found.</h2><p>Clear the filters or add the first product record.</p></div> : <><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Product</th><th>Brand</th><th>Category</th><th>Price</th><th>Status</th><th><span className="sr-only">Action</span></th></tr></thead><tbody>{state.rows.map((product) => <tr key={product.id}><td><strong>{product.name}</strong><small>{product.model || 'No model'}{product.featured ? ' · Featured' : ''}</small></td><td>{product.brand || '—'}</td><td>{product.category || '—'}</td><td>{product.quoteOnly ? 'Quote only' : npr(product.priceNpr)}</td><td><span className={`admin-status admin-status--${product.status}`}>{product.status}</span></td><td><button className="text-link" type="button" onClick={() => onNavigate(`/admin/products/${product.id}`)}><Pencil size={14} />Edit</button></td></tr>)}</tbody></table></div><div className="admin-pagination"><span>Showing {state.meta?.total || state.rows.length} product{state.meta?.total === 1 ? '' : 's'}</span><div><button className="button button--outline" type="button" disabled={page <= 1} onClick={() => load(page - 1)}>Previous</button><button className="button button--outline" type="button" disabled={!state.meta || page >= state.meta.lastPage} onClick={() => load(page + 1)}>Next</button></div></div></>}</section>;
}

function ProductForm({ productId, onNavigate }) {
  const [form, setForm] = useState(emptyProduct);
  const [options, setOptions] = useState({ brands: [], categories: [] });
  const [state, setState] = useState({ status: productId ? 'loading' : 'ready', error: '', message: '' });
  const isNew = !productId || productId === 'new';

  useEffect(() => {
    Promise.all([apiGet('/api/v1/catalog/options'), ...(isNew ? [] : [apiGet(`/api/v1/products/${productId}`)])]).then(([catalog, product]) => {
      setOptions(catalog);
      if (product) setForm({ ...emptyProduct, ...product, features: (product.features || []).join('\n') });
      setState({ status: 'ready', error: '', message: '' });
    }).catch((error) => setState({ status: 'error', error: error.message, message: '' }));
  }, [productId]);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }));
  const payload = useMemo(() => ({ ...form, priceNpr: form.priceNpr === '' ? null : Number(form.priceNpr), brandId: form.brandId || null, categoryId: form.categoryId || null, features: form.features.split('\n').map((item) => item.trim()).filter(Boolean), sortOrder: Number(form.sortOrder) || 0 }), [form]);

  const save = async (publish = false) => {
    setState({ status: 'saving', error: '', message: '' });
    try {
      const response = isNew ? await apiPost('/api/v1/products', { ...payload, status: publish ? 'published' : 'draft' }) : await apiPatch(`/api/v1/products/${productId}`, { ...payload, status: publish ? 'published' : form.status });
      const saved = response.data || response;
      if (publish && saved.status !== 'published') await apiPost(`/api/v1/products/${saved.id}/publish`, {});
      setState({ status: 'saved', error: '', message: publish ? 'Product published.' : 'Product saved as draft.' });
      if (isNew) onNavigate(`/admin/products/${saved.id}`);
      else setForm((current) => ({ ...current, ...saved, features: (saved.features || []).join('\n') }));
    } catch (error) { setState({ status: 'error', error: error.payload?.message || error.message, message: '' }); }
  };

  if (state.status === 'loading') return <section className="admin-page"><div className="admin-empty"><p>Loading product…</p></div></section>;
  if (state.status === 'error' && !form.name && !isNew) return <section className="admin-page"><div className="admin-error" role="alert">{state.error}</div></section>;

  return <section className="admin-page"><button className="text-link admin-back-link" type="button" onClick={() => onNavigate('/admin/products')}><ArrowLeft size={15} />Back to products</button><div className="admin-page__head"><div><span className="eyebrow">{isNew ? 'New product' : 'Edit product'}</span><h1>{isNew ? 'Add product' : 'Update product'}</h1><p>Keep the public catalogue record complete and easy for customers to understand.</p></div><span className={`admin-status admin-status--${form.status}`}>{form.status}</span></div><form className="admin-form" onSubmit={(event) => { event.preventDefault(); save(false); }}><div className="admin-form__grid"><label>Product name *<input required value={form.name} onChange={update('name')} placeholder="CP PLUS E39A 3MP Wi-Fi PT Camera" /></label><label>Slug *<input required pattern="[A-Za-z0-9_-]+" value={form.slug} onChange={update('slug')} placeholder="cp-plus-e39a-3mp-wi-fi-pt-camera" /></label><label>Brand<select value={form.brandId} onChange={update('brandId')}><option value="">Select brand</option>{options.brands.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label>Category<select value={form.categoryId} onChange={update('categoryId')}><option value="">Select category</option>{options.categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label>Model<input value={form.model || ''} onChange={update('model')} placeholder="E39A" /></label><label>Price in NPR<input type="number" min="0" value={form.priceNpr ?? ''} onChange={update('priceNpr')} placeholder="4200" /></label><label>Availability<input required value={form.availability} onChange={update('availability')} placeholder="In stock" /></label><label>Badge<input value={form.badge || ''} onChange={update('badge')} placeholder="Popular" /></label><label className="admin-check"><input type="checkbox" checked={Boolean(form.quoteOnly)} onChange={update('quoteOnly')} />Quote only</label><label className="admin-check"><input type="checkbox" checked={Boolean(form.featured)} onChange={update('featured')} />Featured on homepage</label><label className="field-span-2">Short specifications<input value={form.shortSpecs || ''} onChange={update('shortSpecs')} placeholder="3MP | Wi-Fi | Pan and tilt" /></label><label className="field-span-2">Description<textarea rows="4" value={form.description || ''} onChange={update('description')} placeholder="Describe the product in plain language." /></label><label className="field-span-2">Features <small>One feature per line</small><textarea rows="5" value={form.features || ''} onChange={update('features')} placeholder="3MP image quality&#10;Wi-Fi connectivity" /></label><label className="field-span-2">Image alt text<input value={form.imageAlt || ''} onChange={update('imageAlt')} placeholder="Indoor CP PLUS Wi-Fi security camera" /></label></div>{state.error && <p className="admin-form-error" role="alert"><X size={16} />{state.error}</p>}{state.message && <p className="admin-form-success" role="status"><CheckCircle2 size={16} />{state.message}</p>}<div className="admin-form__actions"><button className="button button--outline" type="button" onClick={() => onNavigate('/admin/products')}>Cancel</button><button className="button button--outline" type="submit" disabled={state.status === 'saving'}>{state.status === 'saving' ? 'Saving…' : 'Save draft'}</button><button className="button button--primary" type="button" disabled={state.status === 'saving'} onClick={() => save(true)}><Send size={15} />Save &amp; publish</button></div></form></section>;
}

export default function AdminProductsPage({ productId, onNavigate }) {
  return productId ? <ProductForm productId={productId} onNavigate={onNavigate} /> : <ProductList onNavigate={onNavigate} />;
}
