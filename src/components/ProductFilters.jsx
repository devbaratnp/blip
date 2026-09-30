import { RotateCcw, SlidersHorizontal, X } from 'lucide-react';
import { categories } from '../data/categories.js';
import { products } from '../data/products.js';

const brands = [...new Set(products.map((product) => product.brand))];

export default function ProductFilters({ filters, onChange, onReset, mobileOpen, onCloseMobile }) {
  return (
    <aside className={`filters-panel ${mobileOpen ? 'filters-panel--open' : ''}`} aria-label="Product filters">
      <div className="filters-panel__head"><div><span className="eyebrow">Refine</span><h2>Find your fit</h2></div><button className="icon-button filters-panel__close" type="button" onClick={onCloseMobile} aria-label="Close filters"><X size={19} /></button></div>
      <div className="filter-group"><span className="filter-label">Category</span><label className="filter-option"><input type="radio" name="category" checked={!filters.category} onChange={() => onChange('category', '')} />All categories</label>{categories.map((category) => <label className="filter-option" key={category.id}><input type="radio" name="category" checked={filters.category === category.name} onChange={() => onChange('category', category.name)} />{category.name}</label>)}</div>
      <div className="filter-group"><span className="filter-label">Brand</span><label className="filter-option"><input type="radio" name="brand" checked={!filters.brand} onChange={() => onChange('brand', '')} />All brands</label>{brands.map((brand) => <label className="filter-option" key={brand}><input type="radio" name="brand" checked={filters.brand === brand} onChange={() => onChange('brand', brand)} />{brand}</label>)}</div>
      <div className="filter-group"><span className="filter-label">Price up to</span><label className="range-label"><span>Rs. 50,000</span><span>{filters.maxPrice ? `Rs. ${filters.maxPrice.toLocaleString('en-IN')}` : 'Any price'}</span></label><input className="price-range" type="range" min="3000" max="50000" step="1000" value={filters.maxPrice || 50000} onChange={(event) => onChange('maxPrice', Number(event.target.value) === 50000 ? '' : Number(event.target.value))} /></div>
      <button type="button" className="reset-filters" onClick={onReset}><RotateCcw size={15} />Reset all filters</button>
      <div className="filter-mobile-action"><button type="button" className="button button--primary button--full" onClick={onCloseMobile}><SlidersHorizontal size={16} />Show products</button></div>
    </aside>
  );
}
